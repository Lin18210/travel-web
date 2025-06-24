// Sample attractions data
const attractions = [
  {
    id: 1,
    title: "Statue of Liberty & Ellis Island",
    location: "New York, USA",
    category: "landmarks",
    price: 29,
    rating: 4.7,
    reviews: 1234,
    duration: "4 hours",
    groupSize: "Up to 30",
    skipLine: true,
    audioGuide: true,
    description:
      "Visit America's most iconic symbols of freedom and immigration. Skip the lines and explore both Liberty Island and Ellis Island with expert guides.",
    features: [
      "Skip-the-line access",
      "Ferry transportation",
      "Audio guide included",
      "Ellis Island Museum",
      "Crown access available",
      "Professional guide",
    ],
    includes: ["Ferry", "Guide", "Audio", "Museum"],
    image: "assets/attractive/statue.jpeg",
  },
  {
    id: 2,
    title: "Louvre Museum Masterpieces Tour",
    location: "Paris, France",
    category: "museums",
    price: 65,
    rating: 4.8,
    reviews: 987,
    duration: "3 hours",
    groupSize: "Max 12",
    skipLine: true,
    audioGuide: false,
    description:
      "Discover the world's most famous artworks including the Mona Lisa and Venus de Milo with an expert art historian guide.",
    features: [
      "Priority entrance",
      "Expert art guide",
      "Small group experience",
      "Mona Lisa viewing",
      "Venus de Milo",
      "Egyptian antiquities",
    ],
    includes: ["Entry", "Guide", "Headsets", "Map"],
    image: "assets/attractive/louvre.jpg",
  },
  {
    id: 3,
    title: "Colosseum Underground Tour",
    location: "Rome, Italy",
    category: "historical",
    price: 85,
    rating: 4.9,
    reviews: 567,
    duration: "3.5 hours",
    groupSize: "Max 15",
    skipLine: true,
    audioGuide: true,
    description:
      "Explore the underground chambers and arena floor of the ancient Colosseum, areas normally off-limits to general visitors.",
    features: [
      "Underground access",
      "Arena floor experience",
      "Roman Forum included",
      "Palatine Hill access",
      "Expert historian guide",
      "VIP entrance",
    ],
    includes: ["Entry", "Guide", "Underground", "Forum"],
    image: "assets/attractive/colosseum.webp",
  },
  {
    id: 4,
    title: "Big Bus London Hop-On Hop-Off",
    location: "London, UK",
    category: "tours",
    price: 42,
    rating: 4.5,
    reviews: 2156,
    duration: "Full day",
    groupSize: "Unlimited",
    skipLine: false,
    audioGuide: true,
    description:
      "Explore London at your own pace with unlimited access to our open-top buses covering all major attractions and landmarks.",
    features: [
      "24-hour validity",
      "Multiple routes",
      "Audio commentary",
      "Walking tours included",
      "River cruise option",
      "Free WiFi on buses",
    ],
    includes: ["Bus Pass", "Audio", "Map", "Tours"],
    image: "assets/attractive/big-bus.webp",
  },
  {
    id: 5,
    title: "Grand Canyon South Rim Tour",
    location: "Arizona, USA",
    category: "nature",
    price: 95,
    rating: 4.8,
    reviews: 432,
    duration: "Full day",
    groupSize: "Max 25",
    skipLine: false,
    audioGuide: false,
    description:
      "Experience the breathtaking views of one of the world's natural wonders with stops at the most scenic viewpoints along the South Rim.",
    features: [
      "Multiple viewpoints",
      "IMAX theater visit",
      "Visitor center access",
      "Photography stops",
      "Geological insights",
      "Comfortable transport",
    ],
    includes: ["Transport", "Guide", "Entry", "IMAX"],
    image: "assets/attractive/grand.jpg",
  },
  {
    id: 6,
    title: "Broadway Show: The Lion King",
    location: "New York, USA",
    category: "entertainment",
    price: 125,
    rating: 4.9,
    reviews: 876,
    duration: "2.5 hours",
    groupSize: "Varies",
    skipLine: false,
    audioGuide: false,
    description:
      "Experience Disney's award-winning musical with stunning costumes, innovative puppetry, and unforgettable music in the heart of Broadway.",
    features: [
      "Premium seating",
      "Award-winning musical",
      "Stunning puppetry",
      "Live orchestra",
      "Disney magic",
      "Theater district location",
    ],
    includes: ["Ticket", "Program", "Theater"],
    image: "assets/attractive/broadway.jpg",
  },
  {
    id: 7,
    title: "Machu Picchu Guided Exploration",
    location: "Cusco, Peru",
    category: "historical",
    price: 75,
    rating: 4.9,
    reviews: 345,
    duration: "6 hours",
    groupSize: "Max 16",
    skipLine: true,
    audioGuide: false,
    description:
      "Discover the ancient Incan citadel with expert guides who bring the fascinating history and mysteries of Machu Picchu to life.",
    features: [
      "Expert Inca history guide",
      "Skip entrance lines",
      "Sacred sites access",
      "Photography assistance",
      "Cultural insights",
      "Small group experience",
    ],
    includes: ["Entry", "Guide", "Transport", "Lunch"],
    image: "assets/attractive/machu.jpg",
  },
  {
    id: 8,
    title: "Sydney Opera House Inside Tour",
    location: "Sydney, Australia",
    category: "landmarks",
    price: 48,
    rating: 4.6,
    reviews: 678,
    duration: "1 hour",
    groupSize: "Max 20",
    skipLine: false,
    audioGuide: true,
    description:
      "Go behind the scenes of the world's most recognizable building and learn about its fascinating architecture and cultural significance.",
    features: [
      "Behind-the-scenes access",
      "Concert Hall visit",
      "Architecture insights",
      "Cultural history",
      "Photo opportunities",
      "Expert guide",
    ],
    includes: ["Tour", "Audio", "Access", "Photos"],
    image: "assets/attractive/sydney.avif",
  },
  {
    id: 9,
    title: "Sagrada Familia Priority Access",
    location: "Barcelona, Spain",
    category: "landmarks",
    price: 35,
    rating: 4.7,
    reviews: 1567,
    duration: "1.5 hours",
    groupSize: "Varies",
    skipLine: true,
    audioGuide: true,
    description:
      "Skip the long lines and explore Gaudí's masterpiece with audio guide commentary about the unique architecture and ongoing construction.",
    features: [
      "Priority entrance",
      "Audio guide included",
      "Gaudí architecture",
      "Nativity Facade",
      "Passion Facade",
      "Museum access",
    ],
    includes: ["Entry", "Audio", "Museum", "Tower"],
    image: "assets/attractive/sagrada.webp",
  },
  {
    id: 10,
    title: "Tower of London Crown Jewels",
    location: "London, UK",
    category: "historical",
    price: 33,
    rating: 4.5,
    reviews: 2345,
    duration: "2 hours",
    groupSize: "Varies",
    skipLine: false,
    audioGuide: true,
    description:
      "Explore 1000 years of royal history and see the magnificent Crown Jewels in the Tower of London with Yeoman Warder guides.",
    features: [
      "Crown Jewels viewing",
      "Yeoman Warder guide",
      "Medieval fortress",
      "Royal history",
      "Ravens and legends",
      "White Tower access",
    ],
    includes: ["Entry", "Guide", "Audio", "Jewels"],
    image: "assets/attractive/tower.jpg",
  },
  {
    id: 11,
    title: "Metropolitan Museum Highlights",
    location: "New York, USA",
    category: "museums",
    price: 28,
    rating: 4.6,
    reviews: 1876,
    duration: "2.5 hours",
    groupSize: "Max 18",
    skipLine: false,
    audioGuide: false,
    description:
      "Discover the world's greatest art collection with an expert guide showcasing masterpieces from ancient Egypt to modern art.",
    features: [
      "Expert art guide",
      "Ancient Egyptian art",
      "European paintings",
      "American wing",
      "Arms and armor",
      "Rooftop garden access",
    ],
    includes: ["Entry", "Guide", "Map", "Garden"],
    image: "assets/attractive/metropolitan.jpg",
  },
  {
    id: 12,
    title: "Golden Gate Bridge & Alcatraz",
    location: "San Francisco, USA",
    category: "landmarks",
    price: 89,
    rating: 4.7,
    reviews: 987,
    duration: "6 hours",
    groupSize: "Max 30",
    skipLine: true,
    audioGuide: true,
    description:
      "Combine San Francisco's most iconic attractions: walk the Golden Gate Bridge and explore the infamous Alcatraz federal prison.",
    features: [
      "Golden Gate Bridge walk",
      "Alcatraz Island ferry",
      "Prison audio tour",
      "San Francisco Bay views",
      "Fisherman's Wharf",
      "Photo opportunities",
    ],
    includes: ["Ferry", "Audio", "Transport", "Guide"],
    image: "assets/attractive/golden.jpg",
  },
];

// Global variables
let currentAttractions = [...attractions];
let currentCategory = "all";
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
  filterAndRenderAttractions();
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
      filterAndRenderAttractions();
    });
  });

  // Sort select
  const sortSelect = document.getElementById("sortSelect");
  sortSelect.addEventListener("change", function () {
    currentSort = this.value;
    filterAndRenderAttractions();
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
    renderAttractions();

    if (displayedCount >= currentAttractions.length) {
      this.style.display = "none";
    }
  });

  // Modal close
  const closeModal = document.getElementById("closeModal");
  const modal = document.getElementById("attractionModal");

  closeModal.addEventListener("click", closeAttractionModal);
  modal.addEventListener("click", function (e) {
    if (e.target === this) {
      closeAttractionModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAttractionModal();
    }
  });
}

function handleSearch() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  displayedCount = 9;
  filterAndRenderAttractions(searchTerm);
}

function filterAndRenderAttractions(searchTerm = "") {
  let filtered = [...attractions];

  // Filter by category
  if (currentCategory !== "all") {
    filtered = filtered.filter((attr) => attr.category === currentCategory);
  }

  // Filter by search term
  if (searchTerm) {
    filtered = filtered.filter(
      (attr) =>
        attr.title.toLowerCase().includes(searchTerm) ||
        attr.location.toLowerCase().includes(searchTerm) ||
        attr.description.toLowerCase().includes(searchTerm) ||
        attr.features.some((feature) =>
          feature.toLowerCase().includes(searchTerm),
        ),
    );
  }

  // Sort attractions
  filtered.sort((a, b) => {
    switch (currentSort) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      case "popular":
      default:
        return b.reviews - a.reviews;
    }
  });

  currentAttractions = filtered;
  renderAttractions();
  updateResultsCount();
}

function renderAttractions() {
  const container = document.getElementById("attractionsContainer");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  container.classList.add("loading");

  setTimeout(() => {
    container.innerHTML = "";

    const attractionsToShow = currentAttractions.slice(0, displayedCount);

    attractionsToShow.forEach((attr, index) => {
      const card = createAttractionCard(attr);
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add("fade-in");
      container.appendChild(card);
    });

    if (displayedCount >= currentAttractions.length) {
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

function createAttractionCard(attraction) {
  const card = document.createElement("div");
  card.className = "attraction-card";

  const priceDisplay = attraction.price === 0 
    ? '<span class="free">Free</span>' 
    : `<span class="currency">$</span>${attraction.price}<span class="period">/person</span>`;

  card.innerHTML = `
    <div class="attraction-card-image">
      <img src="${attraction.image}" alt="${attraction.title}" class="attraction-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
      <div class="image-placeholder" style="display:none;">
        <span>${attraction.title}</span>
      </div>
      <div class="card-category-badge">${getCategoryLabel(attraction.category)}</div>
      <div class="card-rating">
        <i data-lucide="star"></i>
        <span>${attraction.rating}</span>
      </div>
      <button class="card-favorite" data-id="${attraction.id}">
        <i data-lucide="heart"></i>
      </button>
    </div>
    <div class="attraction-card-content">
      <div class="attraction-card-header">
        <h3 class="attraction-card-title">${attraction.title}</h3>
      </div>
      <div class="attraction-card-location">
        <i data-lucide="map-pin"></i>
        <span>${attraction.location}</span>
      </div>
      <p class="attraction-card-description">${attraction.description}</p>
      <div class="attraction-card-details">
        <div class="attraction-detail">
          <i data-lucide="clock"></i>
          <span>${attraction.duration}</span>
        </div>
        <div class="attraction-detail">
          <i data-lucide="users"></i>
          <span>${attraction.groupSize}</span>
        </div>
        ${attraction.skipLine ? '<div class="attraction-detail"><i data-lucide="fast-forward"></i><span>Skip line</span></div>' : ''}
      </div>
      <div class="attraction-card-footer">
        <div class="attraction-card-price ${attraction.price === 0 ? 'free' : ''}">
          ${priceDisplay}
        </div>
      </div>
      <div class="attraction-includes">
        ${attraction.includes
          .slice(0, 3)
          .map((item) => `<span class="include-tag">${item}</span>`)
          .join("")}
      </div>
    </div>
  `;

  card.addEventListener("click", function (e) {
    if (!e.target.closest(".card-favorite")) {
      openAttractionModal(attraction);
    }
  });

  const favoriteBtn = card.querySelector(".card-favorite");
  favoriteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleFavorite(this, attraction.id);
  });

  return card;
}

function getCategoryLabel(category) {
  const labels = {
    landmarks: "Landmark",
    museums: "Museum",
    tours: "City Tour",
    historical: "Historical",
    nature: "Nature",
    entertainment: "Entertainment",
  };
  return labels[category] || category;
}

function toggleFavorite(button, attractionId) {
  button.classList.toggle("active");
  button.style.transform = "scale(1.2)";
  setTimeout(() => {
    button.style.transform = "scale(1)";
  }, 150);
  console.log(`Toggled favorite for attraction ${attractionId}`);
}

function updateView() {
  const container = document.getElementById("attractionsContainer");
  container.classList.remove("list-view");
  if (currentView === "list") {
    container.classList.add("list-view");
  }
}

function updateResultsCount() {
  const countElement = document.getElementById("resultsCount");
  countElement.textContent = currentAttractions.length;
}

function openAttractionModal(attraction) {
  const modal = document.getElementById("attractionModal");
  const modalBody = document.getElementById("modalBody");

  modalBody.innerHTML = `
    <div class="modal-image">
      <img src="${attraction.image}" alt="${attraction.title}" class="modal-img" onerror="this.style.display='none';" />
    </div>
    <h2 class="modal-title">${attraction.title}</h2>
    <div class="modal-location">
      <i data-lucide="map-pin"></i>
      <span>${attraction.location}</span>
    </div>
    <div class="card-rating" style="margin-bottom: 16px;">
      <i data-lucide="star"></i>
      <span>${attraction.rating}</span>
      <span>(${attraction.reviews} reviews)</span>
    </div>
    <p class="modal-description">${attraction.description}</p>
    
    <div class="modal-features">
      ${attraction.features
        .map(
          (feature) => `
        <div class="modal-feature">
          <i data-lucide="check"></i>
          <span>${feature}</span>
        </div>
      `,
        )
        .join("")}
    </div>

    <div class="modal-actions">
      <button class="btn btn-outline">
        <i data-lucide="heart"></i>
        Save Attraction
      </button>
      <button class="btn btn-primary">
        ${attraction.price === 0 ? 'Reserve Spot' : `$${attraction.price}/person - Book Now`}
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
    const actionText = attraction.price === 0 ? 'reserving' : `booking ${attraction.title} for $${attraction.price}/person`;
    alert(`${actionText}. This would open the booking flow.`);
  });
}

function closeAttractionModal() {
  const modal = document.getElementById("attractionModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

console.log("Attractions page initialized successfully!");