// Gallery functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Gallery filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      // Filter gallery items
      galleryItems.forEach(item => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block";
          // Add animation
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 100);
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Lightbox functionality
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDescription = document.getElementById("lightboxDescription");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");

  let currentImageIndex = 0;
  let visibleImages = [];

  // Update visible images array when filter changes
  function updateVisibleImages() {
    visibleImages = Array.from(galleryItems).filter(item => 
      item.style.display !== "none"
    );
  }

  // Open lightbox
  function openLightbox(imageIndex) {
    updateVisibleImages();
    currentImageIndex = imageIndex;
    showImage(currentImageIndex);
    lightboxModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Show image in lightbox
  function showImage(index) {
    if (visibleImages.length === 0) return;
    
    const item = visibleImages[index];
    const img = item.querySelector("img");
    const title = item.querySelector(".gallery-info h3").textContent;
    const description = item.querySelector(".gallery-info p").textContent;

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;
  }

  // Close lightbox
  function closeLightbox() {
    lightboxModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Previous image
  function prevImage() {
    if (visibleImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
    showImage(currentImageIndex);
  }

  // Next image
  function nextImage() {
    if (visibleImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
    showImage(currentImageIndex);
  }

  // Add click event to gallery items
  galleryItems.forEach((item, index) => {
    const galleryBtn = item.querySelector(".gallery-btn");
    galleryBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      openLightbox(index);
    });
  });

  // Lightbox controls
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", prevImage);
  lightboxNext.addEventListener("click", nextImage);

  // Close lightbox when clicking outside
  lightboxModal.addEventListener("click", function (e) {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (!lightboxModal.classList.contains("active")) return;

    switch (e.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowLeft":
        prevImage();
        break;
      case "ArrowRight":
        nextImage();
        break;
    }
  });

  // Virtual tour functionality
  const virtualTourBtn = document.querySelector(".tour-placeholder");
  if (virtualTourBtn) {
    virtualTourBtn.addEventListener("click", function () {
      // Simulate virtual tour opening
      alert("Virtual tour would open here. This would typically integrate with a 360° tour service like Matterport or similar.");
    });
  }

  // Video gallery functionality
  const videoItems = document.querySelectorAll(".video-item");
  videoItems.forEach(item => {
    item.addEventListener("click", function () {
      const videoTitle = this.querySelector(".video-info h3").textContent;
      alert(`Video "${videoTitle}" would play here. This would typically open a video modal or redirect to a video player.`);
    });
  });

  // Smooth scrolling for filter buttons
  filterButtons.forEach(button => {
    button.addEventListener("click", function () {
      const gallerySection = document.querySelector(".photo-gallery");
      gallerySection.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // Lazy loading for images (basic implementation)
  const images = document.querySelectorAll(".gallery-image img, .video-thumbnail img");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = "0";
        img.style.transition = "opacity 0.3s ease";
        
        img.onload = function () {
          img.style.opacity = "1";
        };
        
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => {
    imageObserver.observe(img);
  });

  // Add loading animation to gallery items
  galleryItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 100);
  });

  console.log("Gallery page initialized successfully!");
});
