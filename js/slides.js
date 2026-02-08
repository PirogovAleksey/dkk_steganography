const slides = document.querySelectorAll('.slide');
const progressBar = document.getElementById('progress');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
let current = 0;

/* ---- Theme ---- */
const moonIcon = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
const sunIcon = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';

function toggleTheme() {
  const isLight = !document.body.classList.contains('light');
  document.body.classList.toggle('light', isLight);
  localStorage.setItem('slides-theme', isLight ? 'light' : 'dark');
  updateThemeButton(isLight);
}

function updateThemeButton(isLight) {
  const icon = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label');
  if (icon) icon.innerHTML = isLight ? moonIcon : sunIcon;
  if (label) label.textContent = isLight ? 'Темна' : 'Світла';
}

/* ---- Lecture URL (from directory name) ---- */
function getLectureUrl() {
  const path = window.location.pathname;
  const parts = path.split('/');
  const slidesIdx = parts.indexOf('slides');
  if (slidesIdx !== -1) {
    const base = parts.slice(0, slidesIdx).join('/');
    const dirName = parts[slidesIdx + 1];
    if (dirName) {
      const nums = dirName.split('-');
      const moduleNum = parseInt(nums[0]);
      const lecInModule = parseInt(nums[1]);
      const lectureId = moduleNum === 1 ? lecInModule : 8 + lecInModule;
      return base + '/lecture.html?id=' + lectureId;
    }
  }
  return '../../index.html';
}

/* ---- Navigation ---- */
function goHome() {
  window.location.href = getLectureUrl();
}

/* ---- Top Controls (injected dynamically) ---- */
function initTopControls() {
  const top = document.createElement('div');
  top.className = 'top-controls';
  top.innerHTML =
    '<a href="' + getLectureUrl() + '">' +
      '<svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>' +
      'До лекції' +
    '</a>' +
    '<button onclick="toggleTheme()">' +
      '<span id="theme-icon">' + sunIcon + '</span>' +
      '<span id="theme-label">Світла</span>' +
    '</button>';
  document.body.insertBefore(top, document.body.firstChild);

  // Remove old home button from bottom controls
  const homeBtn = document.querySelector('.controls button[onclick="goHome()"]');
  if (homeBtn) homeBtn.remove();
}

/* ---- Slides ---- */
function show(index) {
  if (index < 0 || index >= slides.length) return;
  slides[current].classList.remove('active');
  current = index;
  slides[current].classList.add('active');
  updateProgress();
  updateButtons();
  slides[current].scrollTop = 0;
}

function next() {
  if (current < slides.length - 1) show(current + 1);
}

function prev() {
  if (current > 0) show(current - 1);
}

function updateProgress() {
  const percent = ((current + 1) / slides.length) * 100;
  if (progressBar) progressBar.style.width = percent + '%';
  if (counter) counter.textContent = (current + 1) + ' / ' + slides.length;
}

function updateButtons() {
  if (prevBtn) prevBtn.disabled = current === 0;
  if (nextBtn) nextBtn.disabled = current === slides.length - 1;
}

function addScrollIndicators() {
  slides.forEach(function(slide) {
    const isScrollable = slide.scrollHeight > slide.clientHeight;
    if (isScrollable) {
      if (!slide.querySelector('.scroll-indicator')) {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator visible';
        indicator.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
        slide.appendChild(indicator);
      }
    }
  });
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    next();
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prev();
  }
  if (e.key === 'Escape') {
    window.location.href = getLectureUrl();
  }
});

// Apply saved theme before painting
if (localStorage.getItem('slides-theme') === 'light') {
  document.body.classList.add('light');
}

// Init
initTopControls();
updateThemeButton(document.body.classList.contains('light'));
updateProgress();
updateButtons();
addScrollIndicators();
window.addEventListener('resize', addScrollIndicators);
