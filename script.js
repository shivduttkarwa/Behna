// ======================== PRELOADER ========================
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
      // Initialize slider after preloader is hidden
      initializeSlider();
    }, 800);
  }, 3000);
});

// ======================== SLIDER VARIABLES ========================
let currentSlideIndex = 0;
let isTransitioning = false;
let autoSlideTimer = null;
let isSliderInitialized = false;

const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const dots = document.querySelectorAll(".nav-dot");

// ======================== SLIDER FUNCTIONS ========================
function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlideIndex);
  });
}

function handleVideoPlayback(activeIndex) {
  slides.forEach((slide, index) => {
    const video = slide.querySelector("video");
    if (!video) return;

    if (index === activeIndex) {
      video.muted = true;
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => console.log("Video autoplay failed:", e));
      }
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });
}

function showSlide(targetIndex) {
  if (
    isTransitioning ||
    targetIndex === currentSlideIndex ||
    !isSliderInitialized
  )
    return;

  const prevIndex = currentSlideIndex;
  isTransitioning = true;
  targetIndex = Math.max(0, Math.min(targetIndex, totalSlides - 1));

  currentSlideIndex = targetIndex;

  // Remove all classes first
  slides.forEach((slide) => {
    slide.classList.remove("active", "prev");
  });

  // Apply new classes with slight delay for smooth transition
  requestAnimationFrame(() => {
    slides[prevIndex].classList.add("prev");
    slides[targetIndex].classList.add("active");
  });

  updateDots();
  handleVideoPlayback(currentSlideIndex);

  // Clean up after transition
  setTimeout(() => {
    slides.forEach((slide, index) => {
      if (index !== currentSlideIndex) {
        slide.classList.remove("active", "prev");
      }
    });
    isTransitioning = false;
  }, 1000);
}

function nextSlide() {
  if (isTransitioning || !isSliderInitialized) return;
  const nextIndex = (currentSlideIndex + 1) % totalSlides;
  showSlide(nextIndex);
  resetAutoSlide();
}

function previousSlide() {
  if (isTransitioning || !isSliderInitialized) return;
  const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
  showSlide(prevIndex);
  resetAutoSlide();
}

function goToSlide(index) {
  if (isTransitioning || index === currentSlideIndex || !isSliderInitialized)
    return;
  showSlide(index);
  resetAutoSlide();
}

// ======================== AUTO SLIDE ========================
function startAutoSlide() {
  if (!isSliderInitialized) return;
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

// ======================== VIDEO CONTROLS ========================
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

// ======================== MOBILE NAVIGATION ========================
function toggleMobileMenu() {
  const toggle = document.querySelector(".mobile-toggle");
  const menu = document.getElementById("mobileMenu");
  const backdrop = document.getElementById("mobileBackdrop");

  toggle.classList.toggle("active");
  menu.classList.toggle("active");
  backdrop.classList.toggle("active");
}

function closeMobileMenu() {
  const toggle = document.querySelector(".mobile-toggle");
  const menu = document.getElementById("mobileMenu");
  const backdrop = document.getElementById("mobileBackdrop");

  toggle.classList.remove("active");
  menu.classList.remove("active");
  backdrop.classList.remove("active");
}

// ======================== EVENT LISTENERS ========================
document
  .querySelectorAll(".mobile-nav-link, .mobile-contact-btn")
  .forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (isTransitioning || !isSliderInitialized) return;

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
    if (isTransitioning || !isSliderInitialized) return;

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

// ======================== INITIALIZATION ========================
function initializeSlider() {
  isSliderInitialized = true;

  // Ensure first slide is active
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === 0);
  });

  updateDots();

  // Initialize videos with better mobile support
  document.querySelectorAll("video").forEach((video) => {
    video.muted = true;
    video.preload = "auto";
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");

    // Handle video load
    video.addEventListener("loadeddata", () => {
      if (video.closest(".slide").classList.contains("active")) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((e) => console.log("Video autoplay failed:", e));
        }
      }
    });
  });

  // Handle first slide video if it exists
  handleVideoPlayback(currentSlideIndex);

  // Start autoplay after initialization
  setTimeout(startAutoSlide, 2000);
}

// Ensure videos are ready on page load
document.addEventListener("DOMContentLoaded", () => {
  // Preload videos
  document.querySelectorAll("video").forEach((video) => {
    video.load();
  });
});
