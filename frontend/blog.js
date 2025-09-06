// Blog Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize event handlers
    initializeEventHandlers();
    initializeAnimations();
    initializeNewsletter();
});

function initializeEventHandlers() {
    // Category card interactions
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = card.querySelector('h3').textContent;
            filterArticlesByCategory(category);
        });
    });

    // Article card interactions
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = card.querySelector('h3').textContent;
            openArticle(title);
        });
    });

    // Load more button
    const loadMoreBtn = document.querySelector('.load-more-container .btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMoreArticles();
        });
    }

    // Guide navigation
    const guideLinks = document.querySelectorAll('.guide-nav a');
    guideLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

function filterArticlesByCategory(category) {
    // Simulate filtering articles by category
    console.log(`Filtering articles by category: ${category}`);
    
    // Update active category
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.classList.remove('active');
        if (card.querySelector('h3').textContent === category) {
            card.classList.add('active');
        }
    });

    // Show loading state
    const articlesGrid = document.querySelector('.articles-grid');
    if (articlesGrid) {
        articlesGrid.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            articlesGrid.classList.remove('loading');
            // In a real implementation, this would update the articles grid
            showFilteredArticles(category);
        }, 1000);
    }
}

function showFilteredArticles(category) {
    // This would typically fetch articles from an API
    const articlesGrid = document.querySelector('.articles-grid');
    if (articlesGrid) {
        // Simulate showing filtered articles
        const message = document.createElement('div');
        message.className = 'filter-message';
        message.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #6b7280;">
                <h3>Showing articles in "${category}"</h3>
                <p>Found 8 articles in this category</p>
            </div>
        `;
        
        // Clear existing content and show message
        articlesGrid.innerHTML = '';
        articlesGrid.appendChild(message);
    }
}

function openArticle(title) {
    // Create modal for article content
    const modal = createModal();
    const articleData = getArticleData(title);
    
    const modalContent = `
        <div class="article-detail">
            <div class="article-header">
                <div class="article-meta">
                    <span class="category">${articleData.category}</span>
                    <span class="date">${articleData.date}</span>
                    <span class="read-time">${articleData.readTime}</span>
                </div>
                <h1>${articleData.title}</h1>
                <div class="article-tags">
                    ${articleData.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            
            <div class="article-image-large">
                <img src="${articleData.image}" alt="${articleData.title}" />
            </div>
            
            <div class="article-content">
                <div class="article-excerpt">
                    <p>${articleData.excerpt}</p>
                </div>
                
                <div class="article-body">
                    ${articleData.content}
                </div>
                
                <div class="article-author">
                    <div class="author-info">
                        <div class="author-avatar">
                            <img src="${articleData.author.avatar}" alt="${articleData.author.name}" />
                        </div>
                        <div class="author-details">
                            <h4>${articleData.author.name}</h4>
                            <p>${articleData.author.bio}</p>
                        </div>
                    </div>
                </div>
                
                <div class="article-actions">
                    <button class="btn btn-outline" onclick="shareArticle('${title}')">
                        <i data-lucide="share-2"></i>
                        Share
                    </button>
                    <button class="btn btn-outline" onclick="bookmarkArticle('${title}')">
                        <i data-lucide="bookmark"></i>
                        Bookmark
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.querySelector('.modal-body').innerHTML = modalContent;
    showModal(modal);
    
    // Re-initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function loadMoreArticles() {
    const loadMoreBtn = document.querySelector('.load-more-container .btn');
    if (loadMoreBtn) {
        loadMoreBtn.textContent = 'Loading...';
        loadMoreBtn.disabled = true;
        
        // Simulate loading more articles
        setTimeout(() => {
            loadMoreBtn.textContent = 'Load More Articles';
            loadMoreBtn.disabled = false;
            
            // In a real implementation, this would append new articles
            console.log('Loading more articles...');
        }, 1500);
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function shareArticle(title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: `Check out this article: ${title}`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('Article link copied to clipboard!');
        });
    }
}

function bookmarkArticle(title) {
    // Simulate bookmarking
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    if (!bookmarks.includes(title)) {
        bookmarks.push(title);
        localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarks));
        alert('Article bookmarked!');
    } else {
        alert('Article already bookmarked!');
    }
}

function initializeNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        const input = form.querySelector('input[type="email"]');
        const button = form.querySelector('.btn');
        
        if (input && button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                handleNewsletterSignup(input.value, form);
            });
            
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleNewsletterSignup(input.value, form);
                }
            });
        }
    });
}

function handleNewsletterSignup(email, form) {
    if (!email || !isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    const button = form.querySelector('.btn');
    const originalText = button.textContent;
    
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        button.textContent = 'Subscribed!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
            form.querySelector('input[type="email"]').value = '';
        }, 2000);
    }, 1000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Data functions
function getArticleData(title) {
    const articles = {
        'Capturing the Perfect Sunset at Grand Vista': {
            category: 'Photography',
            date: 'December 12, 2024',
            readTime: '3 min read',
            tags: ['Photography', 'Sunset'],
            image: 'assets/attractive/golden.jpg',
            excerpt: 'Learn the best spots and techniques for photographing our stunning sunsets, from the beachfront to the rooftop terrace.',
            content: `
                <p>There's something magical about watching the sun dip below the horizon at Grand Vista Resort. The golden hour transforms our already beautiful surroundings into a photographer's paradise.</p>
                
                <h3>Best Sunset Spots</h3>
                <ul>
                    <li><strong>Beachfront Terrace:</strong> Direct ocean views with no obstructions</li>
                    <li><strong>Rooftop Bar:</strong> Elevated perspective with panoramic views</li>
                    <li><strong>Garden Pavilion:</strong> Natural framing with tropical foliage</li>
                    <li><strong>Private Beach:</strong> Intimate setting with pristine sands</li>
                </ul>
                
                <h3>Photography Tips</h3>
                <p>To capture the perfect sunset shot, arrive 30 minutes before sunset to scout your location. Use a tripod for stability and experiment with different angles. The golden hour provides soft, warm lighting that's perfect for photography.</p>
                
                <h3>Equipment Recommendations</h3>
                <p>While smartphone cameras can capture beautiful sunsets, a DSLR or mirrorless camera will give you more control. A wide-angle lens is ideal for landscape shots, while a telephoto lens can create dramatic silhouettes.</p>
            `,
            author: {
                name: 'Sarah Johnson',
                bio: 'Professional photographer and travel blogger',
                avatar: 'assets/experience/meditation.jpg'
            }
        },
        'Local Cuisine: A Culinary Journey Through Paradise': {
            category: 'Food',
            date: 'December 10, 2024',
            readTime: '4 min read',
            tags: ['Food', 'Local Culture'],
            image: 'assets/attractive/authentic-sushi.jpg',
            excerpt: 'Discover the authentic flavors of our region, from street food to fine dining, and the stories behind each dish.',
            content: `
                <p>Our destination is a melting pot of culinary traditions, where fresh local ingredients meet international influences to create unforgettable dining experiences.</p>
                
                <h3>Must-Try Local Dishes</h3>
                <ul>
                    <li><strong>Paradise Ceviche:</strong> Fresh fish marinated in citrus with local herbs</li>
                    <li><strong>Tropical Curry:</strong> Aromatic spices with coconut milk and fresh vegetables</li>
                    <li><strong>Beachside BBQ:</strong> Grilled seafood with traditional marinades</li>
                    <li><strong>Island Desserts:</strong> Sweet treats made with local fruits and spices</li>
                </ul>
                
                <h3>Where to Eat</h3>
                <p>From our resort's fine dining restaurants to local food markets, there's something for every palate and budget. Our concierge team can recommend the best spots based on your preferences.</p>
                
                <h3>Cooking Classes</h3>
                <p>Learn to prepare these dishes yourself with our hands-on cooking classes led by local chefs. It's a great way to take a piece of paradise home with you.</p>
            `,
            author: {
                name: 'Chef Maria Rodriguez',
                bio: 'Executive Chef at Grand Vista Resort',
                avatar: 'assets/experience/traditional-cooking.jpg'
            }
        },
        'Wellness Retreat: Rejuvenate Your Mind and Body': {
            category: 'Wellness',
            date: 'December 8, 2024',
            readTime: '6 min read',
            tags: ['Wellness', 'Spa'],
            image: 'assets/attractive/northern.webp',
            excerpt: 'Explore our comprehensive wellness programs and discover how to create your perfect spa and wellness experience.',
            content: `
                <p>At Grand Vista Resort, wellness isn't just a service—it's a way of life. Our comprehensive wellness programs are designed to rejuvenate your mind, body, and spirit.</p>
                
                <h3>Spa Treatments</h3>
                <ul>
                    <li><strong>Signature Massage:</strong> Customized treatments using local essential oils</li>
                    <li><strong>Facial Therapies:</strong> Rejuvenating treatments with natural ingredients</li>
                    <li><strong>Body Wraps:</strong> Detoxifying treatments with tropical elements</li>
                    <li><strong>Couples Packages:</strong> Romantic treatments for two</li>
                </ul>
                
                <h3>Fitness Programs</h3>
                <p>Our state-of-the-art fitness center offers personal training, group classes, and outdoor activities. From yoga on the beach to high-intensity interval training, there's something for every fitness level.</p>
                
                <h3>Wellness Activities</h3>
                <p>Beyond traditional spa services, we offer meditation sessions, nature walks, and wellness workshops. These activities are designed to help you connect with yourself and the natural beauty around you.</p>
            `,
            author: {
                name: 'Dr. Lisa Chen',
                bio: 'Wellness Director at Grand Vista Resort',
                avatar: 'assets/experience/meditation.jpg'
            }
        }
    };
    
    return articles[title] || {
        category: 'General',
        date: 'Recent',
        readTime: '5 min read',
        tags: ['General'],
        image: 'assets/attractive/colosseum.webp',
        excerpt: 'An interesting article about our destination.',
        content: '<p>This is a sample article content.</p>',
        author: {
            name: 'Resort Team',
            bio: 'Grand Vista Resort Editorial Team',
            avatar: 'assets/experience/meditation.jpg'
        }
    };
}

// Modal functions
function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">
                <i data-lucide="x"></i>
            </button>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function showModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay.active');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Animation functions
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.category-card, .article-card, .guide-section');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add smooth scrolling for guide navigation
document.addEventListener('DOMContentLoaded', function() {
    const guideLinks = document.querySelectorAll('.guide-nav a[href^="#"]');
    guideLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
