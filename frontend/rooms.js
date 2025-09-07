// Rooms page functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Set up booking functionality
  setupBookingButtons();
  setupRoomDetails();
});

// Set up booking buttons for each room
function setupBookingButtons() {
  // Get all Book Now buttons
  const bookNowButtons = document.querySelectorAll('.room-actions .btn-primary');
  
  bookNowButtons.forEach((button, index) => {
    // Skip the last button which already has a link
    if (index < bookNowButtons.length - 1) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the room card data
        const roomCard = this.closest('.room-card');
        const roomName = roomCard.querySelector('h3').textContent;
        const roomPrice = roomCard.querySelector('.price').textContent;
        const roomDescription = roomCard.querySelector('.room-description').textContent;
        
        // Store room data in sessionStorage for booking page
        const roomData = {
          name: roomName,
          price: roomPrice,
          description: roomDescription,
          image: roomCard.querySelector('.room-image img').src
        };
        
        sessionStorage.setItem('selectedRoom', JSON.stringify(roomData));
        
        // Redirect to booking page
        window.location.href = 'booking.html';
      });
    }
  });
}

// Set up room details functionality
function setupRoomDetails() {
  // Get all View Details buttons
  const viewDetailsButtons = document.querySelectorAll('.room-actions .btn-outline');
  
  viewDetailsButtons.forEach((button, index) => {
    // Skip the last button which is "Contact Us"
    if (index < viewDetailsButtons.length - 1) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the room card data
        const roomCard = this.closest('.room-card');
        const roomName = roomCard.querySelector('h3').textContent;
        const roomPrice = roomCard.querySelector('.price').textContent;
        const roomDescription = roomCard.querySelector('.room-description').textContent;
        const roomImage = roomCard.querySelector('.room-image img').src;
        
        // Create and show room details modal
        showRoomDetailsModal({
          name: roomName,
          price: roomPrice,
          description: roomDescription,
          image: roomImage,
          amenities: getRoomAmenities(roomCard)
        });
      });
    }
  });
}

// Get room amenities from the room card
function getRoomAmenities(roomCard) {
  const amenities = [];
  const amenityElements = roomCard.querySelectorAll('.amenity');
  
  amenityElements.forEach(amenity => {
    const icon = amenity.querySelector('i');
    const text = amenity.querySelector('span').textContent;
    amenities.push({
      icon: icon.getAttribute('data-lucide'),
      text: text
    });
  });
  
  return amenities;
}

// Show room details modal
function showRoomDetailsModal(roomData) {
  // Create modal HTML
  const modalHTML = `
    <div class="room-modal-overlay" id="roomModal">
      <div class="room-modal">
        <div class="room-modal-header">
          <h2>${roomData.name}</h2>
          <button class="modal-close" onclick="closeRoomModal()">
            <i data-lucide="x"></i>
          </button>
        </div>
        <div class="room-modal-content">
          <div class="room-modal-image">
            <img src="${roomData.image}" alt="${roomData.name}" />
          </div>
          <div class="room-modal-details">
            <div class="room-modal-price">
              <span class="price">${roomData.price}</span>
              <span class="period">per night</span>
            </div>
            <p class="room-modal-description">${roomData.description}</p>
            <div class="room-modal-amenities">
              <h4>Amenities</h4>
              <div class="amenities-grid">
                ${roomData.amenities.map(amenity => `
                  <div class="amenity">
                    <i data-lucide="${amenity.icon}"></i>
                    <span>${amenity.text}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="room-modal-actions">
              <button class="btn btn-outline" onclick="closeRoomModal()">Close</button>
              <button class="btn btn-primary" onclick="bookRoom('${roomData.name}', '${roomData.price}')">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to page
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Reinitialize Lucide icons for the modal
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
  
  // Add modal styles if not already present
  if (!document.getElementById('roomModalStyles')) {
    const styles = `
      <style id="roomModalStyles">
        .room-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .room-modal {
          background: white;
          border-radius: 12px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .room-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
          border-bottom: 1px solid #eee;
        }
        
        .room-modal-header h2 {
          margin: 0;
          color: #333;
        }
        
        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
          padding: 5px;
        }
        
        .modal-close:hover {
          color: #333;
        }
        
        .room-modal-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          padding: 30px;
        }
        
        .room-modal-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 8px;
        }
        
        .room-modal-price {
          margin-bottom: 20px;
        }
        
        .room-modal-price .price {
          font-size: 32px;
          font-weight: bold;
          color: #d4af37;
        }
        
        .room-modal-price .period {
          color: #666;
          margin-left: 5px;
        }
        
        .room-modal-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .room-modal-amenities h4 {
          margin-bottom: 15px;
          color: #333;
        }
        
        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        
        .amenity {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
        }
        
        .room-modal-actions {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }
        
        @media (max-width: 768px) {
          .room-modal-content {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 20px;
          }
          
          .amenities-grid {
            grid-template-columns: 1fr;
          }
          
          .room-modal-actions {
            flex-direction: column;
          }
        }
      </style>
    `;
    document.head.insertAdjacentHTML('beforeend', styles);
  }
}

// Close room modal
function closeRoomModal() {
  const modal = document.getElementById('roomModal');
  if (modal) {
    modal.remove();
  }
}

// Book room function
function bookRoom(roomName, roomPrice) {
  // Store room data in sessionStorage
  const roomData = {
    name: roomName,
    price: roomPrice,
    description: document.querySelector('.room-modal-description').textContent,
    image: document.querySelector('.room-modal-image img').src
  };
  
  sessionStorage.setItem('selectedRoom', JSON.stringify(roomData));
  
  // Close modal and redirect to booking page
  closeRoomModal();
  window.location.href = 'booking.html';
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('room-modal-overlay')) {
    closeRoomModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeRoomModal();
  }
});
