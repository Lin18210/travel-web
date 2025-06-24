// Authentication JavaScript

// API Base URL
const API_BASE_URL = 'http://localhost:3000/api';

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  // Initialize password strength checker for signup page
  const passwordInput = document.getElementById('password');
  if (passwordInput) {
    passwordInput.addEventListener('input', checkPasswordStrength);
  }
  
  // Initialize form handlers
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }
});

// Password strength checker
function checkPasswordStrength() {
  const password = document.getElementById('password').value;
  const strengthFill = document.getElementById('strengthFill');
  const strengthText = document.getElementById('strengthText');
  
  if (!strengthFill || !strengthText) return;
  
  let strength = 0;
  let feedback = '';
  
  // Check length
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  
  // Check for different character types
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  
  // Update UI
  strengthFill.className = 'strength-fill';
  
  if (password.length === 0) {
    strengthFill.style.width = '0%';
    strengthText.textContent = 'Password strength';
  } else if (strength <= 2) {
    strengthFill.classList.add('weak');
    strengthText.textContent = 'Weak password';
  } else if (strength <= 4) {
    strengthFill.classList.add('medium');
    strengthText.textContent = 'Medium strength';
  } else {
    strengthFill.classList.add('strong');
    strengthText.textContent = 'Strong password';
  }
}

// Toggle password visibility
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const toggleBtn = input.parentElement.querySelector('.password-toggle');
  const icon = toggleBtn.querySelector('i');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.setAttribute('data-lucide', 'eye-off');
  } else {
    input.type = 'password';
    icon.setAttribute('data-lucide', 'eye');
  }
  
  // Re-initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Handle login form submission
async function handleLogin(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  
  // Get form data
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const remember = document.getElementById('remember')?.checked || false;
  
  // Show loading state
  btnText.style.display = 'none';
  btnLoading.style.display = 'flex';
  submitBtn.disabled = true;
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Store token
      if (remember) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        sessionStorage.setItem('authToken', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
      }
      
      // Show success message
      showMessage('Login successful! Redirecting...', 'success');
      
      // Redirect to home page
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    } else {
      showMessage(data.error || 'Login failed', 'error');
    }
  } catch (error) {
    console.error('Login error:', error);
    showMessage('Network error. Please try again.', 'error');
  } finally {
    // Reset button state
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
  }
}

// Handle signup form submission
async function handleSignup(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  
  // Get form data
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const terms = document.getElementById('terms').checked;
  
  // Validation
  if (password !== confirmPassword) {
    showMessage('Passwords do not match', 'error');
    return;
  }
  
  if (!terms) {
    showMessage('Please accept the terms and conditions', 'error');
    return;
  }
  
  if (password.length < 6) {
    showMessage('Password must be at least 6 characters long', 'error');
    return;
  }
  
  // Show loading state
  btnText.style.display = 'none';
  btnLoading.style.display = 'flex';
  submitBtn.disabled = true;
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Store token
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Show success message
      showMessage('Account created successfully! Redirecting...', 'success');
      
      // Redirect to home page
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    } else {
      showMessage(data.error || 'Registration failed', 'error');
    }
  } catch (error) {
    console.error('Registration error:', error);
    showMessage('Network error. Please try again.', 'error');
  } finally {
    // Reset button state
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
  }
}

// Show message function
function showMessage(message, type = 'info') {
  // Remove existing messages
  const existingMessages = document.querySelectorAll('.message');
  existingMessages.forEach(msg => msg.remove());
  
  // Create new message
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
  
  // Insert message at the top of the form
  const form = document.querySelector('.auth-form');
  if (form) {
    form.insertBefore(messageDiv, form.firstChild);
  }
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}

// Authentication utility functions
class Auth {
  static getToken() {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }
  
  static getUser() {
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
  
  static isAuthenticated() {
    return !!this.getToken();
  }
  
  static logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    window.location.href = 'index.html';
  }
  
  static async updateProfile(userData) {
    const token = this.getToken();
    if (!token) throw new Error('No authentication token');
    
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update profile');
    }
    
    const data = await response.json();
    
    // Update stored user data
    const currentUser = this.getUser();
    const updatedUser = { ...currentUser, ...data.user };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    sessionStorage.setItem('user', JSON.stringify(updatedUser));
    
    return data;
  }
  
  static async changePassword(currentPassword, newPassword) {
    const token = this.getToken();
    if (!token) throw new Error('No authentication token');
    
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to change password');
    }
    
    return await response.json();
  }
}

// Update navigation based on authentication status
function updateNavigation() {
  const navIcons = document.querySelector('.nav-icons');
  if (!navIcons) return;
  
  if (Auth.isAuthenticated()) {
    const user = Auth.getUser();
    navIcons.innerHTML = `
      <a href="profile.html" class="user-menu-link">
        <i data-lucide="user" class="user-menu-avatar"></i>
        <div class="user-menu-name">${user.username}</div>
      </a>
    `;
  } else {
    navIcons.innerHTML = `
      <button class="btn btn-ghost" onclick="window.location.href='login.html'">Login</button>
      <button class="btn btn-outline" onclick="window.location.href='signup.html'">Sign Up</button>
    `;
  }
  
  // Re-initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', function() {
  updateNavigation();
  
  // Add user dropdown functionality
  document.addEventListener('click', function(e) {
    const userBtn = e.target.closest('.user-btn');
    const userMenu = document.querySelector('.user-menu');
    
    if (userBtn) {
      userMenu.classList.toggle('active');
    } else if (!e.target.closest('.user-dropdown')) {
      userMenu?.classList.remove('active');
    }
  });
});

// Export for use in other scripts
window.Auth = Auth; 