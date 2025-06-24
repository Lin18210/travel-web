// Sample destination data
const destinations = [
  {
    id: 1,
    title: "Alpine Mountain Lodge",
    location: "Swiss Alps, Switzerland",
    category: "mountains",
    price: 245,
    rating: 4.8,
    reviews: 127,
    description:
      "Experience luxury in the heart of the Swiss Alps with breathtaking mountain views, world-class skiing, and cozy alpine charm.",
    features: ["WiFi", "Spa", "Skiing", "Restaurant", "Pool", "Fireplace"],
    image: "assets/home/moutain.jpg",
    badge: "Luxury",
    detailId: "alpine"
  },
  {
    id: 2,
    title: "Beachfront Paradise Villa",
    location: "Maldives",
    category: "beaches",
    price: 890,
    rating: 4.9,
    reviews: 89,
    description:
      "Private overwater villa with crystal clear waters, pristine beaches, and unparalleled luxury in tropical paradise.",
    features: [
      "Private Beach",
      "Snorkeling",
      "Spa",
      "Butler Service",
      "Infinity Pool",
      "Sunset Views",
    ],
    image: "assets/explore/oceanfront1.jpg",
    badge: "Featured",
    detailId: "seaside"
  },
  {
    id: 3,
    title: "Metropolitan Penthouse",
    location: "New York, USA",
    category: "cities",
    price: 350,
    rating: 4.6,
    reviews: 203,
    description:
      "Sophisticated penthouse in the heart of Manhattan with panoramic city views and luxury amenities.",
    features: ["City Views", "Gym", "Concierge", "WiFi", "Kitchen", "Terrace"],
    image: "assets/home/urban.jpg",
    badge: "Popular",
    detailId: "metropolitan"
  },
  {
    id: 4,
    title: "Tuscan Countryside Estate",
    location: "Tuscany, Italy",
    category: "countryside",
    price: 180,
    rating: 4.7,
    reviews: 156,
    description:
      "Charming villa surrounded by rolling hills, vineyards, and olive groves in the heart of Tuscany.",
    features: [
      "Wine Tasting",
      "Cooking Classes",
      "Pool",
      "Garden",
      "WiFi",
      "Fireplace",
    ],
    image: "assets/explore/tuscan.jpg",
    badge: "Authentic",
    detailId: "tuscan"
  },
  {
    id: 5,
    title: "Desert Oasis Retreat",
    location: "Sahara Desert, Morocco",
    category: "countryside",
    price: 220,
    rating: 4.5,
    reviews: 74,
    description:
      "Unique desert camp experience with luxury tents, camel trekking, and unforgettable stargazing.",
    features: [
      "Stargazing",
      "Camel Rides",
      "Traditional Cuisine",
      "Campfire",
      "Guided Tours",
      "Spa",
    ],
    image: "assets/home/desert.jpg",
    badge: "Adventure",
    detailId: "desert"
  },
  {
    id: 6,
    title: "Tropical Rainforest Lodge",
    location: "Costa Rica",
    category: "countryside",
    price: 165,
    rating: 4.8,
    reviews: 91,
    description:
      "Eco-friendly lodge immersed in lush rainforest with incredible wildlife and sustainable luxury.",
    features: [
      "Wildlife Tours",
      "Zip Lining",
      "Spa",
      "Organic Food",
      "WiFi",
      "Hiking Trails",
    ],
    image: "assets/explore/whispering1.jpg",
    badge: "Eco-Friendly",
    detailId: "rainforest"
  },
  {
    id: 7,
    title: "Cliffside Ocean Resort",
    location: "Santorini, Greece",
    category: "beaches",
    price: 420,
    rating: 4.9,
    reviews: 145,
    description:
      "Dramatic cliffside location with infinity pools, white-washed architecture, and stunning sunset views.",
    features: [
      "Infinity Pool",
      "Sunset Views",
      "Spa",
      "Fine Dining",
      "WiFi",
      "Private Terrace",
    ],
    image: "assets/explore/cliffside.jpg",
    badge: "Romantic",
    detailId: "santorini"
  },
  {
    id: 8,
    title: "Urban Boutique Hotel",
    location: "Tokyo, Japan",
    category: "cities",
    price: 280,
    rating: 4.6,
    reviews: 188,
    description:
      "Modern boutique hotel blending traditional Japanese design with contemporary luxury in bustling Tokyo.",
    features: [
      "Spa",
      "Restaurant",
      "WiFi",
      "Concierge",
      "Tea Ceremony",
      "Garden",
    ],
    image: "assets/home/urban2.jpg",
    badge: "Cultural",
    detailId: "tokyo"
  },
  {
    id: 9,
    title: "Highland Castle Experience",
    location: "Scottish Highlands, UK",
    category: "mountains",
    price: 195,
    rating: 4.7,
    reviews: 112,
    description:
      "Historic castle offering royal treatment with medieval charm, highland views, and luxury accommodations.",
    features: [
      "Historic Tours",
      "Fine Dining",
      "Spa",
      "WiFi",
      "Library",
      "Highland Views",
    ],
    image: "assets/explore/alphine2.webp",
    badge: "Historic",
    detailId: "castle"
  },
  {
    id: 10,
    title: "Private Island Escape",
    location: "Seychelles",
    category: "luxury",
    price: 1200,
    rating: 5.0,
    reviews: 32,
    description:
      "Exclusive private island with pristine beaches, crystal waters, and unmatched privacy and luxury.",
    features: [
      "Private Island",
      "Butler Service",
      "Yacht",
      "Spa",
      "Fine Dining",
      "Helicopter Access",
    ],
    image: "assets/explore/seaside2.avif",
    badge: "Exclusive",
    detailId: "private-island"
  },
  {
    id: 11,
    title: "Ski Chalet Deluxe",
    location: "Aspen, Colorado",
    category: "mountains",
    price: 485,
    rating: 4.8,
    reviews: 167,
    description:
      "Luxury ski chalet with direct slope access, hot tub, and panoramic mountain views in world-famous Aspen.",
    features: [
      "Ski-in/Ski-out",
      "Hot Tub",
      "Fireplace",
      "Mountain Views",
      "Chef Service",
      "Wine Cellar",
    ],
    image: "assets/home/ski.webp",
    badge: "Ski Resort",
    detailId: "aspen"
  },
  {
    id: 12,
    title: "Jungle Canopy Lodge",
    location: "Amazon, Brazil",
    category: "countryside",
    price: 145,
    rating: 4.6,
    reviews: 78,
    description:
      "Sustainable lodge high in the jungle canopy with incredible biodiversity and authentic Amazon experience.",
    features: [
      "Wildlife Viewing",
      "Guided Tours",
      "Sustainable",
      "Research Center",
      "Canopy Walk",
      "Local Cuisine",
    ],
    includes: ["Lodge", "Program", "Theater"],
    image: "assets/home/forest.jpeg",
    badge: "Conservation",
    detailId: "amazon"
  },
  {
    id: 13,
    title: "Whispering Pines Forest Retreat",
    location: "Pacific Northwest, USA",
    category: "countryside",
    price: 189,
    rating: 4.8,
    reviews: 156,
    description:
      "Immerse yourself in ancient forests with towering pines, misty trails, and the peaceful sounds of nature all around.",
    features: [
      "Forest Trails",
      "Wildlife Watching",
      "Fireplace",
      "Nature Sounds",
      "Organic Meals",
      "Yoga Deck",
    ],
    includes: ["Trails", "Guide", "Meals", "Activities"],
    image: "assets/home/forest.jpeg",
    badge: "Forest Haven",
    detailId: "pacific-northwest"
  },
  {
    id: 14,
    title: "Oceanfront Cottage Collection",
    location: "Maine Coast, USA",
    category: "beaches",
    price: 235,
    rating: 4.7,
    reviews: 298,
    description:
      "Charming seaside cottages with weathered shingles, panoramic ocean views, and the constant melody of waves.",
    features: [
      "Ocean Views",
      "Private Beach",
      "Fireplace",
      "Deck",
      "Kayaks",
      "Lobster Dinner",
    ],
    includes: ["Beach", "Kayaks", "Meals", "Activities"],
    image: "assets/home/coast.jpeg",
    badge: "Coastal Charm",
    detailId: "maine-coast"
  },
  {
    id: 15,
    title: "Rolling Hills Farm Stay",
    location: "Cotswolds, England",
    category: "countryside",
    price: 165,
    rating: 4.9,
    reviews: 203,
    description:
      "Experience authentic countryside life with rolling green hills, blooming meadows, and rustic stone cottages.",
    features: [
      "Farm Tours",
      "Horseback Riding",
      "Organic Garden",
      "Stone Cottage",
      "Country Walks",
      "Farm Breakfast",
    ],
    includes: ["Tours", "Meals", "Activities", "Garden"],
    image: "assets/home/countryside.jpg",
    badge: "Countryside Bliss",
    detailId: "cotswolds"
  },
  {
    id: 16,
    title: "Paradise Island Resort",
    location: "Bora Bora, French Polynesia",
    category: "beaches",
    price: 485,
    rating: 4.9,
    reviews: 127,
    description:
      "Overwater bungalows surrounded by swaying palms, crystal-clear lagoons, and pristine white sand beaches.",
    features: [
      "Overwater Bungalow",
      "Private Lagoon",
      "Snorkeling",
      "Spa",
      "Sunset Dinners",
      "Water Sports",
    ],
    includes: ["Bungalow", "Meals", "Activities", "Spa"],
    image: "assets/home/tropical.jpeg",
    badge: "Tropical Tranquility",
    detailId: "bora-bora"
  },
];

// Global variables
let currentDestinations = [...destinations];
let currentCategory = "all";
let currentSort = "popular";
let currentView = "grid";
let displayedCount = 8;

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Set up event listeners
  setupEventListeners();

  // Check for destination filter from homepage
  checkDestinationFilter();

  // Initial render
  filterAndRenderDestinations();
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
      // Update active state
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Update current category
      currentCategory = this.dataset.category;
      displayedCount = 8; // Reset displayed count
      filterAndRenderDestinations();
    });
  });

  // Sort select
  const sortSelect = document.getElementById("sortSelect");
  sortSelect.addEventListener("change", function () {
    currentSort = this.value;
    filterAndRenderDestinations();
  });

  // View toggles
  const viewBtns = document.querySelectorAll(".view-btn");
  viewBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Update active state
      viewBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Update view
      currentView = this.dataset.view;
      updateView();
    });
  });

  // Load more button
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  loadMoreBtn.addEventListener("click", function () {
    displayedCount += 8;
    renderDestinations();

    // Hide button if all destinations are shown
    if (displayedCount >= currentDestinations.length) {
      this.style.display = "none";
    }
  });

  // Modal close
  const closeModal = document.getElementById("closeModal");
  const modal = document.getElementById("destinationModal");

  closeModal.addEventListener("click", closeDestinationModal);
  modal.addEventListener("click", function (e) {
    if (e.target === this) {
      closeDestinationModal();
    }
  });

  // Escape key to close modal
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeDestinationModal();
    }
  });
}

function handleSearch() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  displayedCount = 8; // Reset displayed count
  filterAndRenderDestinations(searchTerm);
}

function filterAndRenderDestinations(searchTerm = "") {
  // Filter by category
  let filtered =
    currentCategory === "all"
      ? [...destinations]
      : destinations.filter((dest) => dest.category === currentCategory);

  // Filter by search term
  if (searchTerm) {
    filtered = filtered.filter(
      (dest) =>
        dest.title.toLowerCase().includes(searchTerm) ||
        dest.location.toLowerCase().includes(searchTerm) ||
        dest.description.toLowerCase().includes(searchTerm),
    );
  }

  // Sort destinations
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

  currentDestinations = filtered;
  renderDestinations();
  updateResultsCount();
}

function renderDestinations() {
  const container = document.getElementById("destinationsContainer");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  // Show loading state
  container.classList.add("loading");

  setTimeout(() => {
    // Clear container
    container.innerHTML = "";

    // Get destinations to display
    const destinationsToShow = currentDestinations.slice(0, displayedCount);

    // Render each destination
    destinationsToShow.forEach((dest, index) => {
      const card = createDestinationCard(dest);
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add("fade-in");
      container.appendChild(card);
    });

    // Show/hide load more button
    if (displayedCount >= currentDestinations.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }

    // Remove loading state
    container.classList.remove("loading");

    // Re-initialize icons
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }, 300);
}

function createDestinationCard(destination) {
  const card = document.createElement("div");
  card.className = "explore-destination-card";
  card.innerHTML = `
    <div class="explore-card-image">
      <img src="${destination.image}" alt="${destination.title}" class="destination-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="image-placeholder" style="display: none;">
        <span>${destination.title}</span>
      </div>
    </div>
    <div class="card-badge">${destination.badge}</div>
    <button class="card-favorite" data-id="${destination.id}">
      <i data-lucide="heart"></i>
    </button>
    <div class="explore-card-content">
      <div class="card-header">
        <h3 class="card-title">${destination.title}</h3>
        <div class="card-rating">
          <i data-lucide="star"></i>
          <span>${destination.rating}</span>
          <span>(${destination.reviews})</span>
        </div>
      </div>
      <div class="card-location">
        <i data-lucide="map-pin"></i>
        <span>${destination.location}</span>
      </div>
      <p class="card-description">${destination.description}</p>
      <div class="card-footer">
        <div class="card-price">
          <span class="currency">$</span>${destination.price}
          <span class="period">/night</span>
        </div>
      </div>
      <div class="card-features">
        ${destination.features
          .slice(0, 3)
          .map((feature) => `<span class="feature-tag">${feature}</span>`)
          .join("")}
      </div>
      <div class="card-actions">
        <button class="btn btn-outline card-details-btn">
          View Details
        </button>
        <a href="booking.html" class="btn btn-primary card-book-btn">
          Book Now
        </a>
      </div>
    </div>
  `;

  // Add click handler for card (only for non-interactive areas)
  card.addEventListener("click", function (e) {
    if (
      !e.target.closest(".card-favorite") &&
      !e.target.closest(".card-details-btn") &&
      !e.target.closest(".card-book-btn")
    ) {
      // Navigate to destination detail page
      if (destination.detailId) {
        window.location.href = `destination-detail.html?destination=${destination.detailId}`;
      }
    }
  });

  // Add favorite button handler
  const favoriteBtn = card.querySelector(".card-favorite");
  favoriteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleFavorite(this, destination.id);
  });

  // Add details button handler
  const detailsBtn = card.querySelector(".card-details-btn");
  detailsBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    // Navigate to destination detail page
    if (destination.detailId) {
      window.location.href = `destination-detail.html?destination=${destination.detailId}`;
    }
  });

  // Add booking data to the booking link
  const bookBtn = card.querySelector(".card-book-btn");
  bookBtn.addEventListener("click", function (e) {
    // Store booking data in localStorage for the booking page
    const bookingData = {
      type: "destination",
      id: destination.id,
      title: destination.title,
      location: destination.location,
      price: destination.price,
      rating: destination.rating,
      reviews: destination.reviews,
      image: destination.image,
      features: destination.features,
    };
    localStorage.setItem("pendingBooking", JSON.stringify(bookingData));
  });

  return card;
}

function toggleFavorite(button, destinationId) {
  button.classList.toggle("active");

  // Animate the button
  button.style.transform = "scale(1.2)";
  setTimeout(() => {
    button.style.transform = "scale(1)";
  }, 150);

  // In a real app, you would save this to localStorage or send to server
  console.log(`Toggled favorite for destination ${destinationId}`);
}

function updateView() {
  const container = document.getElementById("destinationsContainer");

  // Remove all view classes
  container.classList.remove("list-view", "map-view");

  // Add current view class
  if (currentView === "list") {
    container.classList.add("list-view");
  } else if (currentView === "map") {
    container.classList.add("map-view");
    // In a real app, you would initialize a map here
    console.log("Map view selected - would show interactive map");
  }
}

function updateResultsCount() {
  const countElement = document.getElementById("resultsCount");
  countElement.textContent = currentDestinations.length;
}

function openDestinationModal(destination) {
  const modal = document.getElementById("destinationModal");
  const modalBody = document.getElementById("modalBody");

  modalBody.innerHTML = `
    <div class="modal-image">
      <img src="${destination.image}" alt="${destination.title}" class="modal-img" onerror="this.style.display='none';" />
    </div>
    <h2 class="modal-title">${destination.title}</h2>
    <div class="modal-location">
      <i data-lucide="map-pin"></i>
      <span>${destination.location}</span>
    </div>
    <div class="card-rating" style="margin-bottom: 16px;">
      <i data-lucide="star"></i>
      <span>${destination.rating}</span>
      <span>(${destination.reviews} reviews)</span>
    </div>
    <p class="modal-description">${destination.description}</p>
    <div class="modal-features">
      ${destination.features
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
        Save
      </button>
      <button class="btn btn-primary">
        <span class="currency">$</span>${destination.price}/night - Book Now
      </button>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Re-initialize icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Add event listeners for modal buttons
  const saveBtn = modalBody.querySelector(".btn-outline");
  const bookBtn = modalBody.querySelector(".btn-primary");

  saveBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    const icon = this.querySelector("i");
    icon.setAttribute(
      "data-lucide",
      this.classList.contains("active") ? "heart" : "heart",
    );
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  });

  bookBtn.addEventListener("click", function () {
    alert(
      `Booking ${destination.title} for $${destination.price}/night. This would open the booking flow.`,
    );
  });
}

function closeDestinationModal() {
  const modal = document.getElementById("destinationModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// Intersection Observer for infinite scroll (alternative to Load More)
function setupInfiniteScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          displayedCount < currentDestinations.length
        ) {
          displayedCount += 4;
          renderDestinations();
        }
      });
    },
    {
      rootMargin: "100px",
    },
  );

  // Observe the load more button
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    observer.observe(loadMoreBtn);
  }
}

// Initialize infinite scroll (uncomment to use instead of Load More button)
// setupInfiniteScroll();

function checkDestinationFilter() {
  const destinationFilter = localStorage.getItem("destinationFilter");

  if (destinationFilter) {
    // Map destination types to search terms
    const destinationMap = {
      alpine: "alpine mountain snow",
      seaside: "beach ocean seaside",
      metropolitan: "city urban metropolitan",
      desert: "desert sand dune",
      forest: "forest pine tree woodland",
      coastal: "coastal cottage ocean",
      countryside: "countryside farm hills",
      tropical: "tropical island paradise",
    };

    // Set search term and filter
    const searchTerm = destinationMap[destinationFilter] || destinationFilter;
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
      searchInput.value = searchTerm;
      // Trigger search
      handleSearch();

      // Visual feedback
      searchInput.style.background = "#f0f9ff";
      searchInput.style.borderColor = "#3b82f6";

      // Show notification
      showFilterNotification(destinationFilter);
    }

    // Clear the filter from localStorage
    localStorage.removeItem("destinationFilter");
  }
}

function showFilterNotification(destinationType) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = "filter-notification";
  notification.innerHTML = `
    <i data-lucide="filter"></i>
    <span>Showing ${destinationType} destinations</span>
    <button onclick="clearFilter()" class="clear-filter">
      <i data-lucide="x"></i>
    </button>
  `;

  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #3b82f6;
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideInRight 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Re-initialize icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

function clearFilter() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.value = "";
    searchInput.style.background = "";
    searchInput.style.borderColor = "";
    handleSearch();
  }

  // Remove notification
  const notification = document.querySelector(".filter-notification");
  if (notification) {
    notification.parentNode.removeChild(notification);
  }
}

console.log("Explore page initialized successfully!");
