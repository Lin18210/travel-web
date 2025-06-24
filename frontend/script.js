// Initialize Lucide icons
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Navigation functionality
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      navButtons.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");
    });
  });

  // Search form functionality
  const searchForm = document.querySelector(".search-form");
  const searchBtn = document.querySelector(".search-btn");

  if (searchBtn) {
    searchBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Get form values
      const location = document.querySelector(
        '.search-field input[placeholder="Location"]',
      ).value;
      const date = document.querySelector(
        '.search-field input[type="date"]',
      ).value;
      const guests = document.querySelector(
        '.search-field input[placeholder="Guests"]',
      ).value;

      // Simple validation
      if (!location.trim()) {
        alert("Please enter a location");
        return;
      }

      if (!date) {
        alert("Please select a date");
        return;
      }

      // Simulate search
      console.log("Searching for:", { location, date, guests });
      alert(
        `Searching for accommodations in ${location} for ${date}${guests ? ` for ${guests} guests` : ""}`,
      );
    });
  }

  // Featured Destination Image Slider
  const sliderImages = [
    {
      src: "assets/home/moutain3.jpg",
      alt: "Breathtaking mountain lake reflection at sunset",
      title: "Mountain Paradise",
      subtitle: "Experience serenity in alpine beauty",
    },
    {
      src: "assets/home/moutain4.jpg",
      alt: "Luxury alpine lodge with snow-capped mountain views",
      title: "Alpine Dreamscapes",
      subtitle: "Wake up to snow-capped peaks and crisp mountain air",
    },
    {
      src: "assets/home/seaside.jpg",
      alt: "Tropical overwater villa with crystal clear waters",
      title: "Seaside Serenity",
      subtitle: "Pristine beaches and turquoise waters await",
    },
    {
      src: "assets/home/urban.jpg",
      alt: "Modern penthouse with panoramic city skyline views",
      title: "Metropolitan Magic",
      subtitle: "Experience the pulse of the world's greatest cities",
    },
    {
      src: "assets/home/desert.jpg",
      alt: "Luxury desert camp under infinite starlit sky",
      title: "Desert Oasis",
      subtitle: "Find tranquility under vast desert skies",
    },
  ];

  let currentSlideIndex = 0;
  let slideInterval;
  let isTransitioning = false;

  const sliderContainer = document.querySelector(".carousel-image");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");

  // Create slider structure
  function initializeSlider() {
    if (!sliderContainer) return;

    sliderContainer.innerHTML = `
      <div class="slider-track">
        ${sliderImages
          .map(
            (image, index) => `
          <div class="slide ${index === 0 ? "active" : ""}" data-slide="${index}">
            <img
              src="${image.src}"
              alt="${image.alt}"
              class="slide-image"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            />
            <div class="image-placeholder" style="display: none;">
              <span>${image.title}</span>
            </div>
            <div class="slide-overlay">
              <div class="slide-content">
                <h3 class="slide-title">${image.title}</h3>
                <p class="slide-subtitle">${image.subtitle}</p>
              </div>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
      <div class="slider-dots">
        ${sliderImages
          .map(
            (_, index) => `
          <button class="dot ${index === 0 ? "active" : ""}" data-slide="${index}"></button>
        `,
          )
          .join("")}
      </div>
    `;

    // Re-add navigation buttons
    const navigation = `
      <button class="carousel-btn carousel-prev">
        <i data-lucide="chevron-left"></i>
      </button>
      <button class="carousel-btn carousel-next">
        <i data-lucide="chevron-right"></i>
      </button>
    `;
    sliderContainer.insertAdjacentHTML("beforeend", navigation);

    // Re-initialize Lucide icons
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }

    setupSliderEvents();
  }

  function setupSliderEvents() {
    // Navigation buttons
    const newPrevBtn = sliderContainer.querySelector(".carousel-prev");
    const newNextBtn = sliderContainer.querySelector(".carousel-next");

    if (newPrevBtn) {
      newPrevBtn.addEventListener("click", () => {
        if (!isTransitioning) {
          previousSlide();
        }
      });
    }

    if (newNextBtn) {
      newNextBtn.addEventListener("click", () => {
        if (!isTransitioning) {
          nextSlide();
        }
      });
    }

    // Dot navigation
    const dots = sliderContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (!isTransitioning && index !== currentSlideIndex) {
          goToSlide(index);
        }
      });
    });

    // Pause on hover
    sliderContainer.addEventListener("mouseenter", pauseSlider);
    sliderContainer.addEventListener("mouseleave", resumeSlider);
  }

  function goToSlide(index) {
    if (isTransitioning) return;

    isTransitioning = true;
    const slides = sliderContainer.querySelectorAll(".slide");
    const dots = sliderContainer.querySelectorAll(".dot");

    // Remove active class from current slide
    slides[currentSlideIndex].classList.remove("active");
    dots[currentSlideIndex].classList.remove("active");

    // Add active class to new slide
    currentSlideIndex = index;
    slides[currentSlideIndex].classList.add("active");
    dots[currentSlideIndex].classList.add("active");

    // Reset transition flag after animation
    setTimeout(() => {
      isTransitioning = false;
    }, 800);
  }

  function nextSlide() {
    const nextIndex = (currentSlideIndex + 1) % sliderImages.length;
    goToSlide(nextIndex);
  }

  function previousSlide() {
    const prevIndex =
      (currentSlideIndex - 1 + sliderImages.length) % sliderImages.length;
    goToSlide(prevIndex);
  }

  function startAutoSlider() {
    slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
  }

  function pauseSlider() {
    clearInterval(slideInterval);
  }

  function resumeSlider() {
    startAutoSlider();
  }

  // Initialize the slider
  if (sliderContainer) {
    initializeSlider();
    startAutoSlider();
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && !isTransitioning) {
      previousSlide();
    } else if (e.key === "ArrowRight" && !isTransitioning) {
      nextSlide();
    }
  });

  // Destination card interactions
  const destinationCards = document.querySelectorAll(".destination-card");
  destinationCards.forEach((card) => {
    card.addEventListener("click", function () {
      const title = this.querySelector("h3").textContent;
    });

    // Add hover effect for better UX
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Explore Now button
  const exploreBtn = document.querySelector(".carousel-cta .btn-primary");

  // Auth buttons functionality
  const loginBtn = document.querySelector(".btn-ghost");
  const signupBtn = document.querySelector(".btn-outline");

  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      alert(
        "Login clicked! This would open the login modal or navigate to login page.",
      );
    });
  }

  if (signupBtn) {
    signupBtn.addEventListener("click", function () {
      alert(
        "Sign Up clicked! This would open the registration modal or navigate to signup page.",
      );
    });
  }

  // Footer links functionality
  const footerLinks = document.querySelectorAll(".footer-section a");
  footerLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const linkText = this.textContent;
      alert(
        `You clicked on ${linkText}. This would navigate to the respective page.`,
      );
    });
  });

  // Social media buttons
  const socialBtns = document.querySelectorAll(".social-btn");
  socialBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const iconClass = this.querySelector("i").getAttribute("data-lucide");
      const platform = iconClass.charAt(0).toUpperCase() + iconClass.slice(1);
      alert(
        `Opening ${platform}! This would navigate to our ${platform} page.`,
      );
    });
  });

  // Map link
  const mapLink = document.querySelector(".map-link");
  if (mapLink) {
    mapLink.addEventListener("click", function () {
      alert("Map clicked! This would open an interactive map or directions.");
    });
  }

  // Smooth scrolling for internal navigation (if needed)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add loading states for buttons
  function addLoadingState(button, duration = 1000) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i data-lucide="loader-2"></i> Loading...';
    button.disabled = true;

    // Re-initialize icons for the loader
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }

    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
      // Re-initialize icons
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    }, duration);
  }

  // Add some enhanced interactivity
  searchBtn?.addEventListener("click", function () {
    addLoadingState(this, 1500);
  });

  exploreBtn?.addEventListener("click", function () {
    addLoadingState(this, 1000);
  });

  console.log("Travel booking website initialized successfully!");
});

// Function to redirect to destination detail page (Global scope for onclick handlers)
function redirectToExplore(destinationType) {
  // Add visual feedback before redirect
  const card = document.querySelector(
    `[data-destination="${destinationType}"]`,
  );
  if (card) {
    card.style.transform = "scale(0.95)";
    card.style.opacity = "0.8";

    setTimeout(() => {
      window.location.href = `destination-detail.html?destination=${destinationType}`;
    }, 200);
  } else {
    window.location.href = `destination-detail.html?destination=${destinationType}`;
  }
}

// Handle window resize for responsive behavior
window.addEventListener("resize", function () {
  // Handle any responsive JavaScript if needed
  const navIcons = document.querySelector(".nav-icons");
  if (window.innerWidth < 768) {
    // Mobile behavior
    if (navIcons) {
      navIcons.style.display = "none";
    }
  } else {
    // Desktop behavior
    if (navIcons) {
      navIcons.style.display = "flex";
    }
  }
});

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe destination cards for fade-in animation
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".destination-card");
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
});
