const moonIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
const sunIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';

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
