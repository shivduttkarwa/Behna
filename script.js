// Initialize Swiper Hero Slider
var mainSlider = new Swiper(".mySwiper2", {
  parallax: true,
  speed: 1200,
  effect: "slide",
  direction: "vertical",
  autoplay: true,
  navigation: {
    nextEl: ".upk-button-next",
    prevEl: ".upk-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' +
        className +
        ' swiper-pagination-bullet--svg-animation"><svg width="28" height="28" viewBox="0 0 28 28"><circle class="svg__circle" cx="14" cy="14" r="10" fill="none" stroke-width="2"></circle><circle class="svg__circle-inner" cx="14" cy="14" r="2" stroke-width="3"></circle></svg></span>'
      );
    },
  },
});

// Mobile Navigation
function toggleMobileNav() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileOverlay = document.querySelector(".mobile-overlay");

  mobileMenuBtn.classList.toggle("active");
  mobileNav.classList.toggle("active");
  mobileOverlay.classList.toggle("active");

  if (mobileNav.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

function closeMobileNav() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileOverlay = document.querySelector(".mobile-overlay");

  mobileMenuBtn.classList.remove("active");
  mobileNav.classList.remove("active");
  mobileOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe sections for fade-in animations
document.querySelectorAll(".fade-in").forEach((section) => {
  observer.observe(section);
});

// Color dot selection
document.querySelectorAll(".color-dot").forEach((dot) => {
  dot.addEventListener("click", function () {
    this.parentElement.querySelectorAll(".color-dot").forEach((d) => {
      d.style.border = "2px solid #ddd";
    });
    this.style.border = "2px solid #000";
  });
});

// Smooth scrolling for anchor links
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

// Form submission
document
  .querySelector(".contact-form form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Simple form validation and submission
    const formData = new FormData(this);
    const submitBtn = this.querySelector(".submit-btn");

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      submitBtn.textContent = "Message Sent!";
      submitBtn.style.background = "#28a745";

      setTimeout(() => {
        this.reset();
        submitBtn.textContent = "Send Message";
        submitBtn.style.background = "#000";
        submitBtn.disabled = false;
      }, 2000);
    }, 1500);
  });

// Scroll to top functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Show/hide scroll to top button
window.addEventListener("scroll", () => {
  const scrollTop = document.querySelector(".scroll-top");
  if (window.scrollY > 500) {
    scrollTop.classList.add("visible");
  } else {
    scrollTop.classList.remove("visible");
  }
});

// CTA Button hover animation
document.querySelector(".cta-btn").addEventListener("mouseenter", function () {
  gsap.to(this, {
    scale: 1.05,
    duration: 0.2,
    ease: "power2.out",
  });
});

document.querySelector(".cta-btn").addEventListener("mouseleave", function () {
  gsap.to(this, {
    scale: 1,
    duration: 0.2,
    ease: "power2.out",
  });
});

// Product card animations
document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    gsap.to(this, {
      y: -10,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", function () {
    gsap.to(this, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});
