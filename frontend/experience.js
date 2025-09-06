// Sample experience data
const experiences = [
  {
    id: 1,
    title: "Authentic Sushi Making Class",
    location: "Tokyo, Japan",
    category: "food",
    duration: "3 hours",
    durationCategory: "short",
    price: 125,
    priceCategory: "mid",
    rating: 4.9,
    reviews: 234,
    maxParticipants: 8,
    minAge: 12,
    language: "English, Japanese",
    description:
      "Learn the ancient art of sushi making from a master chef in an authentic Tokyo kitchen. Includes market visit and sake tasting.",
    highlights: [
      "Visit traditional fish market",
      "Learn knife techniques",
      "Make 8 different sushi types",
      "Sake pairing session",
      "Take-home recipe book",
      "Small group experience",
    ],
    includes: ["Market Tour", "Lunch", "Sake", "Recipes"],
    image: "assets/experience/authentic-sushi.jpg",
  },
  {
    id: 2,
    title: "Sunrise Helicopter Safari",
    location: "Serengeti, Tanzania",
    category: "adventure",
    duration: "4 hours",
    durationCategory: "half",
    price: 485,
    priceCategory: "luxury",
    rating: 4.8,
    reviews: 89,
    maxParticipants: 4,
    minAge: 8,
    language: "English, Swahili",
    description:
      "Witness the breathtaking Serengeti from above during golden hour. Spot wildlife migrations and land for champagne breakfast in the wilderness.",
    highlights: [
      "Aerial wildlife photography",
      "Sunrise over Serengeti",
      "Champagne breakfast",
      "Professional pilot guide",
      "Wildlife migration views",
      "Luxury helicopter experience",
    ],
    includes: ["Transport", "Breakfast", "Champagne", "Photography"],
    image: "assets/experience/sunrise.jpg",
  },
  {
    id: 3,
    title: "Vatican Private After-Hours Tour",
    location: "Vatican City, Italy",
    category: "cultural",
    duration: "2.5 hours",
    durationCategory: "short",
    price: 89,
    priceCategory: "mid",
    rating: 4.7,
    reviews: 456,
    maxParticipants: 15,
    minAge: 6,
    language: "English, Italian, Spanish",
    description:
      "Exclusive access to Vatican Museums and Sistine Chapel after closing hours. Skip all crowds and enjoy intimate atmosphere with expert guide.",
    highlights: [
      "No crowds experience",
      "Sistine Chapel exclusive access",
      "Expert art historian guide",
      "Skip-the-line entry",
      "Photography allowed",
      "Vatican Gardens visit",
    ],
    includes: ["Guide", "Entry Fees", "Headsets", "Gardens"],
    image: "assets/experience/Vatican.jpg",
  },
  {
    id: 4,
    title: "Meditation Retreat in Himalayas",
    location: "Rishikesh, India",
    category: "wellness",
    duration: "Full day",
    durationCategory: "full",
    price: 75,
    priceCategory: "budget",
    rating: 4.9,
    reviews: 167,
    maxParticipants: 12,
    minAge: 16,
    language: "English, Hindi",
    description:
      "Find inner peace with guided meditation, yoga, and spiritual teachings by the sacred Ganges River in the yoga capital of the world.",
    highlights: [
      "Riverside meditation",
      "Traditional yoga sessions",
      "Spiritual philosophy teachings",
      "Vegetarian lunch",
      "Sacred site visits",
      "Certification available",
    ],
    includes: ["Yoga Mat", "Lunch", "Transport", "Certificate"],
    image: "assets/experience/meditation.jpg",
  },
  {
    id: 5,
    title: "Northern Lights Photography Tour",
    location: "Tromsø, Norway",
    category: "nature",
    duration: "6 hours",
    durationCategory: "half",
    price: 195,
    priceCategory: "premium",
    rating: 4.6,
    reviews: 298,
    maxParticipants: 8,
    minAge: 10,
    language: "English, Norwegian",
    description:
      "Chase the magical Aurora Borealis with professional photographer guides. Learn techniques and capture stunning images of nature's light show.",
    highlights: [
      "Professional photo guidance",
      "Camera equipment provided",
      "Multiple viewing locations",
      "Hot drinks and snacks",
      "Photo editing tips",
      "Small group guarantee",
    ],
    includes: ["Camera Gear", "Transport", "Snacks", "Photos"],
    image: "assets/experience/northern.webp",
  },
  {
    id: 6,
    title: "Underground Cave Exploration",
    location: "Cenotes, Mexico",
    category: "adventure",
    duration: "5 hours",
    durationCategory: "half",
    price: 145,
    priceCategory: "mid",
    rating: 4.8,
    reviews: 134,
    maxParticipants: 6,
    minAge: 14,
    language: "English, Spanish",
    description:
      "Dive into crystal-clear cenotes and explore underground cave systems. Snorkel through otherworldly formations in sacred Mayan waters.",
    highlights: [
      "3 different cenotes",
      "Professional dive guide",
      "Underwater photography",
      "Mayan history stories",
      "Equipment included",
      "Traditional lunch",
    ],
    includes: ["Snorkel Gear", "Lunch", "Transport", "Guide"],
    image: "assets/experience/underground.jpg",
  },
  {
    id: 7,
    title: "Truffle Hunting Adventure",
    location: "Provence, France",
    category: "food",
    duration: "4 hours",
    durationCategory: "half",
    price: 165,
    priceCategory: "premium",
    rating: 4.9,
    reviews: 87,
    maxParticipants: 10,
    minAge: 8,
    language: "English, French",
    description:
      "Join local truffle hunters and their trained dogs to search for black gold in ancient French countryside. Includes wine tasting and cooking class.",
    highlights: [
      "Trained truffle dogs",
      "Forest expedition",
      "Truffle cooking class",
      "Local wine tasting",
      "Farm-to-table lunch",
      "Take-home truffles",
    ],
    includes: ["Dogs", "Cooking", "Wine", "Lunch"],
    image: "assets/experience/truffle.jpeg",
  },
  {
    id: 8,
    title: "Ancient Temples Bike Tour",
    location: "Angkor, Cambodia",
    category: "tours",
    duration: "8 hours",
    durationCategory: "full",
    price: 55,
    priceCategory: "budget",
    rating: 4.7,
    reviews: 312,
    maxParticipants: 12,
    minAge: 12,
    language: "English, Khmer",
    description:
      "Cycle through jungle paths to discover hidden temples and learn about Khmer civilization. Includes sunrise at Angkor Wat and local village visit.",
    highlights: [
      "Angkor Wat sunrise",
      "Hidden temple discoveries",
      "Village interaction",
      "Jungle cycling paths",
      "Historical storytelling",
      "Local lunch",
    ],
    includes: ["Bike", "Helmet", "Guide", "Lunch"],
    image: "assets/experience/ancient.jpg",
  },
  {
    id: 9,
    title: "Volcano Trekking Experience",
    location: "Mount Fuji, Japan",
    category: "adventure",
    duration: "2 days",
    durationCategory: "multi",
    price: 320,
    priceCategory: "premium",
    rating: 4.8,
    reviews: 156,
    maxParticipants: 8,
    minAge: 16,
    language: "English, Japanese",
    description:
      "Climb Japan's sacred mountain with experienced guides. Overnight in mountain hut and witness spectacular sunrise from the summit.",
    highlights: [
      "Summit sunrise",
      "Mountain hut stay",
      "Professional guides",
      "Safety equipment",
      "Traditional breakfast",
      "Certificate of completion",
    ],
    includes: ["Guide", "Accommodation", "Meals", "Gear"],
    image: "assets/experience/volcano.webp",
  },
  {
    id: 10,
    title: "Flamenco and Tapas Evening",
    location: "Seville, Spain",
    category: "cultural",
    duration: "3.5 hours",
    durationCategory: "short",
    price: 95,
    priceCategory: "mid",
    rating: 4.9,
    reviews: 278,
    maxParticipants: 20,
    minAge: 6,
    language: "English, Spanish",
    description:
      "Immerse yourself in authentic Andalusian culture with passionate flamenco performance and traditional tapas in historic neighborhood.",
    highlights: [
      "Authentic flamenco show",
      "Traditional tapas tour",
      "Local neighborhood walk",
      "Sherry tasting",
      "Dance lesson included",
      "Cultural insights",
    ],
    includes: ["Show", "Tapas", "Drinks", "Guide"],
    image: "assets/experience/flamenco.webp",
  },
  {
    id: 11,
    title: "Arctic Wildlife Photography",
    location: "Svalbard, Norway",
    category: "nature",
    duration: "10 hours",
    durationCategory: "full",
    price: 425,
    priceCategory: "luxury",
    rating: 4.9,
    reviews: 67,
    maxParticipants: 6,
    minAge: 14,
    language: "English, Norwegian",
    description:
      "Photograph polar bears, arctic foxes, and seals in their natural habitat. Professional wildlife photographer guides ensure amazing shots.",
    highlights: [
      "Polar bear encounters",
      "Professional photo guidance",
      "Arctic wildlife tracking",
      "Specialized equipment",
      "Small group guarantee",
      "Photo editing workshop",
    ],
    includes: ["Transport", "Equipment", "Guide", "Lunch"],
    image: "assets/experience/arctic.webp",
  },
  {
    id: 12,
    title: "Traditional Cooking with Nonna",
    location: "Tuscany, Italy",
    category: "food",
    duration: "6 hours",
    durationCategory: "half",
    price: 135,
    priceCategory: "mid",
    rating: 4.8,
    reviews: 189,
    maxParticipants: 8,
    minAge: 8,
    language: "English, Italian",
    description:
      "Learn authentic Italian recipes from a local grandmother in her family kitchen. Make pasta, sauce, and dessert using traditional methods.",
    highlights: [
      "Family kitchen setting",
      "Traditional recipes",
      "Handmade pasta making",
      "Garden herb picking",
      "Family-style dining",
      "Recipe cards to take home",
    ],
    includes: ["Ingredients", "Lunch", "Recipes", "Wine"],
    image: "assets/experience/traditional-cooking.jpg",
  },
];

// Global variables
let currentExperiences = [...experiences];
let currentCategory = "all";
let currentDuration = "all";
let currentPrice = "all";
let currentSort = "popular";
let currentView = "grid";
let displayedCount = 9;

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Set up event listeners
  setupEventListeners();

  // Initial render
  filterAndRenderExperiences();
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
      displayedCount = 9;
      filterAndRenderExperiences();
    });
  });

  // Duration filter
  const durationFilter = document.getElementById("durationFilter");
  durationFilter.addEventListener("change", function () {
    currentDuration = this.value;
    displayedCount = 9;
    filterAndRenderExperiences();
  });

  // Price filter
  const priceFilter = document.getElementById("priceFilter");
  priceFilter.addEventListener("change", function () {
    currentPrice = this.value;
    displayedCount = 9;
    filterAndRenderExperiences();
  });

  // Sort select
  const sortSelect = document.getElementById("sortSelect");
  sortSelect.addEventListener("change", function () {
    currentSort = this.value;
    filterAndRenderExperiences();
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
    displayedCount += 9;
    renderExperiences();

    if (displayedCount >= currentExperiences.length) {
      this.style.display = "none";
    }
  });
  

  // Modal close
  const closeModal = document.getElementById("closeModal");
  const modal = document.getElementById("experienceModal");

  closeModal.addEventListener("click", closeExperienceModal);
  modal.addEventListener("click", function (e) {
    if (e.target === this) {
      closeExperienceModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeExperienceModal();
    }
  });
}

function handleSearch() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  displayedCount = 9;
  filterAndRenderExperiences(searchTerm);
}

function filterAndRenderExperiences(searchTerm = "") {
  let filtered = [...experiences];

  // Filter by category
  if (currentCategory !== "all") {
    filtered = filtered.filter((exp) => exp.category === currentCategory);
  }

  // Filter by duration
  if (currentDuration !== "all") {
    filtered = filtered.filter(
      (exp) => exp.durationCategory === currentDuration,
    );
  }

  // Filter by price
  if (currentPrice !== "all") {
    filtered = filtered.filter((exp) => exp.priceCategory === currentPrice);
  }

  // Filter by search term
  if (searchTerm) {
    filtered = filtered.filter(
      (exp) =>
        exp.title.toLowerCase().includes(searchTerm) ||
        exp.location.toLowerCase().includes(searchTerm) ||
        exp.description.toLowerCase().includes(searchTerm) ||
        exp.highlights.some((highlight) =>
          highlight.toLowerCase().includes(searchTerm),
        ),
    );
  }

  // Sort experiences
  filtered.sort((a, b) => {
    switch (currentSort) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "duration":
        const durationOrder = { short: 1, half: 2, full: 3, multi: 4 };
        return durationOrder[a.durationCategory] - durationOrder[b.durationCategory];
      case "popular":
      default:
        return b.reviews - a.reviews;
    }
  });

  currentExperiences = filtered;
  renderExperiences();
  updateResultsCount();
}

function renderExperiences() {
  const container = document.getElementById("experiencesContainer");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  container.classList.add("loading");

  setTimeout(() => {
    container.innerHTML = "";

    const experiencesToShow = currentExperiences.slice(0, displayedCount);

    experiencesToShow.forEach((exp, index) => {
      const card = createExperienceCard(exp);
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add("fade-in");
      container.appendChild(card);
    });

    if (displayedCount >= currentExperiences.length) {
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

function createExperienceCard(experience) {
  const card = document.createElement("div");
  card.className = "experience-card";
  card.innerHTML = `
    <div class="experience-card-image">
      <img src="${experience.image}" alt="${experience.title}" class="experience-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
      <div class="image-placeholder" style="display:none;">
        <span>${experience.title}</span>
      </div>
      <div class="card-category-badge ${experience.category}">${getCategoryLabel(experience.category)}</div>
      <div class="card-duration">
        <i data-lucide="clock"></i>
        <span>${experience.duration}</span>
      </div>
      <button class="card-favorite" data-id="${experience.id}">
        <i data-lucide="heart"></i>
      </button>
    </div>
    <div class="experience-card-content">
      <div class="experience-card-header">
        <h3 class="experience-card-title">${experience.title}</h3>
        <div class="experience-card-rating">
          <i data-lucide="star"></i>
          <span>${experience.rating}</span>
          <span>(${experience.reviews})</span>
        </div>
      </div>
      <div class="experience-card-location">
        <i data-lucide="map-pin"></i>
        <span>${experience.location}</span>
      </div>
      <p class="experience-card-description">${experience.description}</p>
      <div class="experience-card-details">
        <div class="experience-detail">
          <i data-lucide="users"></i>
          <span>Max ${experience.maxParticipants}</span>
        </div>
        <div class="experience-detail">
          <i data-lucide="user-check"></i>
          <span>Age ${experience.minAge}+</span>
        </div>
        <div class="experience-detail">
          <i data-lucide="globe"></i>
          <span>${experience.language.split(",")[0]}</span>
        </div>
      </div>
      <div class="experience-card-footer">
        <div class="experience-card-price">
          <span class="currency">$</span>${experience.price}
          <span class="period">/person</span>
        </div>
      </div>
      <div class="experience-includes">
        ${experience.includes
          .slice(0, 3)
          .map((item) => `<span class="include-tag">${item}</span>`)
          .join("")}
      </div>
    </div>
  `;

  card.addEventListener("click", function (e) {
    if (!e.target.closest(".card-favorite")) {
      openExperienceModal(experience);
    }
  });

  const favoriteBtn = card.querySelector(".card-favorite");
  favoriteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleFavorite(this, experience.id);
  });

  return card;
}

function getCategoryLabel(category) {
  const labels = {
    adventure: "Adventure",
    cultural: "Cultural",
    food: "Food & Drink",
    tours: "Tours",
    wellness: "Wellness",
    nature: "Nature",
  };
  return labels[category] || category;
}

function toggleFavorite(button, experienceId) {
  button.classList.toggle("active");
  button.style.transform = "scale(1.2)";
  setTimeout(() => {
    button.style.transform = "scale(1)";
  }, 150);
  console.log(`Toggled favorite for experience ${experienceId}`);
}

function updateView() {
  const container = document.getElementById("experiencesContainer");
  container.classList.remove("list-view");
  if (currentView === "list") {
    container.classList.add("list-view");
  }
}

function updateResultsCount() {
  const countElement = document.getElementById("resultsCount");
  countElement.textContent = currentExperiences.length;
}

function openExperienceModal(experience) {
  const modal = document.getElementById("experienceModal");
  const modalBody = document.getElementById("modalBody");

  modalBody.innerHTML = `
    <div class="modal-experience-image">
      <img src="${experience.image}" alt="${experience.title}" class="modal-img" onerror="this.style.display='none';" />
    </div>
    <h2 class="modal-title">${experience.title}</h2>
    <div class="modal-location">
      <i data-lucide="map-pin"></i>
      <span>${experience.location}</span>
    </div>
    <div class="card-rating" style="margin-bottom: 16px;">
      <i data-lucide="star"></i>
      <span>${experience.rating}</span>
      <span>(${experience.reviews} reviews)</span>
    </div>
    <p class="modal-description">${experience.description}</p>
    
    <div class="modal-experience-details">
      <div class="modal-detail-item">
        <i data-lucide="clock"></i>
        <div class="modal-detail-content">
          <div class="modal-detail-label">Duration</div>
          <div class="modal-detail-value">${experience.duration}</div>
        </div>
      </div>
      <div class="modal-detail-item">
        <i data-lucide="users"></i>
        <div class="modal-detail-content">
          <div class="modal-detail-label">Group Size</div>
          <div class="modal-detail-value">Max ${experience.maxParticipants} people</div>
        </div>
      </div>
      <div class="modal-detail-item">
        <i data-lucide="user-check"></i>
        <div class="modal-detail-content">
          <div class="modal-detail-label">Minimum Age</div>
          <div class="modal-detail-value">${experience.minAge} years</div>
        </div>
      </div>
      <div class="modal-detail-item">
        <i data-lucide="globe"></i>
        <div class="modal-detail-content">
          <div class="modal-detail-label">Languages</div>
          <div class="modal-detail-value">${experience.language}</div>
        </div>
      </div>
    </div>

    <div class="modal-highlights">
      <h4>What's Included</h4>
      <div class="highlights-grid">
        ${experience.highlights
          .map(
            (highlight) => `
          <div class="highlight-item">
            <i data-lucide="check"></i>
            <span class="highlight-text">${highlight}</span>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>

    <div class="modal-actions">
      <button class="btn btn-outline">
        <i data-lucide="heart"></i>
        Save Experience
      </button>
      <button class="btn btn-primary">
        <span class="currency">$</span>${experience.price}/person - Book Now
      </button>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  const saveBtn = modalBody.querySelector(".btn-outline");
  const bookBtn = modalBody.querySelector(".btn-primary");

  saveBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  });

  bookBtn.addEventListener("click", function () {
    alert(
      `Booking ${experience.title} for $${experience.price}/person. This would open the booking flow.`,
    );
  });
}

function closeExperienceModal() {
  const modal = document.getElementById("experienceModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

console.log("Experience page initialized successfully!");