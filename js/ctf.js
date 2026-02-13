// CTF Scoreboard — flag verification via SHA-256 hashes (no flags in source code)

const CHALLENGES = [
  { id: 1,  name: "Перший слід",               points: 25,  hash: "6895ddd36b638e191dd2ea7dc0182ed23c9449b4cfa60d741ac818c6063d471c" },
  { id: 2,  name: "Кольорова карта",           points: 50,  hash: "f0b677029760afd12fe5ff5186c9759ad52a62b057453b1caccdb8d75c7cc8db" },
  { id: 3,  name: "Луна у тиші",              points: 50,  hash: "17ffc91718f56f2cfa209caf304f605329eb2f0511729c47b082f551553f96ae" },
  { id: 4,  name: "Привид у кадрі",           points: 100, hash: "c283c460b33008ee49ecccadd882293d18cdf81e8e6c91b0792c0d0a36474334" },
  { id: 5,  name: "Цифровий водяний знак",     points: 125, hash: "5c87a54de46860dce6c8e479c1d4ea97bedb252738267a9ca2d5765cb1b9d8b8" },
  { id: 6,  name: "Тайна PDF",                points: 100, hash: "30ff3d23af7d51ff58a209232cb973ef74f06733412a09780969c48897035b4e" },
  { id: 7,  name: "Шифр Бекона",              points: 150, hash: "89a847906594d67648a96cc16803ccc528dd7f326e254097cd75178415593aeb" },
  { id: 8,  name: "Сигнал з космосу",         points: 200, hash: "e466d91a9c3cb1bbff2368213d869cad278b5fd308e4d8bb41c9a14a001efc09" },
  { id: 9,  name: "Стеганографічний пінг",     points: 250, hash: "f5fae014bd6e82887969ed1796a5a013d0bcd64d067bf3810277557f5725f305" },
  { id: 10, name: "Фінальний бос",             points: 400, hash: "26337278b20c97583eccba9054006bf8ae0b2824a9773f6d0a3088f4863b82b9" }
];

const MAX_POINTS = CHALLENGES.reduce((s, c) => s + c.points, 0);
const STORAGE_KEY = "ctf_training_2026_v2";

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
