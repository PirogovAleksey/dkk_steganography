// CTF Scoreboard — flag verification via SHA-256 hashes (no flags in source code)

const CHALLENGES = [
  { id: 1,  name: "Не те, чим здається",  points: 25,  hash: "196476c18856638dd34e8a67b1a22ed71041d2a35195c096375a0c42bd937d81" },
  { id: 2,  name: "Слідкуй за пробілами", points: 50,  hash: "9f1283821d5618aca8dad891d773848c6f58dca05551bdc47b439e085e352ea9" },
  { id: 3,  name: "Базовий табір",        points: 75,  hash: "a8d6278e28bf534ec36c347ab01752ee51ab0dd0df2d5482ee4ae33f5d206753" },
  { id: 4,  name: "Звук тиші",           points: 100, hash: "1e2d17f913a9b88bb900df40ae089fc115c4ffd56ced0de5e6afa3be0b545d3a" },
  { id: 5,  name: "Відлуння",             points: 125, hash: "cf5fca548fa3beb08026e048191778c5cb75cdee3380af76e001626af8738cef" },
  { id: 6,  name: "Голос частот",         points: 125, hash: "a59aa041f14f01c3d691a4d576f2b38d1aa93fa994987ae22bc996a787307613" },
  { id: 7,  name: "Шари цибулі",          points: 300, hash: "02334784d580f2be3f3654d407b60dcf2b2cd0f4e53b8c08466001d1300c067a" },
  { id: 8,  name: "Подвійний замок",       points: 250, hash: "426b40309d1ebd42eb4359ebd78c5ed12659cf558a0d3684f5d1062832a6b837" },
  { id: 9,  name: "Аполлон",              points: 400, hash: "bb92e063f95b9d9ec081ff34955d16c82d81f0ee49e786d641e0c9d184096487" },
  { id: 10, name: "Лабіринт",             points: 500, hash: "2643b21d0b3822e015e0045358b5a4e98c57667f0e1dc5a06869132a962c12ab" }
];

const MAX_POINTS = CHALLENGES.reduce((s, c) => s + c.points, 0);
const STORAGE_KEY = "ctf_solved_2026";

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
