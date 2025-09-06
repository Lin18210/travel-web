// FAQ Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize event handlers
    initializeEventHandlers();
    initializeSearch();
    initializeAnimations();
});

function initializeEventHandlers() {
    // FAQ item toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            toggleFAQItem(item);
        });
    });

    // Category filter functionality
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);
            updateActiveCategory(this);
        });
    });

    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.contact-cta .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const buttonText = this.textContent.trim();
            handleCTAClick(buttonText);
        });
    });
}

function toggleFAQItem(item) {
    const isActive = item.classList.contains('active');
    
    // Close all other FAQ items
    const allItems = document.querySelectorAll('.faq-item');
    allItems.forEach(otherItem => {
        if (otherItem !== item) {
            otherItem.classList.remove('active');
        }
    });
    
    // Toggle current item
    if (isActive) {
        item.classList.remove('active');
    } else {
        item.classList.add('active');
    }
}

function filterByCategory(category) {
    const faqCategories = document.querySelectorAll('.faq-category');
    
    faqCategories.forEach(categoryEl => {
        const categoryData = categoryEl.getAttribute('data-category');
        
        if (category === 'all' || categoryData === category) {
            categoryEl.style.display = 'block';
            categoryEl.classList.add('fade-in');
        } else {
            categoryEl.style.display = 'none';
            categoryEl.classList.remove('fade-in');
        }
    });
    
    // Update search results if there's an active search
    const searchInput = document.getElementById('faqSearch');
    if (searchInput && searchInput.value.trim()) {
        performSearch(searchInput.value.trim());
    }
}

function updateActiveCategory(activeBtn) {
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

function initializeSearch() {
    const searchInput = document.getElementById('faqSearch');
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            searchTimeout = setTimeout(() => {
                if (query.length > 0) {
                    performSearch(query);
                } else {
                    clearSearchResults();
                }
            }, 300);
        });
    }
}

function performSearch(query) {
    const faqItems = document.querySelectorAll('.faq-item');
    const searchResults = document.querySelector('.search-results') || createSearchResults();
    let matchCount = 0;
    let visibleCategories = new Set();
    
    // Clear previous search highlights
    clearSearchHighlights();
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question span').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
        const searchQuery = query.toLowerCase();
        
        if (question.includes(searchQuery) || answer.includes(searchQuery)) {
            item.style.display = 'block';
            item.classList.add('search-match');
            matchCount++;
            
            // Add parent category to visible set
            const category = item.closest('.faq-category');
            if (category) {
                visibleCategories.add(category);
            }
            
            // Highlight matching text
            highlightText(item, searchQuery);
        } else {
            item.style.display = 'none';
        }
    });
    
    // Show/hide categories based on matches
    const faqCategories = document.querySelectorAll('.faq-category');
    faqCategories.forEach(category => {
        if (visibleCategories.has(category)) {
            category.style.display = 'block';
            category.classList.add('fade-in');
        } else {
            category.style.display = 'none';
            category.classList.remove('fade-in');
        }
    });
    
    // Update search results display
    updateSearchResults(matchCount, query);
}

function highlightText(item, query) {
    const question = item.querySelector('.faq-question span');
    const answer = item.querySelector('.faq-answer p');
    
    highlightTextInElement(question, query);
    highlightTextInElement(answer, query);
}

function highlightTextInElement(element, query) {
    const text = element.textContent;
    const regex = new RegExp(`(${query})`, 'gi');
    const highlightedText = text.replace(regex, '<mark class="search-highlight">$1</mark>');
    element.innerHTML = highlightedText;
}

function clearSearchHighlights() {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.textContent = parent.textContent;
    });
}

function createSearchResults() {
    const searchSection = document.querySelector('.search-section .container');
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'search-results';
    resultsDiv.style.display = 'none';
    searchSection.appendChild(resultsDiv);
    return resultsDiv;
}

function updateSearchResults(matchCount, query) {
    const searchResults = document.querySelector('.search-results');
    if (searchResults) {
        if (matchCount > 0) {
            searchResults.innerHTML = `
                <h3>Search Results</h3>
                <p>Found ${matchCount} ${matchCount === 1 ? 'result' : 'results'} for "${query}"</p>
            `;
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = `
                <h3>No Results Found</h3>
                <p>No FAQ items match your search for "${query}". Try different keywords or browse by category.</p>
            `;
            searchResults.style.display = 'block';
        }
    }
}

function clearSearchResults() {
    const searchResults = document.querySelector('.search-results');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
    
    // Show all FAQ items and categories
    const faqItems = document.querySelectorAll('.faq-item');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    faqItems.forEach(item => {
        item.style.display = 'block';
        item.classList.remove('search-match');
    });
    
    faqCategories.forEach(category => {
        category.style.display = 'block';
        category.classList.add('fade-in');
    });
    
    // Clear search highlights
    clearSearchHighlights();
}

function handleCTAClick(buttonText) {
    if (buttonText.includes('Contact Us')) {
        // Redirect to contact page
        window.location.href = 'contact.html?subject=FAQ Inquiry';
    } else if (buttonText.includes('Live Chat')) {
        // Simulate live chat
        openLiveChat();
    }
}

function openLiveChat() {
    // Simulate live chat functionality
    const chatWindow = document.createElement('div');
    chatWindow.className = 'live-chat-modal';
    chatWindow.innerHTML = `
        <div class="chat-container">
            <div class="chat-header">
                <h3>Live Chat Support</h3>
                <button class="chat-close" onclick="closeLiveChat()">
                    <i data-lucide="x"></i>
                </button>
            </div>
            <div class="chat-messages">
                <div class="chat-message bot">
                    <p>Hello! How can I help you today?</p>
                </div>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Type your message..." />
                <button class="chat-send">
                    <i data-lucide="send"></i>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(chatWindow);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .live-chat-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .chat-container {
            background: white;
            border-radius: 12px;
            width: 400px;
            max-width: 90vw;
            height: 500px;
            display: flex;
            flex-direction: column;
        }
        .chat-header {
            padding: 20px;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .chat-header h3 {
            margin: 0;
            color: #1f2937;
        }
        .chat-close {
            background: none;
            border: none;
            cursor: pointer;
            padding: 4px;
        }
        .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
        }
        .chat-message {
            margin-bottom: 16px;
            padding: 12px 16px;
            border-radius: 12px;
            max-width: 80%;
        }
        .chat-message.bot {
            background: #f3f4f6;
            margin-right: auto;
        }
        .chat-message.user {
            background: #d4af37;
            color: white;
            margin-left: auto;
        }
        .chat-input {
            padding: 20px;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 12px;
        }
        .chat-input input {
            flex: 1;
            padding: 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
        }
        .chat-send {
            background: #d4af37;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
    
    // Re-initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Add chat functionality
    const chatInput = chatWindow.querySelector('.chat-input input');
    const chatSend = chatWindow.querySelector('.chat-send');
    const chatMessages = chatWindow.querySelector('.chat-messages');
    
    chatSend.addEventListener('click', function() {
        sendMessage(chatInput.value, chatMessages);
    });
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage(chatInput.value, chatMessages);
        }
    });
}

function sendMessage(message, chatMessages) {
    if (message.trim()) {
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user';
        userMessage.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(userMessage);
        
        // Simulate bot response
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'chat-message bot';
            botMessage.innerHTML = `<p>Thank you for your message. Our support team will respond shortly. In the meantime, feel free to browse our FAQ or contact us directly.</p>`;
            chatMessages.appendChild(botMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        
        // Clear input
        document.querySelector('.chat-input input').value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function closeLiveChat() {
    const chatModal = document.querySelector('.live-chat-modal');
    if (chatModal) {
        chatModal.remove();
    }
}

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

    // Observe FAQ categories
    const faqCategories = document.querySelectorAll('.faq-category');
    faqCategories.forEach(category => {
        observer.observe(category);
    });
}

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLiveChat();
    }
});

// Close live chat when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('live-chat-modal')) {
        closeLiveChat();
    }
});

// Export functions for global access
window.closeLiveChat = closeLiveChat;
