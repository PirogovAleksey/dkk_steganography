#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CTF Steganography Toolkit — CLI
================================
Навчальний інструмент для курсу «Цифрова комунікація та стеганографія».

Підтримувані методи декодування
-------------------------------
* metadata    — витягує метадані (EXIF-коментарі, PNG text chunks),
                автоматично пробує декодувати Base64.
* image-lsb   — витягує дані, приховані в молодших бітах (LSB) пікселів
                RGB-зображення.
* audio-lsb   — витягує дані з молодших бітів аудіосемплів WAV-файлу,
                за потреби розшифровує XOR-паролем.

Приклади запуску
----------------
    python cli.py decode -m metadata   -i challenge.png
    python cli.py decode -m image-lsb  -i challenge.png
    python cli.py decode -m image-lsb  -i challenge.png --bits 2
    python cli.py decode -m audio-lsb  -i challenge.wav --password SECRET
"""

from __future__ import annotations

import argparse
import base64
import struct
import sys
import zlib
from pathlib import Path
from typing import Optional

# ---------------------------------------------------------------------------
# Метадані зображення (EXIF / PNG text chunks)
# ---------------------------------------------------------------------------

def decode_metadata(image_path: Path) -> str:
    """Витягує текстові метадані із зображення.

    Стеганографічний принцип
    ~~~~~~~~~~~~~~~~~~~~~~~~
    Найпростіший спосіб приховати повідомлення — записати його
    в метадані файлу (EXIF-коментар, PNG tEXt/iTXt chunk тощо).
    Більшість переглядачів зображень ці поля не показують, тому
    пересічний користувач їх не побачить.
    """
    try:
        from PIL import Image
        from PIL.ExifTags import TAGS
    except ImportError:
        return "[!] Pillow не встановлено. Встановіть: pip install Pillow"

    img = Image.open(image_path)
    results: list[str] = []

    # --- PNG text chunks (tEXt, iTXt, zTXt) ---
    # Pillow зберігає їх в img.info або img.text
    png_text: dict[str, str] = getattr(img, "text", {}) or {}
    if not png_text and isinstance(img.info, dict):
        # Деякі версії Pillow кладуть дані сюди
        png_text = {k: v for k, v in img.info.items() if isinstance(v, str)}

    if png_text:
        results.append("=== PNG Text Chunks ===")
        for key, value in png_text.items():
            results.append(f"  {key}: {value}")
            decoded = _try_base64(value)
            if decoded is not None:
                results.append(f"  {key} (base64 decode): {decoded}")

    # --- EXIF ---
    exif_data = img.getexif()
    if exif_data:
        results.append("=== EXIF ===")
        for tag_id, value in exif_data.items():
            tag_name = TAGS.get(tag_id, f"0x{tag_id:04x}")
            str_value = str(value)
            results.append(f"  {tag_name}: {str_value}")
            decoded = _try_base64(str_value)
            if decoded is not None:
                results.append(f"  {tag_name} (base64 decode): {decoded}")

    # --- ImageDescription / UserComment через _getexif (legacy) ---
    legacy_exif = getattr(img, "_getexif", lambda: None)()
    if legacy_exif and isinstance(legacy_exif, dict):
        for tag_id in (0x010E, 0x9286):  # ImageDescription, UserComment
            if tag_id in legacy_exif and tag_id not in exif_data:
                tag_name = TAGS.get(tag_id, f"0x{tag_id:04x}")
                raw = legacy_exif[tag_id]
                str_value = raw.decode("utf-8", errors="replace") if isinstance(raw, bytes) else str(raw)
                results.append(f"  {tag_name} (legacy): {str_value}")
                decoded = _try_base64(str_value)
                if decoded is not None:
                    results.append(f"  {tag_name} (base64 decode): {decoded}")

    if not results:
        return "[*] Метадані не знайдено."

    return "\n".join(results)


def _try_base64(text: str) -> Optional[str]:
    """Намагається декодувати рядок як Base64.

    Повертає декодований текст або None, якщо це не валідний Base64.
    """
    # Відфільтруємо дуже короткі рядки та очевидно не-base64
    stripped = text.strip()
    if len(stripped) < 4:
        return None
    try:
        raw = base64.b64decode(stripped, validate=True)
        decoded = raw.decode("utf-8")
        # Перевіряємо, що результат — друкований текст
        if all(c.isprintable() or c in "\n\r\t" for c in decoded):
            return decoded
    except Exception:
        pass
    return None


# ---------------------------------------------------------------------------
# Image LSB  (Least Significant Bit)
# ---------------------------------------------------------------------------

def decode_image_lsb(image_path: Path, bits: int = 1) -> str:
    """Витягує дані, приховані в молодших бітах пікселів.

    Стеганографічний принцип
    ~~~~~~~~~~~~~~~~~~~~~~~~
    Кожен піксель RGB-зображення складається з трьох каналів (R, G, B),
    кожен з яких — ціле число від 0 до 255 (8 біт).  Зміна молодшого
    біта (LSB) практично непомітна для ока, але дозволяє закодувати
    1 біт інформації на канал.  При ``bits=2`` використовуються два
    молодші біти — більше ємність, але більше спотворення.

    Алгоритм
    ~~~~~~~~
    1. Читаємо пікселі як масив uint8.
    2. З кожного каналу (R, G, B) беремо ``bits`` молодших бітів.
    3. Збираємо біти в байти (MSB-first).
    4. Шукаємо кінець повідомлення (нульовий байт або валідний UTF-8).
    """
    try:
        from PIL import Image
        import numpy as np
    except ImportError:
        return "[!] Pillow та/або NumPy не встановлено."

    if bits < 1 or bits > 8:
        return "[!] Параметр --bits має бути від 1 до 8."

    img = Image.open(image_path).convert("RGB")
    pixels = np.array(img, dtype=np.uint8)  # shape: (H, W, 3)

    # Маска для вибору N молодших бітів: наприклад, bits=2 -> mask=0b11
    mask = (1 << bits) - 1

    # Витягуємо молодші біти з кожного каналу та вирівнюємо в 1D масив
    # Порядок: зліва направо, зверху вниз, R -> G -> B
    flat = pixels.reshape(-1)  # R0, G0, B0, R1, G1, B1, ...
    lsb_values = flat & mask   # кожне значення від 0 до (2^bits - 1)

    # Збираємо біти в один бітовий рядок
    # Кожне lsb_values[i] — це `bits` біт; записуємо їх MSB-first
    bit_strings = [format(v, f"0{bits}b") for v in lsb_values]
    all_bits = "".join(bit_strings)

    # Конвертуємо бітовий рядок у байти
    byte_list: list[int] = []
    for i in range(0, len(all_bits) - 7, 8):
        byte_val = int(all_bits[i : i + 8], 2)
        if byte_val == 0:
            # Нульовий байт — типовий маркер кінця повідомлення
            break
        byte_list.append(byte_val)

    if not byte_list:
        return "[*] Не вдалося витягти жодних даних (порожній результат)."

    raw = bytes(byte_list)

    # Спроба інтерпретувати як UTF-8
    try:
        text = raw.decode("utf-8")
        return f"[+] Витягнуто ({len(raw)} байт, UTF-8):\n{text}"
    except UnicodeDecodeError:
        # Повертаємо hex-дамп, якщо це не текст
        hex_dump = raw.hex(" ")
        return (
            f"[+] Витягнуто {len(raw)} байт (не UTF-8).\n"
            f"    HEX: {hex_dump}\n"
            f"    Спроба latin-1: {raw.decode('latin-1')}"
        )


# ---------------------------------------------------------------------------
# Audio LSB  (WAV)
# ---------------------------------------------------------------------------

def decode_audio_lsb(audio_path: Path, password: Optional[str] = None) -> str:
    """Витягує дані, приховані в молодших бітах WAV-семплів.

    Стеганографічний принцип
    ~~~~~~~~~~~~~~~~~~~~~~~~
    WAV-файл зберігає звук як послідовність числових семплів
    (зазвичай 16-біт, signed).  Зміна молодшого біта кожного семпла
    вносить шум на рівні ~-90 dB — нижче порогу чутності.  Це дозволяє
    приховати 1 біт на семпл.

    XOR-шифрування
    ~~~~~~~~~~~~~~
    Для додаткового захисту витягнуті байти можна XOR-шифрувати
    паролем (ключем).  XOR — симетрична операція: шифрування та
    дешифрування виконуються однаковим ключем.

    Формат повідомлення
    ~~~~~~~~~~~~~~~~~~~
    Перші 32 біти (32 семпли) — довжина повідомлення у байтах (uint32 big-endian).
    Далі — саме повідомлення.
    """
    try:
        import numpy as np
        from scipy.io import wavfile
    except ImportError:
        return "[!] NumPy та/або SciPy не встановлено."

    sample_rate, samples = wavfile.read(str(audio_path))

    # Якщо стерео — беремо лише перший канал
    if samples.ndim > 1:
        samples = samples[:, 0]

    # Витягуємо молодші біти всіх семплів
    lsb_bits = (samples & 1).astype(np.uint8)

    # Перші 32 біти -> довжина повідомлення (big-endian uint32)
    if len(lsb_bits) < 32:
        return "[!] Аудіофайл занадто короткий."

    length_bits = lsb_bits[:32]
    msg_length = 0
    for bit in length_bits:
        msg_length = (msg_length << 1) | int(bit)

    # Обмеження розумності: не більше 10 МБ
    if msg_length == 0 or msg_length > 10 * 1024 * 1024:
        # Спробуємо без заголовка довжини — просто читаємо до нульового байта
        return _audio_lsb_no_header(lsb_bits, password)

    total_bits_needed = 32 + msg_length * 8
    if total_bits_needed > len(lsb_bits):
        # Довжина в заголовку недостовірна — спробуємо без заголовка
        return _audio_lsb_no_header(lsb_bits, password)

    # Збираємо байти повідомлення
    data_bits = lsb_bits[32 : 32 + msg_length * 8]
    byte_list: list[int] = []
    for i in range(0, len(data_bits), 8):
        byte_val = 0
        for bit in data_bits[i : i + 8]:
            byte_val = (byte_val << 1) | int(bit)
        byte_list.append(byte_val)

    raw = bytes(byte_list)

    # XOR-розшифрування, якщо вказано пароль
    if password:
        raw = _xor_decrypt(raw, password)

    return _format_extracted(raw)


def _audio_lsb_no_header(lsb_bits, password: Optional[str]) -> str:
    """Фолбек: витягує LSB-біти без заголовка довжини, до нульового байта."""
    byte_list: list[int] = []
    for i in range(0, len(lsb_bits) - 7, 8):
        byte_val = 0
        for bit in lsb_bits[i : i + 8]:
            byte_val = (byte_val << 1) | int(bit)
        if byte_val == 0:
            break
        byte_list.append(byte_val)
        # Обмеження: максимум 100 КБ
        if len(byte_list) > 100_000:
            break

    if not byte_list:
        return "[*] Не вдалося витягти дані з аудіо."

    raw = bytes(byte_list)

    if password:
        raw = _xor_decrypt(raw, password)

    return _format_extracted(raw)


def _xor_decrypt(data: bytes, password: str) -> bytes:
    """XOR-дешифрування циклічним ключем.

    Кожен байт даних XOR-ується з відповідним байтом ключа
    (ключ повторюється циклічно).
    """
    key = password.encode("utf-8")
    key_len = len(key)
    return bytes(b ^ key[i % key_len] for i, b in enumerate(data))


def _format_extracted(raw: bytes) -> str:
    """Форматує витягнуті байти для виведення."""
    try:
        text = raw.decode("utf-8")
        return f"[+] Витягнуто ({len(raw)} байт, UTF-8):\n{text}"
    except UnicodeDecodeError:
        hex_dump = raw[:256].hex(" ")
        suffix = "..." if len(raw) > 256 else ""
        return (
            f"[+] Витягнуто {len(raw)} байт (не UTF-8).\n"
            f"    HEX: {hex_dump}{suffix}\n"
            f"    Спроба latin-1: {raw[:256].decode('latin-1')}{suffix}"
        )


# ---------------------------------------------------------------------------
# CLI (argparse)
# ---------------------------------------------------------------------------

def build_parser() -> argparse.ArgumentParser:
    """Створює парсер аргументів командного рядка."""
    parser = argparse.ArgumentParser(
        prog="cli.py",
        description=(
            "CTF Steganography Toolkit — навчальний інструмент "
            "для курсу стеганографії.\n"
            "Витягує приховані дані із зображень та аудіофайлів."
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "Приклади:\n"
            "  python cli.py decode -m metadata   -i challenge.png\n"
            "  python cli.py decode -m image-lsb  -i challenge.png --bits 2\n"
            "  python cli.py decode -m audio-lsb  -i challenge.wav --password SECRET\n"
        ),
    )

    subparsers = parser.add_subparsers(dest="command", help="Доступні команди")

    # --- decode ---
    decode_parser = subparsers.add_parser(
        "decode",
        help="Декодувати / витягти приховані дані",
        description="Витягує приховані дані з файлу за обраним методом.",
    )
    decode_parser.add_argument(
        "-m", "--method",
        required=True,
        choices=["metadata", "image-lsb", "audio-lsb"],
        help=(
            "Метод декодування: "
            "metadata — метадані (EXIF/PNG text); "
            "image-lsb — молодші біти пікселів зображення; "
            "audio-lsb — молодші біти семплів WAV-аудіо"
        ),
    )
    decode_parser.add_argument(
        "-i", "--input",
        required=True,
        type=Path,
        help="Шлях до вхідного файлу (зображення або аудіо)",
    )
    decode_parser.add_argument(
        "--bits",
        type=int,
        default=1,
        help="Кількість молодших бітів на канал (для image-lsb, за замовчуванням: 1)",
    )
    decode_parser.add_argument(
        "--password",
        type=str,
        default=None,
        help="Пароль для XOR-дешифрування (для audio-lsb)",
    )

    return parser


def main() -> None:
    """Точка входу CLI."""
    parser = build_parser()
    args = parser.parse_args()

    if args.command is None:
        parser.print_help()
        sys.exit(1)

    # Перевірка існування файлу
    input_path: Path = args.input
    if not input_path.exists():
        print(f"[!] Файл не знайдено: {input_path}", file=sys.stderr)
        sys.exit(1)

    # Маршрутизація за методом
    if args.method == "metadata":
        result = decode_metadata(input_path)
    elif args.method == "image-lsb":
        result = decode_image_lsb(input_path, bits=args.bits)
    elif args.method == "audio-lsb":
        result = decode_audio_lsb(input_path, password=args.password)
    else:
        print(f"[!] Невідомий метод: {args.method}", file=sys.stderr)
        sys.exit(1)

    print(result)


if __name__ == "__main__":
    main()
