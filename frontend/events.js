// Events Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize event handlers
    initializeEventHandlers();
    initializeAnimations();
});

function initializeEventHandlers() {
    // Category card interactions
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        const button = card.querySelector('.btn');
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const category = card.querySelector('h3').textContent;
                showCategoryDetails(category);
            });
        }
    });

    // Venue card interactions
    const venueCards = document.querySelectorAll('.venue-card');
    venueCards.forEach(card => {
        const button = card.querySelector('.btn');
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const venue = card.querySelector('h3').textContent;
                showVenueDetails(venue);
            });
        }
    });

    // Activity card interactions
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach(card => {
        card.addEventListener('click', function() {
            const activity = card.querySelector('h3').textContent;
            showActivityDetails(activity);
        });
    });

    // Attraction card interactions
    const attractionCards = document.querySelectorAll('.attraction-card');
    attractionCards.forEach(card => {
        card.addEventListener('click', function() {
            const attraction = card.querySelector('h3').textContent;
            showAttractionDetails(attraction);
        });
    });

    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.contact-cta .btn, .planning-cta .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const buttonText = this.textContent.trim();
            handleCTAClick(buttonText);
        });
    });
}

function showCategoryDetails(category) {
    // Create modal for category details
    const modal = createModal();
    const modalContent = `
        <div class="category-details">
            <h2>${category} Events</h2>
            <div class="details-content">
                <div class="details-section">
                    <h3>What We Offer</h3>
                    <ul>
                        <li>Custom event design and planning</li>
                        <li>Professional coordination services</li>
                        <li>Flexible venue options</li>
                        <li>Premium catering services</li>
                        <li>Entertainment coordination</li>
                    </ul>
                </div>
                <div class="details-section">
                    <h3>Capacity Options</h3>
                    <ul>
                        <li>Intimate gatherings (10-50 guests)</li>
                        <li>Medium events (50-150 guests)</li>
                        <li>Large celebrations (150-500 guests)</li>
                    </ul>
                </div>
                <div class="details-section">
                    <h3>Special Packages</h3>
                    <ul>
                        <li>All-inclusive event packages</li>
                        <li>Custom menu selections</li>
                        <li>Accommodation packages</li>
                        <li>Transportation services</li>
                    </ul>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="contactEventsTeam('${category}')">Contact Events Team</button>
                <button class="btn btn-outline" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    modal.querySelector('.modal-body').innerHTML = modalContent;
    showModal(modal);
}

function showVenueDetails(venue) {
    const modal = createModal();
    const venueData = getVenueData(venue);
    
    const modalContent = `
        <div class="venue-details">
            <h2>${venue}</h2>
            <div class="venue-image-large">
                <img src="${venueData.image}" alt="${venue}" />
            </div>
            <div class="details-content">
                <div class="venue-specs">
                    <div class="spec-item">
                        <strong>Capacity:</strong> ${venueData.capacity}
                    </div>
                    <div class="spec-item">
                        <strong>Type:</strong> ${venueData.type}
                    </div>
                    <div class="spec-item">
                        <strong>Features:</strong> ${venueData.features.join(', ')}
                    </div>
                </div>
                <div class="venue-description">
                    <p>${venueData.description}</p>
                </div>
                <div class="venue-amenities">
                    <h3>Included Amenities</h3>
                    <ul>
                        ${venueData.amenities.map(amenity => `<li>${amenity}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="requestVenueQuote('${venue}')">Request Quote</button>
                <button class="btn btn-outline" onclick="scheduleVenueTour('${venue}')">Schedule Tour</button>
                <button class="btn btn-outline" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    modal.querySelector('.modal-body').innerHTML = modalContent;
    showModal(modal);
}

function showActivityDetails(activity) {
    const modal = createModal();
    const activityData = getActivityData(activity);
    
    const modalContent = `
        <div class="activity-details">
            <h2>${activity}</h2>
            <div class="activity-image-large">
                <img src="${activityData.image}" alt="${activity}" />
            </div>
            <div class="details-content">
                <div class="activity-info">
                    <div class="info-item">
                        <strong>Duration:</strong> ${activityData.duration}
                    </div>
                    <div class="info-item">
                        <strong>Difficulty:</strong> ${activityData.difficulty}
                    </div>
                    <div class="info-item">
                        <strong>Age Requirements:</strong> ${activityData.ageRequirements}
                    </div>
                </div>
                <div class="activity-description">
                    <p>${activityData.description}</p>
                </div>
                <div class="activity-schedule">
                    <h3>Schedule</h3>
                    <ul>
                        ${activityData.schedule.map(time => `<li>${time}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="bookActivity('${activity}')">Book Now</button>
                <button class="btn btn-outline" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    modal.querySelector('.modal-body').innerHTML = modalContent;
    showModal(modal);
}

function showAttractionDetails(attraction) {
    const modal = createModal();
    const attractionData = getAttractionData(attraction);
    
    const modalContent = `
        <div class="attraction-details">
            <h2>${attraction}</h2>
            <div class="attraction-image-large">
                <img src="${attractionData.image}" alt="${attraction}" />
            </div>
            <div class="details-content">
                <div class="attraction-info">
                    <div class="info-item">
                        <strong>Distance:</strong> ${attractionData.distance}
                    </div>
                    <div class="info-item">
                        <strong>Type:</strong> ${attractionData.type}
                    </div>
                    <div class="info-item">
                        <strong>Admission:</strong> ${attractionData.admission}
                    </div>
                </div>
                <div class="attraction-description">
                    <p>${attractionData.description}</p>
                </div>
                <div class="attraction-highlights">
                    <h3>Highlights</h3>
                    <ul>
                        ${attractionData.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="bookAttractionTour('${attraction}')">Book Tour</button>
                <button class="btn btn-outline" onclick="getDirections('${attraction}')">Get Directions</button>
                <button class="btn btn-outline" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    modal.querySelector('.modal-body').innerHTML = modalContent;
    showModal(modal);
}

function handleCTAClick(buttonText) {
    if (buttonText.includes('Contact Events Team') || buttonText.includes('Start Planning')) {
        // Redirect to contact page or open contact form
        window.location.href = 'contact.html?subject=Event Planning';
    } else if (buttonText.includes('Download Event Guide')) {
        // Simulate download
        downloadEventGuide();
    } else if (buttonText.includes('View Event Packages')) {
        // Show event packages modal
        showEventPackages();
    }
}

function contactEventsTeam(category) {
    window.location.href = `contact.html?subject=Event Planning - ${category}`;
}

function requestVenueQuote(venue) {
    window.location.href = `contact.html?subject=Venue Quote - ${venue}`;
}

function scheduleVenueTour(venue) {
    window.location.href = `contact.html?subject=Venue Tour - ${venue}`;
}

function bookActivity(activity) {
    // Simulate booking process
    alert(`Booking ${activity}... Redirecting to booking system.`);
}

function bookAttractionTour(attraction) {
    // Simulate tour booking
    alert(`Booking tour to ${attraction}... Redirecting to booking system.`);
}

function getDirections(attraction) {
    // Simulate getting directions
    alert(`Getting directions to ${attraction}... Opening maps.`);
}

function downloadEventGuide() {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#'; // In real implementation, this would be the actual PDF URL
    link.download = 'Grand Vista Resort Event Guide.pdf';
    link.click();
    alert('Event Guide download started!');
}

function showEventPackages() {
    const modal = createModal();
    const modalContent = `
        <div class="event-packages">
            <h2>Event Packages</h2>
            <div class="packages-grid">
                <div class="package-card">
                    <h3>Essential Package</h3>
                    <div class="package-price">From $2,500</div>
                    <ul>
                        <li>Basic venue rental (4 hours)</li>
                        <li>Standard catering for 50 guests</li>
                        <li>Basic sound system</li>
                        <li>Event coordinator</li>
                    </ul>
                    <button class="btn btn-outline">Learn More</button>
                </div>
                <div class="package-card">
                    <h3>Premium Package</h3>
                    <div class="package-price">From $5,000</div>
                    <ul>
                        <li>Premium venue rental (6 hours)</li>
                        <li>Gourmet catering for 100 guests</li>
                        <li>Professional sound & lighting</li>
                        <li>Dedicated event coordinator</li>
                        <li>Floral arrangements</li>
                    </ul>
                    <button class="btn btn-outline">Learn More</button>
                </div>
                <div class="package-card">
                    <h3>Luxury Package</h3>
                    <div class="package-price">From $10,000</div>
                    <ul>
                        <li>Exclusive venue access (8 hours)</li>
                        <li>Chef's table experience</li>
                        <li>Full production services</li>
                        <li>Personal event manager</li>
                        <li>Custom decorations</li>
                        <li>Guest accommodations</li>
                    </ul>
                    <button class="btn btn-outline">Learn More</button>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="contactEventsTeam('Custom Package')">Request Custom Quote</button>
                <button class="btn btn-outline" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    modal.querySelector('.modal-body').innerHTML = modalContent;
    showModal(modal);
}

// Data functions
function getVenueData(venue) {
    const venues = {
        'Grand Ballroom': {
            image: 'assets/explore/urban1.jpg',
            capacity: 'Up to 500 guests',
            type: 'Indoor',
            features: ['Ocean View', 'Dance Floor', 'Crystal Chandeliers'],
            description: 'Our flagship venue featuring crystal chandeliers, marble floors, and panoramic ocean views. Perfect for weddings and grand celebrations.',
            amenities: ['Professional sound system', 'Lighting package', 'Dance floor', 'Bridal suite', 'Catering kitchen']
        },
        'Garden Pavilion': {
            image: 'assets/explore/oceanfront1.jpg',
            capacity: 'Up to 200 guests',
            type: 'Outdoor',
            features: ['Garden Setting', 'Natural Lighting', 'Tropical Gardens'],
            description: 'An elegant outdoor venue surrounded by lush tropical gardens. Ideal for intimate ceremonies and al fresco dining.',
            amenities: ['Weather protection', 'Natural lighting', 'Garden backdrop', 'Sound system', 'Catering setup']
        },
        'Executive Boardroom': {
            image: 'assets/explore/urban2.jpg',
            capacity: 'Up to 50 guests',
            type: 'Indoor',
            features: ['Tech Equipped', 'Executive Style', 'Professional Setting'],
            description: 'A sophisticated space equipped with cutting-edge technology for corporate meetings and presentations.',
            amenities: ['Video conferencing', 'Projection system', 'Whiteboard', 'Catering service', 'WiFi']
        },
        'Beachfront Terrace': {
            image: 'assets/explore/seaside1.jpg',
            capacity: 'Up to 150 guests',
            type: 'Outdoor',
            features: ['Beachfront', 'Sunset Views', 'Beach Access'],
            description: 'Breathtaking oceanfront setting with direct beach access. Perfect for sunset ceremonies and beach parties.',
            amenities: ['Beach access', 'Sunset views', 'Sound system', 'Lighting', 'Beach setup']
        }
    };
    
    return venues[venue] || venues['Grand Ballroom'];
}

function getActivityData(activity) {
    const activities = {
        'Water Sports': {
            image: 'assets/experience/oceanfront1.jpg',
            duration: '2-4 hours',
            difficulty: 'Beginner to Intermediate',
            ageRequirements: '8+ years',
            description: 'Enjoy kayaking, paddleboarding, snorkeling, and more in our crystal-clear lagoon with professional instruction and safety equipment.',
            schedule: ['9:00 AM - 11:00 AM', '2:00 PM - 4:00 PM', '4:30 PM - 6:30 PM']
        },
        'Fitness Center': {
            image: 'assets/experience/gym.jpg',
            duration: '1-2 hours',
            difficulty: 'All Levels',
            ageRequirements: '16+ years',
            description: 'State-of-the-art gym with personal trainers and group fitness classes available 24/7.',
            schedule: ['6:00 AM - 10:00 PM (Daily)', 'Group classes at 7 AM, 12 PM, 6 PM']
        },
        'Spa Services': {
            image: 'assets/experience/spa.jpg',
            duration: '1-3 hours',
            difficulty: 'Relaxing',
            ageRequirements: '18+ years',
            description: 'Relax and rejuvenate with our world-class spa treatments and wellness programs.',
            schedule: ['9:00 AM - 8:00 PM (Daily)', 'Advance booking recommended']
        },
        'Cooking Classes': {
            image: 'assets/experience/cooking.jpg',
            duration: '2-3 hours',
            difficulty: 'All Levels',
            ageRequirements: '12+ years',
            description: 'Learn from our master chefs with hands-on cooking classes and wine pairings.',
            schedule: ['10:00 AM - 12:00 PM (Daily)', '3:00 PM - 5:00 PM (Weekends)']
        },
        'Live Entertainment': {
            image: 'assets/experience/entertainment.jpg',
            duration: '1-2 hours',
            difficulty: 'N/A',
            ageRequirements: 'All Ages',
            description: 'Evening shows, live music, and cultural performances in our entertainment venues.',
            schedule: ['8:00 PM - 10:00 PM (Daily)', 'Special shows on weekends']
        },
        'Guided Tours': {
            image: 'assets/experience/tours.jpg',
            duration: '3-6 hours',
            difficulty: 'Easy to Moderate',
            ageRequirements: 'All Ages',
            description: 'Explore the local area with our knowledgeable guides and curated tour experiences.',
            schedule: ['9:00 AM - 3:00 PM (Daily)', 'Advance booking required']
        }
    };
    
    return activities[activity] || activities['Water Sports'];
}

function getAttractionData(attraction) {
    const attractions = {
        'Historic Downtown': {
            image: 'assets/attractive/colosseum.webp',
            distance: '10 min drive',
            type: 'Cultural',
            admission: 'Free',
            description: 'Explore charming streets lined with boutique shops, art galleries, and local restaurants. Rich in history and culture.',
            highlights: ['Historic architecture', 'Local boutiques', 'Art galleries', 'Traditional restaurants', 'Walking tours']
        },
        'National Park': {
            image: 'assets/attractive/golden.jpg',
            distance: '25 min drive',
            type: 'Nature',
            admission: '$15 per person',
            description: 'Hiking trails, wildlife viewing, and stunning natural landscapes. Perfect for outdoor enthusiasts and nature lovers.',
            highlights: ['Hiking trails', 'Wildlife viewing', 'Scenic overlooks', 'Photography spots', 'Ranger programs']
        },
        'Contemporary Art Museum': {
            image: 'assets/attractive/museum.jpg',
            distance: '15 min drive',
            type: 'Art & Culture',
            admission: '$20 per person',
            description: 'World-class exhibitions featuring local and international artists. A cultural gem in the heart of the city.',
            highlights: ['Modern art exhibitions', 'Artist talks', 'Gift shop', 'Café', 'Guided tours']
        },
        'Championship Golf Course': {
            image: 'assets/attractive/golf.jpg',
            distance: '5 min drive',
            type: 'Sports',
            admission: '$150 per round',
            description: '18-hole championship course designed by a renowned architect. Challenging play with breathtaking ocean views.',
            highlights: ['Ocean views', 'Championship layout', 'Pro shop', 'Restaurant', 'Lessons available']
        },
        'Private Beach Access': {
            image: 'assets/attractive/beach.jpg',
            distance: 'On-site',
            type: 'Beach',
            admission: 'Complimentary',
            description: 'Exclusive beachfront with pristine sands and crystal-clear waters. Complimentary beach chairs and umbrellas.',
            highlights: ['Private access', 'Beach chairs', 'Umbrellas', 'Water sports', 'Beach service']
        },
        'Wine Tasting Tours': {
            image: 'assets/attractive/wine.jpg',
            distance: '30 min drive',
            type: 'Food & Wine',
            admission: '$75 per person',
            description: 'Guided tours of local vineyards with wine tastings and gourmet food pairings. Transportation included.',
            highlights: ['Vineyard tours', 'Wine tastings', 'Food pairings', 'Transportation', 'Expert guides']
        }
    };
    
    return attractions[attraction] || attractions['Historic Downtown'];
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
    
    // Re-initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
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
    const animatedElements = document.querySelectorAll('.category-card, .venue-card, .attraction-card, .activity-card');
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
