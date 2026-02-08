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

/* ---- Inter-deck navigation ---- */
var nextTemaUrl = null;
var prevTemaUrl = null;

function initTemaNavigation() {
  var path = window.location.pathname;
  var match = path.match(/tema(\d+)\.html/);
  if (!match) return;
  var num = parseInt(match[1]);

  if (num > 1) {
    prevTemaUrl = path.replace(/tema\d+\.html/, 'tema' + (num - 1) + '.html');
  }

  var candidate = path.replace(/tema\d+\.html/, 'tema' + (num + 1) + '.html');
  fetch(candidate, { method: 'HEAD' })
    .then(function(r) { if (r.ok) { nextTemaUrl = candidate; updateButtons(); } })
    .catch(function() {});
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
  if (current < slides.length - 1) {
    show(current + 1);
  } else if (nextTemaUrl) {
    window.location.href = nextTemaUrl;
  }
}

function prev() {
  if (current > 0) {
    show(current - 1);
  } else if (prevTemaUrl) {
    window.location.href = prevTemaUrl;
  }
}

function updateProgress() {
  const percent = ((current + 1) / slides.length) * 100;
  if (progressBar) progressBar.style.width = percent + '%';
  if (counter) counter.textContent = (current + 1) + ' / ' + slides.length;
}

function updateButtons() {
  if (prevBtn) prevBtn.disabled = current === 0 && !prevTemaUrl;
  if (nextBtn) nextBtn.disabled = current === slides.length - 1 && !nextTemaUrl;
}

function fitSlides() {
  slides.forEach(function(slide) {
    slide.style.transform = 'none';
    var contentHeight = slide.scrollHeight;
    var viewHeight = slide.clientHeight;
    if (contentHeight > viewHeight) {
      var scale = viewHeight / contentHeight;
      scale = Math.max(scale, 0.55);
      slide.style.transform = 'scale(' + scale + ')';
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
initTemaNavigation();
updateThemeButton(document.body.classList.contains('light'));
updateProgress();
updateButtons();
fitSlides();
window.addEventListener('resize', fitSlides);
