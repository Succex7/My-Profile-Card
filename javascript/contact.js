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

/* CONTACT-CARDS */

const form = document.getElementById('contact-form');
const successMsg = document.getElementById('success-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Inputs
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');

  // Error fields
  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorSubject = document.getElementById('error-subject');
  const errorMessage = document.getElementById('error-message');

  let valid = true;

  // Reset
  [errorName, errorEmail, errorSubject, errorMessage].forEach(el => el.textContent = '');
  successMsg.textContent = '';

  // Validate name
  if (name.value.trim() === '') {
    errorName.textContent = 'Name is required';
    valid = false;
  }

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === '') {
    errorEmail.textContent = 'Email is required';
    valid = false;
  } else if (!emailPattern.test(email.value.trim())) {
    errorEmail.textContent = 'Enter a valid email address';
    valid = false;
  }

  // Validate subject
  if (subject.value.trim() === '') {
    errorSubject.textContent = 'Subject is required';
    valid = false;
  }

  // Validate message
  if (message.value.trim().length < 10) {
    errorMessage.textContent = 'Message must be at least 10 characters';
    valid = false;
  }

  // Success message
  if (valid) {
    successMsg.textContent = '✅ Message sent successfully!';
    form.reset();
  }
});