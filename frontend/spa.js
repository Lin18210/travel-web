// Spa & Wellness Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all spa functionality
    initializeTreatmentFiltering();
    initializeSpaBooking();
    initializeSpaAnimations();
    initializeSpaAccessibility();
});

// Treatment Category Filtering
function initializeTreatmentFiltering() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const treatmentCards = document.querySelectorAll('.treatment-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter treatment cards
            treatmentCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Announce filter change to screen readers
            announceFilterChange(category);
        });
    });
}

// Announce filter changes for accessibility
function announceFilterChange(category) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Showing ${category === 'all' ? 'all treatments' : category + ' treatments'}`;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Spa Booking Form
function initializeSpaBooking() {
    const bookingForm = document.getElementById('spa-booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleSpaBooking);
        
        // Add real-time validation
        const inputs = bookingForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateSpaField);
            input.addEventListener('input', clearSpaFieldError);
        });
        
        // Set minimum date to today
        const dateInput = document.getElementById('spa-date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
    }
}

// Handle spa booking form submission
function handleSpaBooking(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const bookingData = {
        service: formData.get('service'),
        date: formData.get('date'),
        time: formData.get('time'),
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        notes: formData.get('notes'),
        timestamp: new Date().toISOString()
    };
    
    // Validate form
    if (!validateSpaForm(bookingData)) {
        return;
    }
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Booking...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Store booking in localStorage
        const existingBookings = JSON.parse(localStorage.getItem('spaBookings') || '[]');
        existingBookings.push(bookingData);
        localStorage.setItem('spaBookings', JSON.stringify(existingBookings));
        
        // Show success message
        showSpaBookingSuccess(bookingData);
        
        // Reset form
        e.target.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Validate spa form
function validateSpaForm(data) {
    let isValid = true;
    const errors = [];
    
    if (!data.service) {
        errors.push('Please select a spa service');
        isValid = false;
    }
    
    if (!data.date) {
        errors.push('Please select a date');
        isValid = false;
    }
    
    if (!data.time) {
        errors.push('Please select a time');
        isValid = false;
    }
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter your full name');
        isValid = false;
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        errors.push('Please enter a valid phone number');
        isValid = false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
        isValid = false;
    }
    
    if (!isValid) {
        showSpaBookingError(errors);
    }
    
    return isValid;
}

// Validate individual spa field
function validateSpaField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearSpaFieldError(e);
    
    let isValid = true;
    let errorMessage = '';
    
    switch (field.type) {
        case 'email':
            if (value && !isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'tel':
            if (value && !isValidPhone(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;
        case 'text':
            if (field.name === 'name' && value && value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
            break;
    }
    
    if (!isValid) {
        showSpaFieldError(field, errorMessage);
    }
}

// Clear spa field error
function clearSpaFieldError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.classList.remove('error');
}

// Show spa field error
function showSpaFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    
    field.parentNode.appendChild(errorElement);
}

// Show spa booking success
function showSpaBookingSuccess(bookingData) {
    const successModal = createSpaSuccessModal(bookingData);
    document.body.appendChild(successModal);
    
    // Focus on modal for accessibility
    const closeButton = successModal.querySelector('.modal-close');
    closeButton.focus();
}

// Create spa success modal
function createSpaSuccessModal(bookingData) {
    const modal = document.createElement('div');
    modal.className = 'spa-success-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'spa-success-title');
    modal.setAttribute('aria-modal', 'true');
    
    const serviceName = getServiceName(bookingData.service);
    
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="spa-success-title">Booking Confirmed!</h3>
                <button class="modal-close" aria-label="Close confirmation dialog">
                    <i data-lucide="x"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="success-icon">
                    <i data-lucide="check-circle"></i>
                </div>
                <p>Your spa appointment has been successfully booked!</p>
                <div class="booking-details">
                    <h4>Booking Details:</h4>
                    <ul>
                        <li><strong>Service:</strong> ${serviceName}</li>
                        <li><strong>Date:</strong> ${formatDate(bookingData.date)}</li>
                        <li><strong>Time:</strong> ${formatTime(bookingData.time)}</li>
                        <li><strong>Name:</strong> ${bookingData.name}</li>
                        <li><strong>Email:</strong> ${bookingData.email}</li>
                    </ul>
                </div>
                <p class="confirmation-note">
                    You will receive a confirmation email shortly. Please arrive 15 minutes before your appointment.
                </p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="closeSpaModal()">Close</button>
            </div>
        </div>
    `;
    
    // Add event listeners
    const closeButton = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    closeButton.addEventListener('click', closeSpaModal);
    backdrop.addEventListener('click', closeSpaModal);
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSpaModal();
        }
    });
    
    return modal;
}

// Close spa modal
function closeSpaModal() {
    const modal = document.querySelector('.spa-success-modal');
    if (modal) {
        modal.remove();
    }
}

// Get service name from service value
function getServiceName(serviceValue) {
    const services = {
        'deep-tissue': 'Deep Tissue Massage',
        'hot-stone': 'Hot Stone Massage',
        'aromatherapy': 'Aromatherapy Massage',
        'signature-facial': 'Signature Facial',
        'anti-aging': 'Anti-Aging Treatment',
        'detox-wrap': 'Detox Body Wrap',
        'sea-salt-scrub': 'Sea Salt Scrub',
        'meditation': 'Guided Meditation',
        'yoga': 'Private Yoga Session'
    };
    
    return services[serviceValue] || serviceValue;
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Format time for display
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Show spa booking error
function showSpaBookingError(errors) {
    const errorMessage = errors.join('<br>');
    
    // Create or update error notification
    let errorNotification = document.querySelector('.spa-error-notification');
    
    if (!errorNotification) {
        errorNotification = document.createElement('div');
        errorNotification.className = 'spa-error-notification';
        errorNotification.setAttribute('role', 'alert');
        document.body.appendChild(errorNotification);
    }
    
    errorNotification.innerHTML = `
        <div class="error-content">
            <i data-lucide="alert-circle"></i>
            <div class="error-text">${errorMessage}</div>
            <button class="error-close" onclick="closeSpaError()">
                <i data-lucide="x"></i>
            </button>
        </div>
    `;
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorNotification && errorNotification.parentNode) {
            errorNotification.remove();
        }
    }, 5000);
}

// Close spa error notification
function closeSpaError() {
    const errorNotification = document.querySelector('.spa-error-notification');
    if (errorNotification) {
        errorNotification.remove();
    }
}

// Initialize spa animations
function initializeSpaAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.treatment-card, .package-card, .facility-card, .feature-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize spa accessibility features
function initializeSpaAccessibility() {
    // Add keyboard navigation for treatment cards
    const treatmentCards = document.querySelectorAll('.treatment-card');
    
    treatmentCards.forEach(card => {
        const button = card.querySelector('button');
        if (button) {
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
    });
    
    // Add ARIA labels for treatment images
    const treatmentImages = document.querySelectorAll('.treatment-image img');
    treatmentImages.forEach((img, index) => {
        if (!img.getAttribute('aria-label')) {
            const treatmentTitle = img.closest('.treatment-card').querySelector('h3').textContent;
            img.setAttribute('aria-label', `${treatmentTitle} - Spa treatment room`);
        }
    });
    
    // Announce page load for screen readers
    const pageTitle = document.querySelector('h1');
    if (pageTitle) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = 'Spa and Wellness page loaded. Use the category buttons to filter treatments.';
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            if (announcement.parentNode) {
                announcement.remove();
            }
        }, 3000);
    }
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Initialize Lucide icons when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Add CSS for modals and notifications
const spaStyles = `
    .spa-success-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
    
    .modal-content {
        background: white;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        z-index: 1001;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 25px;
        border-bottom: 1px solid #e0e0e0;
    }
    
    .modal-header h3 {
        margin: 0;
        color: #1a1a2e;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
        padding: 5px;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }
    
    .modal-close:hover {
        background: #f0f0f0;
    }
    
    .modal-body {
        padding: 25px;
        text-align: center;
    }
    
    .success-icon {
        font-size: 4rem;
        color: #28a745;
        margin-bottom: 20px;
    }
    
    .booking-details {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 10px;
        margin: 20px 0;
        text-align: left;
    }
    
    .booking-details h4 {
        margin: 0 0 15px 0;
        color: #1a1a2e;
    }
    
    .booking-details ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .booking-details li {
        padding: 5px 0;
        color: #666;
    }
    
    .confirmation-note {
        font-style: italic;
        color: #666;
        margin-top: 20px;
    }
    
    .modal-footer {
        padding: 20px 25px;
        border-top: 1px solid #e0e0e0;
        text-align: center;
    }
    
    .spa-error-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        max-width: 400px;
    }
    
    .error-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .error-text {
        flex: 1;
    }
    
    .error-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }
    
    .error-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .field-error {
        color: #dc3545;
        font-size: 0.9rem;
        margin-top: 5px;
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #dc3545;
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = spaStyles;
document.head.appendChild(styleSheet);
