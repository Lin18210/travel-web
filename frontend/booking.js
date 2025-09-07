// Booking form state management
let currentStep = 1;
const totalSteps = 3;

// Form data storage
let bookingData = {
  personal: {},
  payment: {},
  booking: {},
};

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Set up event listeners
  setupEventListeners();
  setupFormValidation();
  setupPaymentInputs();
  populateBookingDetails();
  loadSelectedRoom();
});

function setupEventListeners() {
  // Step navigation
  document.getElementById("nextToPayment").addEventListener("click", () => {
    if (validatePersonalInfo()) {
      goToStep(2);
    }
  });

  document.getElementById("reviewBooking").addEventListener("click", () => {
    if (validatePaymentInfo()) {
      goToStep(3);
    }
  });

  document.getElementById("backToPersonal").addEventListener("click", () => {
    goToStep(1);
  });

  document.getElementById("backToPayment").addEventListener("click", () => {
    goToStep(2);
  });

  // Form submission
  document
    .getElementById("bookingForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      processBooking();
    });

  // Payment method selection
  const paymentOptions = document.querySelectorAll(".payment-option");
  paymentOptions.forEach((option) => {
    option.addEventListener("click", function () {
      paymentOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");

      const input = this.querySelector("input[type='radio']");
      input.checked = true;

      // Show/hide card details based on selection
      const cardDetails = document.getElementById("cardDetails");
      if (input.value === "card") {
        cardDetails.style.display = "block";
      } else {
        cardDetails.style.display = "none";
      }
    });
  });

  // Billing address toggle
  document
    .getElementById("sameAsPersonal")
    .addEventListener("change", function () {
      const billingAddress = document.getElementById("billingAddress");
      if (this.checked) {
        billingAddress.style.display = "none";
        copyPersonalToBilling();
      } else {
        billingAddress.style.display = "block";
      }
    });

  // Success modal
  document.getElementById("viewBooking").addEventListener("click", function () {
    alert("This would redirect to the booking details page.");
  });
}

function setupFormValidation() {
  // Real-time validation for required fields
  const requiredInputs = document.querySelectorAll(
    "input[required], select[required]",
  );

  requiredInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      if (this.classList.contains("error")) {
        validateField(this);
      }
    });
  });
}

function setupPaymentInputs() {
  // Card number formatting
  const cardNumber = document.getElementById("cardNumber");
  cardNumber.addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "");
    value = value.substring(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    this.value = value;
  });

  // Expiry date formatting
  const expiryDate = document.getElementById("expiryDate");
  expiryDate.addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "");
    value = value.substring(0, 4);
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2);
    }
    this.value = value;
  });

  // CVV formatting
  const cvv = document.getElementById("cvv");
  cvv.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").substring(0, 4);
  });
}

function goToStep(step) {
  // Hide all sections
  document.querySelectorAll(".form-section").forEach((section) => {
    section.classList.remove("active");
  });

  // Show target section
  const sections = ["personalSection", "paymentSection", "confirmationSection"];
  document.getElementById(sections[step - 1]).classList.add("active");

  // Update progress steps
  updateProgressSteps(step);
  currentStep = step;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateProgressSteps(activeStep) {
  const steps = document.querySelectorAll(".step");
  const lines = document.querySelectorAll(".step-line");

  steps.forEach((step, index) => {
    if (index < activeStep) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  lines.forEach((line, index) => {
    if (index < activeStep - 1) {
      line.classList.add("active");
    } else {
      line.classList.remove("active");
    }
  });
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  // Remove existing error state
  field.classList.remove("error");
  const existingError = field.parentNode.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Check if required field is empty
  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "This field is required";
  }

  // Email validation
  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = "Please enter a valid email address";
    }
  }

  // Phone validation
  if (field.type === "tel" && value) {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$|^\+\d{10,15}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ""))) {
      isValid = false;
      errorMessage = "Please enter a valid phone number";
    }
  }

  // Card number validation
  if (field.id === "cardNumber" && value) {
    const cardRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
    if (!cardRegex.test(value)) {
      isValid = false;
      errorMessage = "Please enter a valid card number";
    }
  }

  // Expiry date validation
  if (field.id === "expiryDate" && value) {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(value)) {
      isValid = false;
      errorMessage = "Please enter a valid expiry date (MM/YY)";
    } else {
      // Check if date is in the future
      const [month, year] = value.split("/");
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const now = new Date();
      if (expiry < now) {
        isValid = false;
        errorMessage = "Card has expired";
      }
    }
  }

  // CVV validation
  if (field.id === "cvv" && value) {
    if (value.length < 3) {
      isValid = false;
      errorMessage = "CVV must be 3-4 digits";
    }
  }

  // Show error state if invalid
  if (!isValid) {
    field.classList.add("error");
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = errorMessage;
    field.parentNode.appendChild(errorDiv);
  }

  return isValid;
}

function validatePersonalInfo() {
  const requiredFields = ["firstName", "lastName", "email", "phone", "country"];

  let isValid = true;

  requiredFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (!validateField(field)) {
      isValid = false;
    }
  });

  if (isValid) {
    // Store personal data
    bookingData.personal = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      country: document.getElementById("country").value,
      emergencyName: document.getElementById("emergencyName").value,
      emergencyPhone: document.getElementById("emergencyPhone").value,
      specialRequests: document.getElementById("specialRequests").value,
    };
  }

  return isValid;
}

function validatePaymentInfo() {
  const paymentMethod = document.querySelector(
    "input[name='paymentMethod']:checked",
  ).value;

  if (paymentMethod === "card") {
    const requiredFields = [
      "cardNumber",
      "expiryDate",
      "cvv",
      "cardholderName",
    ];

    let isValid = true;

    requiredFields.forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      if (!validateField(field)) {
        isValid = false;
      }
    });

    // Validate billing address if not same as personal
    if (!document.getElementById("sameAsPersonal").checked) {
      const billingFields = [
        "billingAddress1",
        "billingCity",
        "billingState",
        "billingZip",
        "billingCountry",
      ];

      billingFields.forEach((fieldId) => {
        const field = document.getElementById(fieldId);
        if (!validateField(field)) {
          isValid = false;
        }
      });
    }

    if (isValid) {
      // Store payment data
      bookingData.payment = {
        method: paymentMethod,
        cardNumber: document.getElementById("cardNumber").value,
        expiryDate: document.getElementById("expiryDate").value,
        cardholderName: document.getElementById("cardholderName").value,
        billingAddress: getBillingAddress(),
      };
    }

    return isValid;
  } else {
    // For non-card payments, just store the method
    bookingData.payment = { method: paymentMethod };
    return true;
  }
}

function copyPersonalToBilling() {
  // This would copy personal information to billing address fields
  // For demo purposes, we'll just hide the billing section
  console.log("Copying personal information to billing address");
}

function getBillingAddress() {
  if (document.getElementById("sameAsPersonal").checked) {
    return "Same as personal information";
  } else {
    return {
      address1: document.getElementById("billingAddress1").value,
      address2: document.getElementById("billingAddress2").value,
      city: document.getElementById("billingCity").value,
      state: document.getElementById("billingState").value,
      zip: document.getElementById("billingZip").value,
      country: document.getElementById("billingCountry").value,
    };
  }
}

function populateBookingDetails() {
  // Check if there's pending booking data from localStorage
  const pendingBooking = localStorage.getItem("pendingBooking");
  let bookingDetails;

  if (pendingBooking) {
    const bookingData = JSON.parse(pendingBooking);

    // Calculate dates (default to next week for 5 nights)
    const checkinDate = new Date();
    checkinDate.setDate(checkinDate.getDate() + 7);
    const checkoutDate = new Date(checkinDate);
    checkoutDate.setDate(checkoutDate.getDate() + 5);

    // Calculate pricing based on the item
    const basePrice = bookingData.price || 199;
    const nights = 5;
    const subtotal = basePrice * nights;
    const serviceKee = Math.round(subtotal * 0.08);
    const taxes = Math.round(subtotal * 0.12);
    const total = subtotal + serviceKee + taxes;

    bookingDetails = {
      item: bookingData.title,
      location: bookingData.location,
      rating: bookingData.rating,
      reviews: bookingData.reviews,
      checkin: checkinDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      checkout: checkoutDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      guests: "2 Adults",
      duration: `${nights} nights`,
      price: {
        base: subtotal,
        service: serviceKee,
        taxes: taxes,
        total: total,
      },
      image: bookingData.image,
    };

    // Update the booking item details
    const bookingItem = document.getElementById("bookingItem");
    if (bookingItem) {
      let imgHtml = '';
      if (bookingDetails.image) {
        imgHtml = `<img src="${bookingDetails.image}" alt="${bookingDetails.item}" class="booking-summary-img" onerror="this.style.display='none'">`;
      } else {
        imgHtml = `<div class='booking-summary-img placeholder-img'></div>`;
      }
      bookingItem.innerHTML = `
        <div class="item-image">
          ${imgHtml}
        </div>
        <div class="item-details">
          <h4>${bookingDetails.item}</h4>
          <p class="item-location">
            <i data-lucide="map-pin"></i>
            ${bookingDetails.location}
          </p>
          <div class="item-rating">
            <i data-lucide="star"></i>
            <span>${bookingDetails.rating} (${bookingDetails.reviews} reviews)</span>
          </div>
        </div>
      `;
    }

    // Update price breakdown
    document.querySelector(".price-breakdown").innerHTML = `
      <div class="price-row">
        <span>$${basePrice} × ${nights} nights</span>
        <span>$${subtotal}</span>
      </div>
      <div class="price-row">
        <span>Service fee</span>
        <span>$${serviceKee}</span>
      </div>
      <div class="price-row">
        <span>Taxes</span>
        <span>$${taxes}</span>
      </div>
      <div class="price-row total">
        <span>Total</span>
        <span>$${total}</span>
      </div>
    `;
  } else {
    // Default sample data if no pending booking
    bookingDetails = {
      item: "Alpine Mountain Lodge",
      location: "Zermatt, Switzerland",
      rating: 4.8,
      reviews: 127,
      checkin: "Dec 20, 2024",
      checkout: "Dec 25, 2024",
      guests: "2 Adults",
      duration: "5 nights",
      price: {
        base: 995,
        service: 89,
        taxes: 161,
        total: 1245,
      },
    };
  }

  // Update booking summary
  document.getElementById("checkinDate").textContent = bookingDetails.checkin;
  document.getElementById("checkoutDate").textContent = bookingDetails.checkout;
  document.getElementById("guestCount").textContent = bookingDetails.guests;
  document.getElementById("duration").textContent = bookingDetails.duration;

  // Update confirm button total
  document.querySelector(".total-amount").textContent =
    `$${bookingDetails.price.total}`;

  // Re-initialize icons if they were added dynamically
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// Load selected room data from sessionStorage
function loadSelectedRoom() {
  const selectedRoom = sessionStorage.getItem('selectedRoom');
  
  if (selectedRoom) {
    try {
      const roomData = JSON.parse(selectedRoom);
      
      // Update booking summary with selected room
      const bookingItem = document.getElementById('bookingItem');
      if (bookingItem) {
        const itemImage = bookingItem.querySelector('.item-image');
        const itemDetails = bookingItem.querySelector('.item-details h4');
        const itemLocation = bookingItem.querySelector('.item-location');
        
        if (itemImage) {
          itemImage.innerHTML = `<img src="${roomData.image}" alt="${roomData.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`;
        }
        
        if (itemDetails) {
          itemDetails.textContent = roomData.name;
        }
        
        if (itemLocation) {
          itemLocation.innerHTML = '<i data-lucide="map-pin"></i> Grand Vista Resort';
        }
      }
      
      // Update price based on selected room
      const priceRows = document.querySelectorAll('.price-row');
      if (priceRows.length > 0) {
        // Extract price number from room price (remove $ and any text)
        const roomPrice = parseInt(roomData.price.replace(/[^0-9]/g, ''));
        const nights = 5; // Default nights
        const totalRoomPrice = roomPrice * nights;
        const serviceFee = Math.round(totalRoomPrice * 0.09); // 9% service fee
        const taxes = Math.round(totalRoomPrice * 0.16); // 16% taxes
        const total = totalRoomPrice + serviceFee + taxes;
        
        // Update price breakdown
        if (priceRows[0]) {
          priceRows[0].innerHTML = `<span>$${roomPrice} × ${nights} nights</span><span>$${totalRoomPrice}</span>`;
        }
        if (priceRows[1]) {
          priceRows[1].innerHTML = `<span>Service fee</span><span>$${serviceFee}</span>`;
        }
        if (priceRows[2]) {
          priceRows[2].innerHTML = `<span>Taxes</span><span>$${taxes}</span>`;
        }
        if (priceRows[3]) {
          priceRows[3].innerHTML = `<span>Total</span><span>$${total}</span>`;
        }
        
        // Update total amount in confirm button
        const totalAmount = document.querySelector('.total-amount');
        if (totalAmount) {
          totalAmount.textContent = `$${total}`;
        }
      }
      
      // Reinitialize Lucide icons
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
      
    } catch (error) {
      console.error('Error parsing selected room data:', error);
    }
  }
}

async function processBooking() {
  // Validate terms agreement
  if (!document.getElementById("agreeTerms").checked) {
    alert("Please agree to the Terms & Conditions to proceed.");
    return;
  }

  // Check authentication
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  if (!token) {
    alert('You must be logged in to complete a booking. Please log in or sign up.');
    window.location.href = 'login.html';
    return;
  }

  // Show loading state
  const confirmBtn = document.getElementById("confirmBooking");
  const originalText = confirmBtn.innerHTML;
  confirmBtn.innerHTML = '<i data-lucide="loader-2"></i> Processing...';
  confirmBtn.disabled = true;

  // Re-initialize icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Gather booking details (replace with your actual data structure)
  const pendingBooking = JSON.parse(localStorage.getItem('pendingBooking') || '{}');
  
  // Format dates to YYYY-MM-DD
  const formatDateForServer = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
  };

  const bookingDetails = {
    destination: pendingBooking.title || pendingBooking.item || pendingBooking.location || 'Unknown',
    check_in: formatDateForServer(pendingBooking.checkinDate) || '2024-12-20',
    check_out: formatDateForServer(pendingBooking.checkoutDate) || '2024-12-25',
    guests: parseInt((pendingBooking.guests || '2').toString().replace(/\D/g, '')) || 2,
    total_price: pendingBooking.price?.total || 1245
  };

  try {
    // Send booking to backend
    const response = await fetch('http://localhost:3000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bookingDetails),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Booking failed');
    }

    // Show booking reference from backend
    document.getElementById("bookingReference").textContent = 'TRV-' + data.booking.id;
    showSuccessModal();
    localStorage.removeItem("pendingBooking");
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
    
    // Redirect to profile page after 2 seconds
    setTimeout(() => {
      window.location.href = 'profile.html#bookings';
    }, 2000);
  } catch (error) {
    alert('Booking failed: ' + error.message);
  } finally {
    confirmBtn.innerHTML = originalText;
    confirmBtn.disabled = false;
  }
}

function showSuccessModal() {
  const modal = document.getElementById("successModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Auto-hide after 10 seconds
  setTimeout(() => {
    closeSuccessModal();
  }, 10000);
}

function closeSuccessModal() {
  const modal = document.getElementById("successModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Handle browser back/forward buttons
window.addEventListener("popstate", function (event) {
  if (event.state && event.state.step) {
    goToStep(event.state.step);
  }
});

// Auto-save form data to localStorage
function saveFormData() {
  localStorage.setItem("bookingFormData", JSON.stringify(bookingData));
}

function loadFormData() {
  const savedData = localStorage.getItem("bookingFormData");
  if (savedData) {
    bookingData = JSON.parse(savedData);
    // Populate form fields with saved data
    populateFormFields();
  }
}

function populateFormFields() {
  // This would populate form fields with saved data
  // Implementation depends on specific requirements
  console.log("Populating form fields with saved data");
}

// Clear saved data on successful booking
function clearSavedData() {
  localStorage.removeItem("bookingFormData");
}

// Initialize form data loading
document.addEventListener("DOMContentLoaded", function () {
  loadFormData();
});

// Save data on form changes
document.addEventListener("input", function () {
  saveFormData();
});

console.log("Booking page initialized successfully!");
