// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Navigation functionality
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            navButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
        });
    });

    // Search form functionality
    const searchForm = document.querySelector('.search-form');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form values
            const location = document.querySelector('.search-field input[placeholder="Location"]').value;
            const date = document.querySelector('.search-field input[type="date"]').value;
            const guests = document.querySelector('.search-field input[placeholder="Guests"]').value;
            
            // Simple validation
            if (!location.trim()) {
                alert('Please enter a location');
                return;
            }
            
            if (!date) {
                alert('Please select a date');
                return;
            }
            
            // Simulate search
            console.log('Searching for:', { location, date, guests });
            alert(`Searching for accommodations in ${location} for ${date}${guests ? ` for ${guests} guests` : ''}`);
        });
    }

    // Carousel functionality
    const carouselImages = [
        'Featured Destination Image',
        'Beautiful Mountain Resort',
        'Seaside Villa',
        'Urban Loft',
        'Desert Retreat'
    ];
    
    let currentImageIndex = 0;
    const imageDisplay = document.querySelector('.carousel-image .image-placeholder span');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    function updateCarouselImage() {
        if (imageDisplay) {
            imageDisplay.textContent = carouselImages[currentImageIndex];
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
            updateCarouselImage();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
            updateCarouselImage();
        });
    }

    // Auto-rotate carousel every 5 seconds
    setInterval(function() {
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
        updateCarouselImage();
    }, 5000);

    // Destination card interactions
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            alert(`You clicked on ${title}! This would navigate to the destination details page.`);
        });

        // Add hover effect for better UX
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Auth buttons functionality
    const loginBtn = document.querySelector('.btn-ghost');
    const signupBtn = document.querySelector('.btn-outline');

    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            alert('Login clicked! This would open the login modal or navigate to login page.');
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            alert('Sign Up clicked! This would open the registration modal or navigate to signup page.');
        });
    }

    // Footer links functionality
    const footerLinks = document.querySelectorAll('.footer-section a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            alert(`You clicked on ${linkText}. This would navigate to the respective page.`);
        });
    });

    // Social media buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const iconClass = this.querySelector('i').getAttribute('data-lucide');
            const platform = iconClass.charAt(0).toUpperCase() + iconClass.slice(1);
            alert(`Opening ${platform}! This would navigate to our ${platform} page.`);
        });
    });

    // Map link
    const mapLink = document.querySelector('.map-link');
    if (mapLink) {
        mapLink.addEventListener('click', function() {
            alert('Map clicked! This would open an interactive map or directions.');
        });
    }

    // Smooth scrolling for internal navigation (if needed)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
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
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            // Re-initialize icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, duration);
    }

    // Add some enhanced interactivity
    searchBtn?.addEventListener('click', function() {
        addLoadingState(this, 1500);
    });

    exploreBtn?.addEventListener('click', function() {
        addLoadingState(this, 1000);
    });

    console.log('Travel booking website initialized successfully!');
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Handle any responsive JavaScript if needed
    const navIcons = document.querySelector('.nav-icons');
    if (window.innerWidth < 768) {
        // Mobile behavior
        if (navIcons) {
            navIcons.style.display = 'none';
        }
    } else {
        // Desktop behavior
        if (navIcons) {
            navIcons.style.display = 'flex';
        }
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe destination cards for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.destination-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});