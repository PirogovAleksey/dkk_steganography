const slides = document.querySelectorAll('.slide');
const progressBar = document.getElementById('progress');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
let current = 0;

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

function goHome() {
  const path = window.location.pathname;
  const parts = path.split('/');
  // Navigate up to lectures/lectureN.html
  const slidesIdx = parts.indexOf('slides');
  if (slidesIdx !== -1) {
    const base = parts.slice(0, slidesIdx).join('/');
    // Extract lecture number from directory name like "1-1" -> lecture 1
    const dirName = parts[slidesIdx + 1]; // e.g. "1-1"
    if (dirName) {
      const nums = dirName.split('-');
      const moduleNum = parseInt(nums[0]);
      const lecInModule = parseInt(nums[1]);
      const lectureNum = (moduleNum - 1) * 4 + lecInModule;
      window.location.href = base + '/lectures/lecture' + lectureNum + '.html';
      return;
    }
  }
  window.location.href = '../../index.html';
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
    var isScrollable = slide.scrollHeight > slide.clientHeight;
    if (isScrollable) {
      if (!slide.querySelector('.scroll-indicator')) {
        var indicator = document.createElement('div');
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
    goHome();
  }
});

updateProgress();
updateButtons();
addScrollIndicators();
window.addEventListener('resize', addScrollIndicators);
