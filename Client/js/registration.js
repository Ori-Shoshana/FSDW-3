// Load users from localStorage or initialize empty object
const users = JSON.parse(localStorage.getItem('users')) || {};

document.addEventListener('DOMContentLoaded', () => {
    const fullnameInput = document.getElementById('fullname');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const registerButton = document.getElementById('registerButton');
  
    function checkFields() {
      if (fullnameInput.value && usernameInput.value && emailInput.value && passwordInput.value && confirmPasswordInput.value) {
        registerButton.style.backgroundColor = '#007bff';
      } else {
        registerButton.style.backgroundColor = "#f9f9f9";
        }
    }
  
    fullnameInput.addEventListener('input', checkFields);
    usernameInput.addEventListener('input', checkFields);
    emailInput.addEventListener('input', checkFields);
    passwordInput.addEventListener('input', checkFields);
    confirmPasswordInput.addEventListener('input', checkFields);
  
    // Existing form submission logic
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const fullname = fullnameInput.value;
      const username = usernameInput.value;
      const email = emailInput.value;
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
  
      // Check if passwords match
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
      }
  
      // Check if username already exists
      let users = JSON.parse(localStorage.getItem('users')) || {};
      if (users[username]) {
        alert('Username already exists.');
        return false;
      }
  
      // Save new user to localStorage
      users[username] = { fullname, email, password };
      registerUser(username);
      localStorage.setItem('users', JSON.stringify(users));
  
      alert('Registration successful!');
      // Redirect to the login page
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 500);
  
      return false;
    });
  
    // Function to register a new user and create their local storage space
    function registerUser(username) {
      if (!localStorage.getItem(username)) {
        localStorage.setItem(username, JSON.stringify({}));
        console.log(`User "${username}" registered and storage initialized.`);
      } else {
        console.log(`User "${username}" already exists.`);
      }
    }
  });