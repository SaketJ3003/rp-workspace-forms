'use strict';

const form = document.querySelector('form');
const fields = Array.from(form.querySelectorAll('input'));
const password = document.getElementById('password');
const confirmation = document.getElementById('confirmation');
const statusMessage = form.querySelector('[role="status"]');
let attempted = false;

// Count Unicode code points. Inspect a trimmed copy only for blank-password checks.
function errorFor(field) {
  const value = field.value;
  const trimmed = value.trim();
  const length = Array.from(value).length;
  switch (field.id) {
    case 'full-name':
      if (!trimmed) return 'Enter your full name.';
      const nameLength = Array.from(trimmed).length;
      return nameLength < 2 || nameLength > 80 ? 'Use 2–80 characters for your name.' : '';
    case 'email':
      if (!trimmed) return 'Enter your email address.';
      // Email inputs remove ASCII padding natively. Validate other outer whitespace on a copy.
      const email = field.cloneNode(false);
      email.value = trimmed;
      if (trimmed.length > 254 || email.validity.typeMismatch || !trimmed.split('@')[1]?.includes('.')) {
        return 'Enter a valid email address, such as name@example.com.';
      }
      return '';
    case 'password':
      if (!trimmed) return 'Enter your password.';
      if (confirmation && (length < 15 || length > 128)) return 'Use 15–128 characters for your password.';
      return length > 128 ? 'Use no more than 128 characters.' : '';
    case 'confirmation':
      if (!value) return 'Confirm your password.';
      return value === password.value ? '' : 'Passwords do not match.';
    case 'privacy':
      return field.checked ? '' : 'Confirm that you have read the privacy note.';
  }
}

function validate(field) {
  const message = errorFor(field);
  document.getElementById(field.id + '-error').textContent = message;
  if (message) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
  return !message;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  attempted = true;
  for (const field of fields) {
    if (field.id === 'full-name' || field.type === 'email') field.value = field.value.trim();
  }
  const invalid = fields.filter(field => !validate(field));
  if (invalid.length) {
    statusMessage.textContent = '';
    invalid[0].focus();
    return;
  }
  statusMessage.textContent = confirmation
    ? 'Registration details passed validation.'
    : 'Login details passed validation.';
});

form.addEventListener('input', (event) => {
  statusMessage.textContent = '';
  if (!attempted || !fields.includes(event.target)) return;
  validate(event.target);
  // A change to the original password can invalidate an otherwise untouched confirmation.
  if (event.target === password && confirmation) validate(confirmation);
});

// Fail closed if JavaScript is unavailable. No control has a serializable name.
form.querySelector('fieldset').disabled = false;
