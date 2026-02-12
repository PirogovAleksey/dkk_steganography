// CTF Scoreboard — flag verification via SHA-256 hashes (no flags in source code)

const CHALLENGES = [
  { id: 1,  name: "EXIF-фільтрація",          points: 25,  hash: "ed24f34a999ed458c2f33edb20684b47388d850599ba35b3128a389eca74b576" },
  { id: 2,  name: "Сховано на видному місці",  points: 50,  hash: "52d200b1d3bcf8689f53b6fb2ec41ad7fbe881294cac95cea48dfb76b6e9cd92" },
  { id: 3,  name: "Легка здобич",              points: 25,  hash: "09a51ce1530966f81d51f9df3666efcb7572f3ca1d3174a36044dffb7bfb7347" },
  { id: 4,  name: "ROT-н-рол",                points: 100, hash: "8cc22b05dc697ab00ea827b23bed711538bb582eb9b5e6023b71a6f535d6ca2d" },
  { id: 5,  name: "Глибокі біти",              points: 100, hash: "a464fe93715c766ca2a889c89903ab46bc01dd0e4375c87646c6ab1336e56f09" },
  { id: 6,  name: "Прихований вантаж",         points: 125, hash: "3fdc37d94afbda6cd0273075f1e49a41b7b36a9d52a81f4ac7152c35596c030c" },
  { id: 7,  name: "Невидиме чорнило",          points: 125, hash: "5f38e0a83b045775d48389f51c26b829104f56cf897c0d9b07bcc16b795df528" },
  { id: 8,  name: "Бінарний дощ",              points: 200, hash: "2b71d2acb09ce98e0dd70de0783c90d1186c7d97f1a4d2f34eb57d7f1cbecf40" },
  { id: 9,  name: "Потрійна загроза",          points: 250, hash: "ff72567c3b93e6a0fad0fdf3fb7dcfeb0cd9d1299813a5ab3f4a6d210dfff051" },
  { id: 10, name: "Початок",                   points: 400, hash: "de1ee59c88d842b416dbaf97b21d680c74885be3d4378a4ea6a02ac17546e9a1" }
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
