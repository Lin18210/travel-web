// Initialize Lucide icons
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
  
  // Initialize theme
  initializeTheme();
  
  // Initialize dropdowns
  initializeDropdowns();
  
  // Initialize social media integration
  initializeSocialMedia();
  
  // Load navbar if it's not already loaded
  if (!document.querySelector('.nav')) {
    loadNavbar();
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

  // Hamburger menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });
  }
  // Close menu when clicking a link (mobile UX)
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900 && navMenu.classList.contains('open')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
      }
    });
  });
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

// Social Media Integration Functions
function initializeSocialMedia() {
  // Add social sharing buttons to pages
  addSocialSharingButtons();
  
  // Initialize social media widgets
  initializeSocialWidgets();
  
  // Add social media event tracking
  initializeSocialTracking();
}

function addSocialSharingButtons() {
  // Create social sharing container
  const socialContainer = document.createElement('div');
  socialContainer.className = 'social-sharing-container';
  socialContainer.innerHTML = `
    <div class="social-sharing">
      <h4>Share this page</h4>
      <div class="social-buttons">
        <button class="social-share-btn facebook" onclick="shareOnFacebook()" aria-label="Share on Facebook">
          <i data-lucide="facebook"></i>
          <span>Facebook</span>
        </button>
        <button class="social-share-btn twitter" onclick="shareOnTwitter()" aria-label="Share on Twitter">
          <i data-lucide="twitter"></i>
          <span>Twitter</span>
        </button>
        <button class="social-share-btn linkedin" onclick="shareOnLinkedIn()" aria-label="Share on LinkedIn">
          <i data-lucide="linkedin"></i>
          <span>LinkedIn</span>
        </button>
        <button class="social-share-btn whatsapp" onclick="shareOnWhatsApp()" aria-label="Share on WhatsApp">
          <i data-lucide="message-circle"></i>
          <span>WhatsApp</span>
        </button>
        <button class="social-share-btn email" onclick="shareViaEmail()" aria-label="Share via Email">
          <i data-lucide="mail"></i>
          <span>Email</span>
        </button>
      </div>
    </div>
  `;
  
  // Add to main content area
  const mainContent = document.querySelector('#main-content') || document.querySelector('.destinations');
  if (mainContent) {
    mainContent.appendChild(socialContainer);
  }
  
  // Re-initialize icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function initializeSocialWidgets() {
  // Add social media follow buttons to footer
  const footerSocialIcons = document.querySelectorAll('.social-icons .social-btn');
  footerSocialIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const platform = this.querySelector('i').getAttribute('data-lucide');
      openSocialProfile(platform);
    });
  });
}

function initializeSocialTracking() {
  // Track social media interactions
  const socialButtons = document.querySelectorAll('.social-share-btn, .social-btn');
  socialButtons.forEach(button => {
    button.addEventListener('click', function() {
      const platform = this.classList.contains('social-share-btn') 
        ? this.classList[1] 
        : this.querySelector('i').getAttribute('data-lucide');
      
      // Track social interaction (in real implementation, send to analytics)
      console.log(`Social interaction: ${platform}`);
      
      // Example: Send to Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'social_interaction', {
          'social_network': platform,
          'social_action': 'share',
          'social_target': window.location.href
        });
      }
    });
  });
}

// Social Sharing Functions
function shareOnFacebook() {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`;
  openSocialWindow(facebookUrl, 'Facebook');
}

function shareOnTwitter() {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
  openSocialWindow(twitterUrl, 'Twitter');
}

function shareOnLinkedIn() {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  openSocialWindow(linkedinUrl, 'LinkedIn');
}

function shareOnWhatsApp() {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const whatsappUrl = `https://wa.me/?text=${title}%20${url}`;
  openSocialWindow(whatsappUrl, 'WhatsApp');
}

function shareViaEmail() {
  const url = window.location.href;
  const title = document.title;
  const subject = encodeURIComponent(`Check out: ${title}`);
  const body = encodeURIComponent(`I thought you might be interested in this: ${title}\n\n${url}`);
  const emailUrl = `mailto:?subject=${subject}&body=${body}`;
  window.location.href = emailUrl;
}

function openSocialWindow(url, platform) {
  const width = 600;
  const height = 400;
  const left = (screen.width - width) / 2;
  const top = (screen.height - height) / 2;
  
  const windowFeatures = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`;
  
  window.open(url, platform, windowFeatures);
}

function openSocialProfile(platform) {
  const profiles = {
    'facebook': 'https://www.facebook.com/grandvistaresort',
    'instagram': 'https://www.instagram.com/grandvistaresort',
    'youtube': 'https://www.youtube.com/grandvistaresort',
    'twitter': 'https://www.twitter.com/grandvistaresort',
    'linkedin': 'https://www.linkedin.com/company/grandvistaresort'
  };
  
  const profileUrl = profiles[platform];
  if (profileUrl) {
    window.open(profileUrl, '_blank');
  }
}

// Trust Elements and Social Proof
function addTrustElements() {
  // Add trust badges to the page
  const trustContainer = document.createElement('div');
  trustContainer.className = 'trust-elements';
  trustContainer.innerHTML = `
    <div class="trust-badges">
      <div class="trust-badge">
        <i data-lucide="shield-check"></i>
        <span>Secure Booking</span>
      </div>
      <div class="trust-badge">
        <i data-lucide="award"></i>
        <span>5-Star Rated</span>
      </div>
      <div class="trust-badge">
        <i data-lucide="users"></i>
        <span>10,000+ Happy Guests</span>
      </div>
      <div class="trust-badge">
        <i data-lucide="clock"></i>
        <span>24/7 Support</span>
      </div>
    </div>
  `;
  
  // Add to hero section
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.appendChild(trustContainer);
  }
  
  // Re-initialize icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Initialize trust elements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  addTrustElements();
});

// Load navbar component
function loadNavbar() {
  const headerElement = document.querySelector('header.header');
  
  if (headerElement) {
    fetch('navbar.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load navbar component');
        }
        return response.text();
      })
      .then(html => {
        headerElement.innerHTML = html;
        
        // Set current page indicator
        const currentPage = window.location.pathname.split('/').pop().split('.')[0];
        const navLinks = document.querySelectorAll('[data-nav-link]');
        
        navLinks.forEach(link => {
          if (link.getAttribute('data-nav-link') === currentPage || 
              (currentPage === 'index' && link.getAttribute('data-nav-link') === 'home')) {
            link.setAttribute('aria-current', 'page');
          }
        });
        
        // Initialize authentication buttons
        if (typeof window.Auth !== 'undefined' && typeof window.updateNavigation === 'function') {
          window.updateNavigation();
        } else {
          // Fallback for auth buttons if Auth is not available
          const navIcons = document.querySelector('.nav-icons');
          if (navIcons) {
            navIcons.innerHTML = `
              <button class="btn btn-ghost" onclick="window.location.href='login.html'">Login</button>
              <button class="btn btn-outline" onclick="window.location.href='signup.html'">Sign Up</button>
            `;
          }
        }
        
        // Re-initialize dropdown functionality
        initializeDropdowns();
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
        
        // Re-initialize nav toggle for mobile
        initializeNavToggle();
      })
      .catch(error => {
        console.error('Error loading navbar:', error);
        // Fallback: If navbar fails to load, don't leave the header empty
        headerElement.innerHTML = `
          <nav class="nav">
            <div class="nav-brand">
              <h1><a href="index.html" style="text-decoration: none; color: #d4af37;">Grand Vista Resort</a></h1>
            </div>
          </nav>
        `;
      });
  }
}

// Initialize dropdown menu functionality
function initializeDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('a');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    // Toggle dropdown with keyboard
    trigger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        
        if (!expanded) {
          menu.querySelectorAll('a')[0].focus();
        }
      }
    });
    
    // Close dropdown when focus leaves
    dropdown.addEventListener('focusout', function(e) {
      if (!this.contains(e.relatedTarget)) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Initialize navigation toggle for mobile
function initializeNavToggle() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
    });
  }
}

// Load navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  loadNavbar();
  // Keep other initialization functions that should run after navbar is loaded
});

// Theme functionality
function initializeTheme() {
  // Check for saved theme preference or respect OS preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  
  // Initialize theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Load navbar component
function loadNavbar() {
  const headerElement = document.querySelector('header');
  
  if (!headerElement) return;
  
  fetch('navbar.html')
    .then(response => response.text())
    .then(html => {
      headerElement.innerHTML = html;
      
      // Re-initialize Lucide icons
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
      
      // Initialize dropdowns
      initializeDropdowns();
      
      // Initialize theme toggle
      initializeTheme();
      
      // Initialize mobile menu toggle
      const navToggle = document.querySelector('.nav-toggle');
      const navMenu = document.querySelector('.nav-menu');
      
      if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
          navMenu.classList.toggle('active');
          navToggle.classList.toggle('active');
        });
      }
      
      // Update active nav link
      updateActiveNavLink();
      
      // Initialize auth buttons if available
      if (typeof updateNavigation === 'function') {
        updateNavigation();
      }
    })
    .catch(error => {
      console.error('Error loading navbar:', error);
      headerElement.innerHTML = '<p>Error loading navigation. Please refresh the page.</p>';
    });
}

function updateActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('[data-nav-link]');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('data-nav-link');
    if ((currentPage === 'index.html' && linkPage === 'home') ||
        (currentPage.includes(linkPage) && linkPage !== 'home')) {
      link.classList.add('active');
    }
  });
}

function initializeDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('a[aria-haspopup="true"]');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (!trigger || !menu) return;
    
    // Mouse events
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', !expanded);
      menu.classList.toggle('show');
    });
    
    // Keyboard events
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', !expanded);
        menu.classList.toggle('show');
        
        if (!expanded) {
          const firstItem = menu.querySelector('a');
          if (firstItem) firstItem.focus();
        }
      }
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        trigger.setAttribute('aria-expanded', 'false');
        menu.classList.remove('show');
      }
    });
    
    // Close when focus moves out
    dropdown.addEventListener('focusout', (e) => {
      // Check if the new focus target is still within the dropdown
      if (!dropdown.contains(e.relatedTarget)) {
        trigger.setAttribute('aria-expanded', 'false');
        menu.classList.remove('show');
      }
    });
  });
}
