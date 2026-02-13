// CTF Scoreboard — flag verification via SHA-256 hashes (no flags in source code)

const CHALLENGES = [
  { id: 1,  name: "EXIF-фільтрація",          points: 25,  hash: "695e8f94e1e40591cf594dc3c5ea646308b95e71866886523eba15c1e50e8a58" },
  { id: 2,  name: "Сховано на видному місці",  points: 50,  hash: "ce36a458f5003b0e237276f956295f630fcd2ef7ec8c670988d1ab5aae54d476" },
  { id: 3,  name: "Легка здобич",              points: 25,  hash: "4e94c64fe00261a38e9f7a1a26085c20494d45a3d586ee4eb9ee2b4e9f0a28c8" },
  { id: 4,  name: "ROT-н-рол",                points: 100, hash: "71ac9fab29de96fe088e7c4912fe8434b69f7aa8c5877b537cb6922b55bcb97f" },
  { id: 5,  name: "Глибокі біти",              points: 100, hash: "deb9aedbbbf96ecc414f393a5bb5c9fe199d1dbba1b2e7e141fe6fd5d51355fa" },
  { id: 6,  name: "Прихований вантаж",         points: 125, hash: "0a2c6faf5672a38e45b81570525048321caad789c04012817f61b1230df1732d" },
  { id: 7,  name: "Невидиме чорнило",          points: 125, hash: "d1296433e463a54efba3d7b3629a89fd32a8a1f0151eb6375f2e1dd84d2434a2" },
  { id: 8,  name: "Бінарний дощ",              points: 200, hash: "f3355a36acdd9e8b2ec13fd88b4f14187f4ec5f2e25356c2bef3419b7774c300" },
  { id: 9,  name: "Потрійна загроза",          points: 250, hash: "029e979973c55de3ccbd00689cf46a28a7071e7cb45b7f8e51a96966af7a83c8" },
  { id: 10, name: "Початок",                   points: 400, hash: "da3287baf246c94c1d7e278e9394183868cd0d8a13267c8bba9116fc5a60f717" }
];

const MAX_POINTS = CHALLENGES.reduce((s, c) => s + c.points, 0);
const STORAGE_KEY = "ctf_training_2026";

// Load solved state from localStorage
function loadSolved() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}

function saveSolved(solved) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(solved));
}

// SHA-256 hash (Web Crypto API)
async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Update UI
function updateUI() {
  const solved = loadSolved();
  const totalScore = solved.reduce((sum, id) => {
    const ch = CHALLENGES.find(c => c.id === id);
    return sum + (ch ? ch.points : 0);
  }, 0);

  // Stats
  document.getElementById("score-display").textContent = totalScore;
  document.getElementById("solved-count").textContent = solved.length;

  // Progress bar
  const pct = Math.round((totalScore / MAX_POINTS) * 100);
  document.getElementById("progress-bar").style.width = pct + "%";
  document.getElementById("progress-text").textContent = totalScore + " / " + MAX_POINTS + " очків";
  document.getElementById("progress-percent").textContent = pct + "%";

  // Challenge cards
  CHALLENGES.forEach(ch => {
    const card = document.querySelector('.challenge-card[data-id="' + ch.id + '"]');
    const statusEl = document.getElementById("status-" + ch.id);
    if (!card || !statusEl) return;

    if (solved.includes(ch.id)) {
      card.classList.add("solved");
      statusEl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>';
    } else {
      card.classList.remove("solved");
      statusEl.innerHTML = "";
    }
  });
}

// Check submitted flag
async function checkFlag() {
  const input = document.getElementById("flag-input");
  const resultEl = document.getElementById("flag-result");
  const flag = input.value.trim();

  if (!flag) {
    resultEl.textContent = "";
    resultEl.className = "flag-result";
    return;
  }

  const hash = await sha256(flag);
  const solved = loadSolved();

  // Find matching challenge
  const match = CHALLENGES.find(c => c.hash === hash);

  if (match) {
    if (solved.includes(match.id)) {
      resultEl.textContent = "Завдання #" + match.id + " \"" + match.name + "\" вже розв'язано!";
      resultEl.className = "flag-result duplicate";
    } else {
      solved.push(match.id);
      saveSolved(solved);
      resultEl.textContent = "Правильно! Завдання #" + match.id + " \"" + match.name + "\" — +" + match.points + " очків!";
      resultEl.className = "flag-result correct";

      // Animate the card
      const card = document.querySelector('.challenge-card[data-id="' + match.id + '"]');
      if (card) {
        card.classList.add("just-solved");
        setTimeout(function() { card.classList.remove("just-solved"); }, 600);
      }

      updateUI();
    }
  } else {
    resultEl.textContent = "Невірний прапор. Спробуй ще!";
    resultEl.className = "flag-result wrong";
  }

  input.value = "";
  input.focus();
}

// Enter key to submit
document.getElementById("flag-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") checkFlag();
});

// Filter challenges
function filterChallenges(difficulty, btn) {
  document.querySelectorAll(".filter-btn").forEach(function(b) { b.classList.remove("active"); });
  btn.classList.add("active");

  document.querySelectorAll(".challenge-card").forEach(function(card) {
    if (difficulty === "all" || card.dataset.difficulty === difficulty) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

// Initialize on page load
updateUI();
