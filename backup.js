//========================Slider JavaScript==========================
let currentSlideIndex = 0;
let isTransitioning = false;
let autoSlideTimer = null;

const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const dots = document.querySelectorAll(".nav-dot");
const slideCounter = document.querySelector(".slide-counter .current");

// Update UI elements
function updateSlideCounter() {
  slideCounter.textContent = String(currentSlideIndex + 1).padStart(2, "0");
}

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlideIndex);
  });
}

// Fixed video handling
function handleVideoPlayback(activeIndex) {
  slides.forEach((slide, index) => {
    const video = slide.querySelector("video");
    if (!video) return;

    if (index === activeIndex) {
      video.muted = true;
      video.currentTime = 0;
      video.play().catch(console.log);
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });
}

// Fixed main slide transition function
function showSlide(targetIndex) {
  if (isTransitioning || targetIndex === currentSlideIndex) return;

  const prevIndex = currentSlideIndex;
  isTransitioning = true;
  targetIndex = Math.max(0, Math.min(targetIndex, totalSlides - 1));

  // Update current index immediately
  currentSlideIndex = targetIndex;

  // Remove all transition classes first
  slides.forEach((slide) => {
    slide.classList.remove("active", "prev");
  });

  // Apply new classes
  slides[prevIndex].classList.add("prev");
  slides[targetIndex].classList.add("active");

  // Update UI
  updateSlideCounter();
  updateDots();
  handleVideoPlayback(currentSlideIndex);

  // Clean up after transition completes
  setTimeout(() => {
    slides.forEach((slide, index) => {
      if (index !== currentSlideIndex) {
        slide.classList.remove("active", "prev");
      }
    });
    isTransitioning = false;
  }, 1200); // Match CSS transition duration
}

// Navigation functions
function nextSlide() {
  if (isTransitioning) return;
  const nextIndex = (currentSlideIndex + 1) % totalSlides;
  showSlide(nextIndex);
  resetAutoSlide();
}

function previousSlide() {
  if (isTransitioning) return;
  const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
  showSlide(prevIndex);
  resetAutoSlide();
}

function goToSlide(index) {
  if (isTransitioning || index === currentSlideIndex) return;
  showSlide(index);
  resetAutoSlide();
}

// Auto slide functionality
function startAutoSlide() {
  stopAutoSlide();
  autoSlideTimer = setInterval(() => {
    if (!isTransitioning) {
      nextSlide();
    }
  }, 6000);
}

function stopAutoSlide() {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer);
    autoSlideTimer = null;
  }
}

function resetAutoSlide() {
  stopAutoSlide();
  setTimeout(startAutoSlide, 1000);
}

// Video controls
function toggleVideo(button) {
  const slide = button.closest(".slide");
  const video = slide.querySelector("video");

  if (!video) return;

  if (video.paused) {
    video.play().catch(console.log);
    button.innerHTML = "⏸";
  } else {
    video.pause();
    button.innerHTML = "▶️";
  }
}

// Mobile Navigation
function toggleMobileMenu() {
  const toggle = document.querySelector(".mobile-toggle");
  const menu = document.getElementById("mobileMenu");
  const backdrop = document.getElementById("mobileBackdrop");
  const body = document.body;

  toggle.classList.toggle("active");
  menu.classList.toggle("active");
  backdrop.classList.toggle("active");
  body.classList.toggle("menu-open");
}

function closeMobileMenu() {
  const toggle = document.querySelector(".mobile-toggle");
  const menu = document.getElementById("mobileMenu");
  const backdrop = document.getElementById("mobileBackdrop");
  const body = document.body;

  toggle.classList.remove("active");
  menu.classList.remove("active");
  backdrop.classList.remove("active");
  body.classList.remove("menu-open");
}

// Close mobile menu when clicking on menu items
document
  .querySelectorAll(".mobile-nav-link, .mobile-contact-btn")
  .forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (isTransitioning) return;

  switch (e.key) {
    case "ArrowLeft":
      previousSlide();
      break;
    case "ArrowRight":
      nextSlide();
      break;
    case "Escape":
      closeMobileMenu();
      break;
  }
});

// Touch navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true }
);

document.addEventListener(
  "touchend",
  (e) => {
    if (isTransitioning) return;

    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    }
  },
  { passive: true }
);

// Pause on hover (desktop only)
if (window.innerWidth > 768) {
  const slider = document.querySelector(".hero-slider");
  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Ensure first slide is active
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === 0);
  });

  updateSlideCounter();
  updateDots();

  // Initialize videos
  document.querySelectorAll("video").forEach((video) => {
    video.muted = true;
    video.preload = "auto";
    video.playsInline = true;
  });

  // Start autoplay after a delay
  setTimeout(startAutoSlide, 3000);
});
