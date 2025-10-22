// Update current time
const timeElement = document.querySelector('[data-testid="test-user-time"]');
function updateTime() {
  timeElement.textContent = Date.now();
}
updateTime();
setInterval(updateTime, 1000);

// Theme toggle logic
// Theme toggle logic (robust across pages)
// - Works when the switch exists, and is safe when it doesn't (e.g. other pages)
// - Persists selection to localStorage and syncs across tabs/windows

const themeSwitch = document.getElementById('theme-switch');

// Helper to apply theme ('dark' or 'light')
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

// Initialize theme from localStorage (default: light)
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// If the page has the toggle, update its checked state and listen for changes
if (themeSwitch) {
  themeSwitch.checked = (savedTheme === 'dark');

  themeSwitch.addEventListener('change', () => {
    const newTheme = themeSwitch.checked ? 'dark' : 'light';
    applyTheme(newTheme);
    // Persist and notify other tabs
    try {
      localStorage.setItem('theme', newTheme);
    } catch (e) {
      // If storage is disabled, silently fail but still apply locally
      // eslint-disable-next-line no-console
      console.warn('Could not persist theme to localStorage', e);
    }
  });
}

// Keep multiple tabs/windows in sync
window.addEventListener('storage', (e) => {
  if (e.key === 'theme' && e.newValue) {
    applyTheme(e.newValue);
    // If this page has the switch, update it too
    if (themeSwitch) themeSwitch.checked = (e.newValue === 'dark');
  }
});


