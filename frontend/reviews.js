// Sample reviews data
const reviews = [
  {
    id: 1,
    category: "destinations",
    title: "Absolutely Magical Stay in the Swiss Alps",
    location: "Zermatt, Switzerland",
    rating: 5,
    reviewer: "Sarah Chen",
    date: "2024-12-15",
    verified: true,
    helpful: 23,
    content:
      "Our week at the Alpine Lodge was beyond expectations! The views of the Matterhorn from our room were breathtaking every morning. The staff went above and beyond to make our anniversary special. The spa was world-class and the location perfect for both summer hiking and easy access to skiing. Would definitely return!",
    avatar: "SC",
  },
  {
    id: 2,
    category: "experiences",
    title: "Life-Changing Hot Air Balloon Experience",
    location: "Cappadocia, Turkey",
    rating: 5,
    reviewer: "Michael Rodriguez",
    date: "2024-12-12",
    verified: true,
    helpful: 45,
    content:
      "Floating over the fairy chimneys at sunrise was pure magic. Our pilot was experienced and made everyone feel safe. The champagne breakfast after landing was a perfect touch. Photos don't do justice to the otherworldly landscape. This is a must-do experience that I'll treasure forever.",
    avatar: "MR",
  },
  {
    id: 3,
    category: "attractions",
    title: "Skip-the-Line Louvre Tour Was Worth Every Penny",
    location: "Paris, France",
    rating: 4,
    reviewer: "Emma Thompson",
    date: "2024-12-10",
    verified: true,
    helpful: 18,
    content:
      "Our art historian guide brought the masterpieces to life with fascinating stories. Seeing the Mona Lisa up close was surreal, and we learned so much about the museum's history. The only downside was how crowded it still was despite skip-the-line access, but that's not the tour's fault.",
    avatar: "ET",
  },
  {
    id: 4,
    category: "destinations",
    title: "Paradise Found in the Maldives",
    location: "Malé, Maldives",
    rating: 5,
    reviewer: "James Wilson",
    date: "2024-12-08",
    verified: true,
    helpful: 67,
    content:
      "The overwater villa exceeded all expectations. Crystal clear water, abundant marine life, and unparalleled privacy. The resort staff anticipated our every need. Snorkeling right from our deck was incredible. Yes, it's expensive, but for a once-in-a-lifetime honeymoon, it was perfect.",
    avatar: "JW",
  },
  {
    id: 5,
    category: "experiences",
    title: "Amazing Sushi Making Class in Tokyo",
    location: "Tokyo, Japan",
    rating: 5,
    reviewer: "Lisa Park",
    date: "2024-12-05",
    verified: true,
    helpful: 31,
    content:
      "Chef Tanaka was patient and passionate about teaching authentic techniques. We learned to make eight different types of sushi and visited the fish market. The sake pairing was educational and delicious. Taking home the recipe book means we can recreate this experience. Highly recommend!",
    avatar: "LP",
  },
  {
    id: 6,
    category: "attractions",
    title: "Colosseum Underground Tour - Fascinating History",
    location: "Rome, Italy",
    rating: 4,
    reviewer: "David Kumar",
    date: "2024-12-03",
    verified: true,
    helpful: 29,
    content:
      "Walking through the underground chambers where gladiators prepared for battle was spine-tingling. Our guide's knowledge of Roman history was impressive. The arena floor access gave us the gladiator's perspective. Only wish the tour was a bit longer given the price point.",
    avatar: "DK",
  },
  {
    id: 7,
    category: "destinations",
    title: "Tuscan Villa - Authentic Italian Experience",
    location: "Chianti, Italy",
    rating: 5,
    reviewer: "Anna Rossi",
    date: "2024-12-01",
    verified: true,
    helpful: 41,
    content:
      "Staying at Villa Bella Vista was like stepping into a dream. The cooking classes with Nonna were the highlight - learning family recipes passed down generations. The wine tasting in the vineyards, the rolling hills, the warm hospitality - everything was perfect. We're already planning our return!",
    avatar: "AR",
  },
  {
    id: 8,
    category: "experiences",
    title: "Serengeti Helicopter Safari - Unforgettable",
    location: "Serengeti, Tanzania",
    rating: 5,
    reviewer: "Robert Hayes",
    date: "2024-11-28",
    verified: true,
    helpful: 52,
    content:
      "Witnessing the great migration from above was breathtaking. Our pilot-guide spotted wildlife we never would have seen from the ground. The champagne breakfast in the wilderness felt surreal. Professional photography tips helped capture stunning shots. Expensive but absolutely worth it for this bucket list experience.",
    avatar: "RH",
  },
  {
    id: 9,
    category: "attractions",
    title: "Vatican After Hours - Peaceful and Spiritual",
    location: "Vatican City",
    rating: 5,
    reviewer: "Maria Garcia",
    date: "2024-11-25",
    verified: true,
    helpful: 38,
    content:
      "Having the Sistine Chapel almost to ourselves was extraordinary. The silence allowed for reflection and appreciation of Michelangelo's genius. Our guide's art history expertise made every room come alive. Being able to take photos was a bonus. This exclusive access is truly special.",
    avatar: "MG",
  },
  {
    id: 10,
    category: "destinations",
    title: "Desert Glamping Under Moroccan Stars",
    location: "Sahara Desert, Morocco",
    rating: 4,
    reviewer: "Ahmed Al-Rashid",
    date: "2024-11-22",
    verified: true,
    helpful: 25,
    content:
      "The luxury tents were surprisingly comfortable with proper beds and bathrooms. Camel trekking at sunset was magical, and the traditional Berber music around the campfire was enchanting. The stargazing was incredible with zero light pollution. Only issue was the wind one night, but that's nature!",
    avatar: "AR",
  },
  {
    id: 11,
    category: "experiences",
    title: "Northern Lights Photography Tour Success",
    location: "Tromsø, Norway",
    rating: 4,
    reviewer: "Yuki Tanaka",
    date: "2024-11-20",
    verified: true,
    helpful: 33,
    content:
      "After three nights of cloudy skies, we finally saw the Aurora Borealis in all its glory! Our photographer guide helped adjust camera settings for perfect shots. The hot chocolate and warm clothing provided were essential. Patience is required for this natural phenomenon, but the payoff is incredible.",
    avatar: "YT",
  },
  {
    id: 12,
    category: "attractions",
    title: "Broadway Lion King - Spectacular Production",
    location: "New York, USA",
    rating: 5,
    reviewer: "Jennifer Adams",
    date: "2024-11-18",
    verified: true,
    helpful: 44,
    content:
      "The costumes and puppetry were absolutely stunning - unlike anything I've ever seen. The opening procession through the aisles gave me chills. Every song was performed flawlessly, and the children in the audience were mesmerized. Even as an adult, I was transported to the Pride Lands. A true Broadway masterpiece!",
    avatar: "JA",
  },
];

// Global variables
let currentReviews = [...reviews];
let currentCategory = "all";
let currentRating = "all";
let currentSort = "newest";
let currentView = "card";
let displayedCount = 8;
let selectedRating = 0;

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Set up event listeners
  setupEventListeners();

  // Initial render
  filterAndRenderReviews();
  updateResultsCount();
});

function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", handleSearch);

  // Category filters
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      currentCategory = this.dataset.category;
      displayedCount = 8;
      filterAndRenderReviews();
    });
  });

  // Rating filter
  const ratingFilter = document.getElementById("ratingFilter");
  ratingFilter.addEventListener("change", function () {
    currentRating = this.value;
    displayedCount = 8;
    filterAndRenderReviews();
  });

  // Sort select
  const sortSelect = document.getElementById("sortSelect");
  sortSelect.addEventListener("change", function () {
    currentSort = this.value;
    filterAndRenderReviews();
  });

  // View toggles
  const viewBtns = document.querySelectorAll(".view-btn");
  viewBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      viewBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      currentView = this.dataset.view;
      updateView();
    });
  });

  // Load more button
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  loadMoreBtn.addEventListener("click", function () {
    displayedCount += 8;
    renderReviews();

    if (displayedCount >= currentReviews.length) {
      this.style.display = "none";
    }
  });

  // Write review button
  const writeReviewBtn = document.getElementById("writeReviewBtn");
  writeReviewBtn.addEventListener("click", openWriteReviewModal);

  // Modal close buttons
  const closeModal = document.getElementById("closeModal");
  const closeWriteModal = document.getElementById("closeWriteModal");
  const modal = document.getElementById("reviewModal");
  const writeModal = document.getElementById("writeReviewModal");

  closeModal.addEventListener("click", closeReviewModal);
  closeWriteModal.addEventListener("click", closeWriteReviewModal);

  modal.addEventListener("click", function (e) {
    if (e.target === this) {
      closeReviewModal();
    }
  });

  writeModal.addEventListener("click", function (e) {
    if (e.target === this) {
      closeWriteReviewModal();
    }
  });

  // Review form
  setupReviewForm();

  // ESC key to close modals
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeReviewModal();
      closeWriteReviewModal();
    }
  });
}

function handleSearch() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  displayedCount = 8;
  filterAndRenderReviews(searchTerm);
}

function filterAndRenderReviews(searchTerm = "") {
  let filtered = [...reviews];

  // Filter by category
  if (currentCategory !== "all") {
    filtered = filtered.filter((review) => review.category === currentCategory);
  }

  // Filter by rating
  if (currentRating !== "all") {
    const minRating = parseInt(currentRating);
    filtered = filtered.filter((review) => review.rating >= minRating);
  }

  // Filter by search term
  if (searchTerm) {
    filtered = filtered.filter(
      (review) =>
        review.title.toLowerCase().includes(searchTerm) ||
        review.location.toLowerCase().includes(searchTerm) ||
        review.content.toLowerCase().includes(searchTerm) ||
        review.reviewer.toLowerCase().includes(searchTerm),
    );
  }

  // Sort reviews
  filtered.sort((a, b) => {
    switch (currentSort) {
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "helpful":
        return b.helpful - a.helpful;
      case "newest":
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  currentReviews = filtered;
  renderReviews();
  updateResultsCount();
}

function renderReviews() {
  const container = document.getElementById("reviewsContainer");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  container.classList.add("loading");

  setTimeout(() => {
    container.innerHTML = "";

    const reviewsToShow = currentReviews.slice(0, displayedCount);

    reviewsToShow.forEach((review, index) => {
      const card = createReviewCard(review);
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add("fade-in");
      container.appendChild(card);
    });

    if (displayedCount >= currentReviews.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }

    container.classList.remove("loading");

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }, 300);
}

function createReviewCard(review) {
  const card = document.createElement("div");
  card.className = "review-card";

  const timeAgo = getTimeAgo(review.date);
  const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

  card.innerHTML = `
    <div class="review-category">${getCategoryLabel(review.category)}</div>
    <div class="review-header">
      <div class="reviewer-avatar">${review.avatar}</div>
      <div class="reviewer-info">
        <div class="reviewer-name">${review.reviewer}</div>
        <div class="review-date">${timeAgo}</div>
        <div class="review-rating">
          ${Array.from(
            { length: 5 },
            (_, i) =>
              `<i data-lucide="star" style="color: ${i < review.rating ? "#fbbf24" : "#d1d5db"}"></i>`,
          ).join("")}
        </div>
      </div>
    </div>
    <h3 class="review-title">${review.title}</h3>
    <div class="review-location">
      <i data-lucide="map-pin"></i>
      <span>${review.location}</span>
    </div>
    <p class="review-content">${review.content}</p>
    <div class="review-footer">
      <div class="review-helpful">
        <button class="helpful-btn" data-id="${review.id}">
          <i data-lucide="thumbs-up"></i>
          Helpful (${review.helpful})
        </button>
      </div>
      ${
        review.verified
          ? '<div class="review-verified"><i data-lucide="shield-check"></i><span>Verified</span></div>'
          : ""
      }
    </div>
  `;

  card.addEventListener("click", function (e) {
    if (!e.target.closest(".helpful-btn")) {
      openReviewModal(review);
    }
  });

  const helpfulBtn = card.querySelector(".helpful-btn");
  helpfulBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleHelpful(this, review.id);
  });

  return card;
}

function getCategoryLabel(category) {
  const labels = {
    destinations: "Destination",
    experiences: "Experience",
    attractions: "Attraction",
  };
  return labels[category] || category;
}

function getTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

function toggleHelpful(button, reviewId) {
  button.classList.toggle("active");

  // Update helpful count
  const currentCount = parseInt(button.textContent.match(/\d+/)[0]);
  const newCount = button.classList.contains("active")
    ? currentCount + 1
    : currentCount - 1;
  button.innerHTML = `<i data-lucide="thumbs-up"></i>Helpful (${newCount})`;

  // Re-initialize icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  console.log(`Toggled helpful for review ${reviewId}`);
}

function updateView() {
  const container = document.getElementById("reviewsContainer");
  container.classList.remove("list-view");
  if (currentView === "list") {
    container.classList.add("list-view");
  }
}

function updateResultsCount() {
  const countElement = document.getElementById("resultsCount");
  countElement.textContent = currentReviews.length;
}

function openReviewModal(review) {
  const modal = document.getElementById("reviewModal");
  const modalBody = document.getElementById("modalBody");

  const stars = Array.from(
    { length: 5 },
    (_, i) =>
      `<i data-lucide="star" style="color: ${i < review.rating ? "#fbbf24" : "#d1d5db"}"></i>`,
  ).join("");

  modalBody.innerHTML = `
    <div class="review-header" style="margin-bottom: 24px;">
      <div class="reviewer-avatar">${review.avatar}</div>
      <div class="reviewer-info">
        <div class="reviewer-name" style="font-size: 1.125rem; margin-bottom: 4px;">${review.reviewer}</div>
        <div class="review-date">${getTimeAgo(review.date)}</div>
        <div class="review-rating" style="margin-top: 8px;">
          ${stars}
        </div>
      </div>
    </div>
    
    <h2 class="modal-title" style="margin-bottom: 8px;">${review.title}</h2>
    
    <div class="review-location" style="margin-bottom: 16px; font-size: 16px;">
      <i data-lucide="map-pin"></i>
      <span>${review.location}</span>
    </div>
    
    <div style="background: #f8fafc; padding: 4px 8px; border-radius: 12px; display: inline-block; margin-bottom: 20px; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 500;">
      ${getCategoryLabel(review.category)}
    </div>
    
    <p style="color: #4b5563; line-height: 1.7; margin-bottom: 24px; font-size: 16px;">${review.content}</p>
    
    <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      <button class="helpful-btn" data-id="${review.id}">
        <i data-lucide="thumbs-up"></i>
        Helpful (${review.helpful})
      </button>
      ${
        review.verified
          ? '<div class="review-verified"><i data-lucide="shield-check"></i><span>Verified Review</span></div>'
          : ""
      }
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  const helpfulBtn = modalBody.querySelector(".helpful-btn");
  helpfulBtn.addEventListener("click", function () {
    toggleHelpful(this, review.id);
  });
}

function closeReviewModal() {
  const modal = document.getElementById("reviewModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

function openWriteReviewModal() {
  const modal = document.getElementById("writeReviewModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Reset form
  document.getElementById("reviewForm").reset();
  selectedRating = 0;
  updateStarRating();
}

function closeWriteReviewModal() {
  const modal = document.getElementById("writeReviewModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

function setupReviewForm() {
  // Star rating functionality
  const starBtns = document.querySelectorAll(".star-btn");
  starBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      selectedRating = parseInt(this.dataset.rating);
      document.getElementById("reviewRating").value = selectedRating;
      updateStarRating();
    });

    btn.addEventListener("mouseenter", function () {
      const rating = parseInt(this.dataset.rating);
      highlightStars(rating);
    });
  });

  document
    .getElementById("ratingInput")
    .addEventListener("mouseleave", function () {
      updateStarRating();
    });

  // Form submission
  document
    .getElementById("reviewForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      submitReview();
    });

  // Cancel button
  document
    .getElementById("cancelReview")
    .addEventListener("click", closeWriteReviewModal);
}

function highlightStars(rating) {
  const starBtns = document.querySelectorAll(".star-btn");
  starBtns.forEach((btn, index) => {
    if (index < rating) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function updateStarRating() {
  const starBtns = document.querySelectorAll(".star-btn");
  starBtns.forEach((btn, index) => {
    if (index < selectedRating) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function submitReview() {
  const formData = {
    type: document.getElementById("reviewType").value,
    title: document.getElementById("reviewTitle").value,
    rating: selectedRating,
    content: document.getElementById("reviewContent").value,
    location: document.getElementById("reviewLocation").value,
  };

  // Validate required fields
  if (
    !formData.type ||
    !formData.title ||
    !formData.rating ||
    !formData.content
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  // Simulate review submission
  console.log("Submitting review:", formData);

  // Show success message
  alert("Thank you for your review! It will be published after moderation.");

  // Close modal
  closeWriteReviewModal();
}

console.log("Reviews page initialized successfully!");
