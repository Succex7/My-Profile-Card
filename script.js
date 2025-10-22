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