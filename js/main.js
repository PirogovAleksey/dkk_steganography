const moonIcon = '<svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
const sunIcon = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';

function toggleTheme() {
  const isDark = !document.documentElement.classList.contains('dark');
  document.documentElement.classList.toggle('dark', isDark);
  document.body.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.getElementById('theme-icon').innerHTML = isDark ? sunIcon : moonIcon;
  document.getElementById('theme-label').textContent = isDark ? 'Світла тема' : 'Темна тема';
}

if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
  document.body.classList.add('dark');
  document.getElementById('theme-icon').innerHTML = sunIcon;
  document.getElementById('theme-label').textContent = 'Світла тема';
}

// Tab switching for lab pages (event delegation)
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.tab-button[data-tab]');
  if (!btn) return;
  const container = btn.closest('.tabs-container') || btn.closest('.ctf-page-tabs');
  if (!container) return;
  container.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
  container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const target = document.getElementById(btn.dataset.tab);
  if (target) target.classList.add('active');
});

// Reusable submission section for lab pages
function renderSubmissionSection(config) {
  const el = document.getElementById('submission-section');
  if (!el) return;

  const reportItems = config.report || [
    'Титульна сторінка з даними студента',
    'Мета та завдання роботи',
    'Теоретична частина (коротко)',
    'Хід виконання роботи',
    'Результати та скріншоти',
    'Аналіз результатів',
    'Висновки',
    'Додатки (повний код)'
  ];

  const codeReqs = config.codeRequirements || [
    'Коментарі до кожної функції',
    'Docstrings у форматі PEP 257',
    'Обробка винятків (try/except)',
    'Модульна структура коду',
    'requirements.txt з залежностями'
  ];

  const filesHtml = config.files.map(f => '<li><span class="file-format">' + f.name + '</span> — ' + f.desc + '</li>').join('');
  const demoHtml = config.demo.map(d => '<li>' + d + '</li>').join('');
  const reportHtml = reportItems.map(r => '<li>' + r + '</li>').join('');
  const codeHtml = codeReqs.map(c => '<li>' + c + '</li>').join('');
  const demoTitle = config.demoTitle || '🎯 Демонстрація';

  el.innerHTML =
    '<h2>\uD83D\uDCDD Звіт про виконання та формат здачі</h2>' +
    '<div class="submission-grid">' +
      '<div class="submission-card">' +
        '<h3>\uD83D\uDCC1 Структура звіту</h3><ul>' + reportHtml + '</ul>' +
      '</div>' +
      '<div class="submission-card">' +
        '<h3>\uD83D\uDCBE Файли для здачі</h3><ul>' + filesHtml + '</ul>' +
      '</div>' +
      '<div class="submission-card">' +
        '<h3>\u26A1 Вимоги до коду</h3><ul>' + codeHtml + '</ul>' +
      '</div>' +
      '<div class="submission-card">' +
        '<h3>' + demoTitle + '</h3><ul>' + demoHtml + '</ul>' +
      '</div>' +
    '</div>' +
    '<div class="deadline-warning">' +
      '<strong>\u23F0 Термін здачі:</strong> Протягом двох тижнів після проведення лабораторної роботи. ' +
      'Затримка здачі знижує оцінку на 10% за кожен тиждень.' +
    '</div>' +
    '<div class="deadline-warning">' +
      '<strong>\u26A0\uFE0F Формат звіту:</strong> Звіти приймаються <strong>виключно у форматі PDF</strong>. ' +
      'Звіти у форматі DOC/DOCX розглядатись не будуть.' +
    '</div>';
}

// Auto-render submission section if present
const submissionEl = document.getElementById('submission-section');
if (submissionEl && submissionEl.dataset.config) {
  renderSubmissionSection(JSON.parse(submissionEl.dataset.config));
}

// Reusable footer component
document.querySelectorAll('footer').forEach(footer => {
  footer.innerHTML =
    '<div class="footer-content">' +
      '<div>' +
        '<strong>ДКК: Стеганографія</strong><br>' +
        'Викладач: Пирогов Олексій Олександрович<br>' +
        '<a href="mailto:oleksii.pyrohov@uzhnu.edu.ua">oleksii.pyrohov@uzhnu.edu.ua</a>' +
      '</div>' +
      '<div class="footer-right">' +
        'Кафедра твердотільної електроніки та інформаційної безпеки (ТЕІБ)<br>' +
        'Ужгородський національний університет<br>' +
        '<a href="https://teib.info" target="_blank" rel="noopener">teib.info</a>' +
      '</div>' +
    '</div>';
});
