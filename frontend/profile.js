// Profile Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Check authentication
  if (!Auth.isAuthenticated()) {
    window.location.href = 'login.html';
    return;
  }

  // Load user data
  loadUserData();

  // Initialize tab navigation
  initializeTabs();

  // Initialize form handlers
  initializeForms();

  // Initialize password strength checker
  const newPasswordInput = document.getElementById('newPassword');
  if (newPasswordInput) {
    newPasswordInput.addEventListener('input', checkPasswordStrength);
  }

  // Check if we should show bookings tab (from URL hash)
  if (window.location.hash === '#bookings') {
    const bookingsTab = document.querySelector('.nav-item[data-tab="bookings"]');
    if (bookingsTab) {
      bookingsTab.click();
    }
  }

  // Always fetch bookings on page load
  fetchAndRenderBookings();

  patchBookingsTab();
});

// Load user data
function loadUserData() {
  const user = Auth.getUser();
  if (!user) return;

  // Update profile sidebar
  const profileUsername = document.getElementById('profileUsername');
  const profileEmail = document.getElementById('profileEmail');
  const memberSince = document.getElementById('memberSince');

  if (profileUsername) profileUsername.textContent = user.username;
  if (profileEmail) profileEmail.textContent = user.email;
  if (memberSince) {
    // Format the creation date
    const date = new Date();
    memberSince.textContent = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  }

  // Populate form fields
  const editUsername = document.getElementById('editUsername');
  const editEmail = document.getElementById('editEmail');

  if (editUsername) editUsername.value = user.username;
  if (editEmail) editEmail.value = user.email;

  // Load additional user data from localStorage (if available)
  const additionalData = JSON.parse(localStorage.getItem('userAdditionalData') || '{}');
  
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const phone = document.getElementById('phone');
  const country = document.getElementById('country');
  const bio = document.getElementById('bio');

  if (firstName) firstName.value = additionalData.firstName || '';
  if (lastName) lastName.value = additionalData.lastName || '';
  if (phone) phone.value = additionalData.phone || '';
  if (country) country.value = additionalData.country || '';
  if (bio) bio.value = additionalData.bio || '';
}

// Initialize tab navigation
function initializeTabs() {
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');

  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');

      // Remove active class from all nav items and tab contents
      navItems.forEach(nav => nav.classList.remove('active'));
      tabContents.forEach(tab => tab.classList.remove('active'));

      // Add active class to clicked nav item and corresponding tab
      this.classList.add('active');
      const targetTabContent = document.getElementById(`${targetTab}-tab`);
      if (targetTabContent) {
        targetTabContent.classList.add('active');
      }
    });
  });
}

// Initialize form handlers
function initializeForms() {
  const profileForm = document.getElementById('profileForm');
  const passwordForm = document.getElementById('passwordForm');

  if (profileForm) {
    profileForm.addEventListener('submit', handleProfileUpdate);
  }

  if (passwordForm) {
    passwordForm.addEventListener('submit', handlePasswordChange);
  }
}

// Handle profile update
async function handleProfileUpdate(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');

  // Get form data
  const formData = new FormData(form);
  const userData = {
    username: formData.get('username'),
    email: formData.get('email'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    phone: formData.get('phone'),
    country: formData.get('country'),
    bio: formData.get('bio')
  };

  // Show loading state
  btnText.style.display = 'none';
  btnLoading.style.display = 'flex';
  submitBtn.disabled = true;

  try {
    // Update core profile (username and email)
    await Auth.updateProfile({
      username: userData.username,
      email: userData.email
    });

    // Store additional data in localStorage
    const additionalData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      country: userData.country,
      bio: userData.bio
    };
    localStorage.setItem('userAdditionalData', JSON.stringify(additionalData));

    // Update profile display
    loadUserData();

    showMessage('Profile updated successfully!', 'success');
  } catch (error) {
    console.error('Profile update error:', error);
    showMessage(error.message || 'Failed to update profile', 'error');
  } finally {
    // Reset button state
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
  }
}

// Handle password change
async function handlePasswordChange(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');

  // Get form data
  const formData = new FormData(form);
  const currentPassword = formData.get('currentPassword');
  const newPassword = formData.get('newPassword');
  const confirmNewPassword = formData.get('confirmNewPassword');

  // Validation
  if (newPassword !== confirmNewPassword) {
    showMessage('New passwords do not match', 'error');
    return;
  }

  if (newPassword.length < 6) {
    showMessage('New password must be at least 6 characters long', 'error');
    return;
  }

  // Show loading state
  btnText.style.display = 'none';
  btnLoading.style.display = 'flex';
  submitBtn.disabled = true;

  try {
    await Auth.changePassword(currentPassword, newPassword);
    showMessage('Password changed successfully!', 'success');
    
    // Clear form
    form.reset();
  } catch (error) {
    console.error('Password change error:', error);
    showMessage(error.message || 'Failed to change password', 'error');
  } finally {
    // Reset button state
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
  }
}

// Password strength checker (reused from auth.js)
function checkPasswordStrength() {
  const password = document.getElementById('newPassword').value;
  const strengthFill = document.getElementById('strengthFill');
  const strengthText = document.getElementById('strengthText');
  
  if (!strengthFill || !strengthText) return;
  
  let strength = 0;
  
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

// Toggle password visibility (reused from auth.js)
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

// Show message function (reused from auth.js)
function showMessage(message, type = 'info') {
  // Remove existing messages
  const existingMessages = document.querySelectorAll('.message');
  existingMessages.forEach(msg => msg.remove());
  
  // Create new message
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
  
  // Insert message at the top of the active tab content
  const activeTab = document.querySelector('.tab-content.active');
  if (activeTab) {
    const contentHeader = activeTab.querySelector('.content-header');
    if (contentHeader) {
      contentHeader.insertAdjacentElement('afterend', messageDiv);
    }
  }
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}

// Booking and Favorites functionality
function initializeBookingActions() {
  // View booking details
  document.querySelectorAll('.booking-actions .btn-outline').forEach(btn => {
    btn.addEventListener('click', function() {
      const bookingCard = this.closest('.booking-card');
      const title = bookingCard.querySelector('h3').textContent;
      alert(`Viewing details for: ${title}`);
    });
  });

  // Cancel booking
  document.querySelectorAll('.booking-actions .btn-ghost').forEach(btn => {
    btn.addEventListener('click', function() {
      const bookingCard = this.closest('.booking-card');
      const title = bookingCard.querySelector('h3').textContent;
      
      if (confirm(`Are you sure you want to cancel your booking for ${title}?`)) {
        bookingCard.style.opacity = '0.5';
        setTimeout(() => {
          bookingCard.remove();
        }, 300);
      }
    });
  });
}

function initializeFavoriteActions() {
  // Book now
  document.querySelectorAll('.favorite-actions .btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
      const favoriteCard = this.closest('.favorite-card');
      const title = favoriteCard.querySelector('h3').textContent;
      alert(`Redirecting to booking page for: ${title}`);
    });
  });

  // Remove from favorites
  document.querySelectorAll('.favorite-actions .btn-ghost').forEach(btn => {
    btn.addEventListener('click', function() {
      const favoriteCard = this.closest('.favorite-card');
      const title = favoriteCard.querySelector('h3').textContent;
      
      if (confirm(`Remove ${title} from your favorites?`)) {
        favoriteCard.style.opacity = '0.5';
        setTimeout(() => {
          favoriteCard.remove();
        }, 300);
      }
    });
  });

  // Toggle favorite button
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      this.classList.toggle('active');
      const icon = this.querySelector('i');
      
      if (this.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'heart');
      } else {
        icon.setAttribute('data-lucide', 'heart');
      }
      
      // Re-initialize Lucide icons
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  });
}

// Initialize booking and favorite actions when tabs are shown
document.addEventListener('click', function(e) {
  if (e.target.closest('.nav-item')) {
    // Wait for tab content to be shown
    setTimeout(() => {
      initializeBookingActions();
      initializeFavoriteActions();
    }, 100);
  }
});

// Initialize on page load
setTimeout(() => {
  initializeBookingActions();
  initializeFavoriteActions();
}, 500);

// Show booking details modal
function showBookingDetailModal(booking) {
  let imgHtml = '';
  if (booking.image) {
    imgHtml = `<img src="${booking.image}" alt="${booking.destination}" class="modal-booking-img" onerror="this.style.display='none'">`;
  } else {
    imgHtml = `<div class='modal-booking-img placeholder-img'></div>`;
  }
  document.getElementById('modalBookingTitle').textContent = booking.destination || 'Booking Details';
  document.getElementById('modalBookingInfo').innerHTML = `
    ${imgHtml}
    <strong>Status:</strong> ${capitalize(booking.status)}<br>
    <strong>Check-in:</strong> ${formatDate(booking.check_in)}<br>
    <strong>Check-out:</strong> ${formatDate(booking.check_out)}<br>
    <strong>Guests:</strong> ${booking.guests}<br>
    <strong>Total Price:</strong> $${booking.total_price}<br>
    <strong>Booking ID:</strong> ${booking.id}<br>
    <strong>Created:</strong> ${formatDate(booking.created_at)}
  `;
  document.getElementById('bookingDetailModal').classList.add('active');
  document.getElementById('bookingDetailModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeBookingDetailModal() {
  document.getElementById('bookingDetailModal').classList.remove('active');
  document.getElementById('bookingDetailModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// --- My Bookings Feature ---

async function fetchAndRenderBookings() {
  const token = Auth.getToken();
  const bookingsContainer = document.querySelector('.bookings-container');
  if (!bookingsContainer) return;

  // Show loading
  bookingsContainer.innerHTML = '<div class="loading">Loading your bookings...</div>';

  try {
    const response = await fetch('http://localhost:3000/api/bookings', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to fetch bookings');
    }
    const { bookings } = await response.json();

    if (!Array.isArray(bookings) || bookings.length === 0) {
      bookingsContainer.innerHTML = `
        <div class="empty-state">
          <i data-lucide="calendar-x"></i>
          <h3>No bookings yet</h3>
          <p>Start exploring amazing destinations and make your first booking!</p>
          <a href="explore.html" class="btn btn-primary">Explore Destinations</a>
        </div>
      `;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }

    // Helper to format date
    const formatDisplayDate = (dateStr) => {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    bookingsContainer.innerHTML = bookings.map(booking => `
      <div class="booking-card" data-booking-id="${booking.id}">
        <div class="booking-image">
          <div class='booking-summary-img placeholder-img'></div>
        </div>
        <div class="booking-info">
          <h3>${booking.destination}</h3>
          <p class="booking-dates">${formatDisplayDate(booking.check_in)} - ${formatDisplayDate(booking.check_out)}</p>
          <p class="booking-status ${booking.status ? booking.status.toLowerCase() : ''}">${booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : 'Confirmed'}</p>
          <div class="booking-details">
            <span>Guests: ${booking.guests}</span> | <span>Total: $${parseFloat(booking.total_price).toFixed(2)}</span>
          </div>
          <div class="booking-actions">
            <button class="btn btn-outline btn-sm" onclick='showBookingDetailModal(${JSON.stringify({
              ...booking,
              check_in: formatDisplayDate(booking.check_in),
              check_out: formatDisplayDate(booking.check_out)
            })})'>View Details</button>
          </div>
        </div>
      </div>
    `).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();
  } catch (error) {
    bookingsContainer.innerHTML = `<div class="message error">${error.message}</div>`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Patch: fetch bookings when bookings tab is shown
function patchBookingsTab() {
  const bookingsTabBtn = document.querySelector('.nav-item[data-tab="bookings"]');
  if (bookingsTabBtn) {
    bookingsTabBtn.addEventListener('click', () => {
      setTimeout(fetchAndRenderBookings, 200);
    });
  }
}

// On page load, always fetch bookings
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchAndRenderBookings);
} else {
  fetchAndRenderBookings();
}
patchBookingsTab();

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
} 