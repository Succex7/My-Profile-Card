// Update current time
const timeElement = document.querySelector('[data-testid="test-user-time"]');
function updateTime() {
  timeElement.textContent = Date.now();
}
updateTime();
setInterval(updateTime, 1000);

// Theme toggle logic
const themeSwitch = document.getElementById('theme-switch');

themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark', themeSwitch.checked);
  localStorage.setItem('theme', themeSwitch.checked ? 'dark' : 'light');
});

// Persist theme on reload
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  themeSwitch.checked = true;
}