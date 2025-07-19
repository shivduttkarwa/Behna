// jQuery preloader functionality
$(document).ready(function() {
  setTimeout(function() {
    $('#ctn-preloader').addClass('loaded');
    // Una vez haya terminado el preloader aparezca el scroll
    $('body').removeClass('no-scroll-y');

    if ($('#ctn-preloader').hasClass('loaded')) {
      // Es para que una vez que se haya ido el preloader se elimine toda la seccion preloader
      $('#preloader').delay(1000).queue(function() {
        $(this).remove();
      });
    }
  }, 3000);
});

// Enhanced scroll effect with proper logo transformation
let lastScroll = 0;
const scrollThreshold = 10;

window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  const logoMaster = document.querySelector(".logo-master");
  const transformLogo = document.getElementById("transformLogo");
  const scrollPosition = window.scrollY;
  const scrollRatio = Math.min(scrollPosition / scrollThreshold, 1);

  if (scrollPosition > scrollThreshold) {
    header.classList.add("scrolled");

    // Smooth logo transformation
    const topVh = 5 - (5 - 0.2) * scrollRatio;
    const newHeight = 200 - (200 - 80) * scrollRatio;
    const filterValue = 1 - scrollRatio;

    logoMaster.style.top = `${topVh}vh`;
    logoMaster.style.left = "50%";
    logoMaster.style.transform = "translateX(-50%)";
    transformLogo.style.height = `${newHeight}px`;
    transformLogo.style.filter = `brightness(${filterValue}) invert(${filterValue})`;
  } else {
    header.classList.remove("scrolled");

    // Reset logo to hero position
    logoMaster.style.top = "5vh";
    logoMaster.style.left = "50%";
    logoMaster.style.transform = "translateX(-50%)";
    transformLogo.style.height = "200px";
    transformLogo.style.filter = "brightness(0) invert(1)";
  }

  lastScroll = scrollPosition;
});

// Countdown Timer Functionality
function startCountdown() {
  // Set the date we're counting down to (12 days from now)
  const countDownDate = new Date().getTime() + (12 * 24 * 60 * 60 * 1000);
  
  // Update the count down every 1 second
  const timer = setInterval(function() {
    // Get current date and time
    const now = new Date().getTime();
    
    // Find the distance between now and the count down date
    const distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Display the result in the elements
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    
    if (daysElement) daysElement.innerHTML = days.toString().padStart(2, '0');
    if (hoursElement) hoursElement.innerHTML = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.innerHTML = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.innerHTML = seconds.toString().padStart(2, '0');
    
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(timer);
      if (daysElement) daysElement.innerHTML = "00";
      if (hoursElement) hoursElement.innerHTML = "00";
      if (minutesElement) minutesElement.innerHTML = "00";
      if (secondsElement) secondsElement.innerHTML = "00";
    }
  }, 1000);
}

// Start countdown when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Add a small delay to ensure DOM is fully loaded
  setTimeout(startCountdown, 100);
});

// Also start countdown when jQuery is ready (backup)
$(document).ready(function() {
  setTimeout(startCountdown, 100);
});

// Initialize New Arrivals Swiper
document.addEventListener('DOMContentLoaded', function() {
  const newArrivalsSwiper = new Swiper(".new-arrivals-swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 3,
      slideShadows: true
    },
    keyboard: {
      enabled: true
    },
    mousewheel: {
      thresholdDelta: 70
    },
    loop: true,
    pagination: {
      el: ".new-arrivals-swiper .swiper-pagination",
      clickable: true
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 1
      },
      1024: {
        slidesPerView: 2
      },
      1560: {
        slidesPerView: 3
      }
    }
  });
});

// Initialize Swiper for offers
document.addEventListener('DOMContentLoaded', function() {
  const offersSwiper = new Swiper('.offers-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    effect: 'slide',
    speed: 600,
    allowTouchMove: true,
    watchSlidesProgress: false,
    centeredSlides: false,
    slidesPerGroup: 1,
    autoHeight: false,
    resistanceRatio: 0.85,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
    },
  });
  
  // Initialize Swiper for testimonials
  const testimonialsSwiper = new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.testimonials-swiper .swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.testimonials-swiper .swiper-button-next',
      prevEl: '.testimonials-swiper .swiper-button-prev',
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    loop: true,
    effect: 'slide',
    speed: 600,
    allowTouchMove: true,
    autoHeight: false,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
});

// Menu functionality
function openMenu() {
  document.getElementById("menuOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  document.getElementById("menuOverlay").classList.remove("active");
  document.body.style.overflow = "auto";
}

function closeMenuOverlay(event) {
  if (event.target === document.getElementById("menuOverlay")) {
    closeMenu();
  }
}

// Shop categories
function shopCategory(category) {
  alert(`Navigating to ${category} collection...`);
  closeMenu();
}

// Services
function openService(service) {
  alert(`Opening ${service} service...`);
  closeMenu();
}

// Stories and About
function openStories() {
  alert("Opening BEHNA Stories...");
  closeMenu();
}

function openAbout() {
  alert("Opening About BEHNA - Traditional Women's Clothing from Jaipur...");
  closeMenu();
}

function openCraftsmanship() {
  alert("Opening Craftsmanship section - Traditional Jaipur Artistry...");
  closeMenu();
}

function openContact() {
  document.getElementById("contactOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeContact() {
  document.getElementById("contactOverlay").classList.remove("active");
  document.body.style.overflow = "auto";
}

function closeContactOverlay(event) {
  if (event.target === document.getElementById("contactOverlay")) {
    closeContact();
  }
}

// Search functionality
function openSearch() {
  document.getElementById("searchOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    document.getElementById("searchInput").focus();
  }, 400);
}

function closeSearch() {
  document.getElementById("searchOverlay").classList.remove("active");
  document.body.style.overflow = "auto";
  document.getElementById("searchInput").value = "";
  document.getElementById("searchResults").innerHTML = "";
}

function closeSearchOverlay(event) {
  if (event.target === document.getElementById("searchOverlay")) {
    closeSearch();
  }
}

// Search data
const searchData = [
  {
    category: "Suits & Kurtis",
    title: "Embroidered Silk Suit",
    type: "product",
  },
  {
    category: "Suits & Kurtis",
    title: "Cotton Kurti with Mirror Work",
    type: "product",
  },
  {
    category: "Suits & Kurtis",
    title: "Bandhani Print Suit",
    type: "product",
  },
  {
    category: "Suits & Kurtis",
    title: "Palazzo Suit Set",
    type: "product",
  },
  { category: "Sarees", title: "Banarasi Silk Saree", type: "product" },
  {
    category: "Sarees",
    title: "Georgette Saree with Blouse",
    type: "product",
  },
  {
    category: "Sarees",
    title: "Rajasthani Bandhani Saree",
    type: "product",
  },
  { category: "Sarees", title: "Chiffon Saree", type: "product" },
  { category: "Cord Sets", title: "Printed Cord Set", type: "product" },
  { category: "Cord Sets", title: "Embroidered Cord Set", type: "product" },
  { category: "Cord Sets", title: "Cotton Cord Set", type: "product" },
  { category: "Cord Sets", title: "Designer Cord Set", type: "product" },
  { category: "Accessories", title: "Jhumka Earrings", type: "product" },
  { category: "Accessories", title: "Kundan Necklace", type: "product" },
  {
    category: "Accessories",
    title: "Embroidered Clutch",
    type: "product",
  },
  { category: "Accessories", title: "Silver Bangles", type: "product" },
  { category: "Collections", title: "Festive Wear", type: "collection" },
  {
    category: "Collections",
    title: "Bridal Collection",
    type: "collection",
  },
  { category: "Collections", title: "Casual Wear", type: "collection" },
  {
    category: "Collections",
    title: "Traditional Wear",
    type: "collection",
  },
];

function handleSearch() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const searchResults = document.getElementById("searchResults");

  if (searchInput.trim() === "") {
    searchResults.innerHTML = "";
    return;
  }

  const filteredResults = searchData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchInput) ||
      item.category.toLowerCase().includes(searchInput)
  );

  if (filteredResults.length === 0) {
    searchResults.innerHTML =
      '<div class="search-no-results">No results found</div>';
    return;
  }

  const resultsHTML = filteredResults
    .map(
      (item) => `
          <div class="search-result-item" onclick="selectSearchResult('${item.category}', '${item.title}')">
            <div class="search-result-category">${item.category}</div>
            <div class="search-result-title">${item.title}</div>
          </div>
        `
    )
    .join("");

  searchResults.innerHTML = resultsHTML;
}

function selectSearchResult(category, title) {
  alert(`Selected: ${title} from ${category}`);
  closeSearch();
}

// Product view handling
function viewProduct(productId) {
  // You can enhance this function to show a modal or navigate to product page
  console.log(`Viewing product: ${productId}`);
  // Example implementation:
  // window.location.href = `/product/${productId}`;
}

// Preloader functionality
window.addEventListener("load", function () {
  const preloader = document.getElementById("pre-load");

  // Hide preloader after a minimum time to show animation
  setTimeout(() => {
    preloader.classList.add("fade-out");

    // Remove preloader from DOM after fade animation
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }, 2000); // Show preloader for minimum 2 seconds
});

// Newsletter subscription functionality
function subscribeNewsletter() {
  const emailInput = document.getElementById("newsletterEmail");
  const email = emailInput.value.trim();

  if (email === "") {
    alert("Please enter your email address");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Simulate newsletter subscription
  alert(
    `Thank you for subscribing to BEHNA Stories! We'll send you the latest updates at ${email}`
  );
  emailInput.value = "";
}

// Footer newsletter subscription functionality
function subscribeFooterNewsletter() {
  const emailInput = document.getElementById("footerNewsletterEmail");
  const email = emailInput.value.trim();

  if (email === "") {
    alert("Please enter your email address");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Simulate newsletter subscription
  alert(
    `Thank you for subscribing to BEHNA updates! We'll send you the latest collections at ${email}`
  );
  emailInput.value = "";
}

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Prevent menu close on content click
document.querySelector(".menu-content").addEventListener("click", (e) => {
  e.stopPropagation();
});

// Escape key to close menu
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMenu();
  }
});

// CD Slider with Controls and Hover Pause
(function () {
  function init(item) {
    var items = item.querySelectorAll("li"),
      current = 0,
      autoPlayInterval,
      isPlaying = true;

    // Create control buttons
    var prevBtn = item.querySelector(".prev-btn");
    var nextBtn = item.querySelector(".next-btn");

    items[current].className = "current";
    if (items.length > 1) items[items.length - 1].className = "prev_slide";

    var navigate = function (dir) {
      items[current].className = "";

      if (dir === "right") {
        current = current < items.length - 1 ? current + 1 : 0;
      } else {
        current = current > 0 ? current - 1 : items.length - 1;
      }

      var nextCurrent = current < items.length - 1 ? current + 1 : 0,
        prevCurrent = current > 0 ? current - 1 : items.length - 1;

      items[current].className = "current";
      items[prevCurrent].className = "prev_slide";
      items[nextCurrent].className = "";
    };

    // Auto-play functions
    var startAutoPlay = function () {
      if (isPlaying) {
        autoPlayInterval = setInterval(function () {
          navigate("right");
        }, 4000);
      }
    };

    var stopAutoPlay = function () {
      clearInterval(autoPlayInterval);
    };

    // Control button events
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        navigate("left");
        stopAutoPlay();
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        navigate("right");
        stopAutoPlay();
        startAutoPlay();
      });
    }

    // Hover to pause
    item.addEventListener("mouseenter", function () {
      isPlaying = false;
      stopAutoPlay();
    });

    item.addEventListener("mouseleave", function () {
      isPlaying = true;
      startAutoPlay();
    });

    // Keyboard navigation
    document.addEventListener("keydown", function (ev) {
      var keyCode = ev.keyCode || ev.which;
      switch (keyCode) {
        case 37:
          navigate("left");
          stopAutoPlay();
          startAutoPlay();
          break;
        case 39:
          navigate("right");
          stopAutoPlay();
          startAutoPlay();
          break;
      }
    });

    // Swipe navigation
    item.addEventListener("touchstart", handleTouchStart, false);
    item.addEventListener("touchmove", handleTouchMove, false);
    var xDown = null;
    var yDown = null;

    function handleTouchStart(evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
    }

    function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          navigate("right");
        } else {
          navigate("left");
        }
        stopAutoPlay();
        startAutoPlay();
      }
      xDown = null;
      yDown = null;
    }

    // Start auto-play
    startAutoPlay();
  }

  // Initialize when DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    [].slice
      .call(document.querySelectorAll(".cd-slider"))
      .forEach(function (item) {
        init(item);
      });
  });
})();

// Initialize product sliders with mobile support
function initProductSliders() {
  const sliders = document.querySelectorAll(".product-slider");

  sliders.forEach((slider) => {
    const track = slider.querySelector(".slider-track");
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");

    // Responsive card width calculation
    const getCardWidth = () => {
      return window.innerWidth <= 480
        ? 240
        : window.innerWidth <= 768
        ? 280
        : 300;
    };

    let cardWidth = getCardWidth() + 32; // card width + gap
    let scrollPosition = 0;

    function updateSliderButtons() {
      prevBtn.style.opacity = scrollPosition <= 0 ? "0.5" : "1";
      nextBtn.style.opacity =
        scrollPosition >= track.scrollWidth - track.clientWidth ? "0.5" : "1";

      // Disable buttons if there's not enough content to scroll
      if (track.scrollWidth <= track.clientWidth) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "flex";
        nextBtn.style.display = "flex";
      }
    }

    prevBtn.addEventListener("click", () => {
      cardWidth = getCardWidth() + 32; // Update card width on click
      scrollPosition = Math.max(scrollPosition - cardWidth, 0);
      track.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      updateSliderButtons();
    });

    nextBtn.addEventListener("click", () => {
      cardWidth = getCardWidth() + 32; // Update card width on click
      scrollPosition = Math.min(
        scrollPosition + cardWidth,
        track.scrollWidth - track.clientWidth
      );
      track.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      updateSliderButtons();
    });

    // Handle touch events for mobile
    let startX,
      isDragging = false;

    track.addEventListener("touchstart", (e) => {
      isDragging = true;
      startX = e.touches[0].pageX - track.offsetLeft;
      scrollPosition = track.scrollLeft;
    });

    track.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.touches[0].pageX - track.offsetLeft;
      const walk = (x - startX) * 2;
      track.scrollLeft = scrollPosition - walk;
    });

    track.addEventListener("touchend", () => {
      isDragging = false;
    });

    // Update buttons on scroll
    track.addEventListener("scroll", () => {
      scrollPosition = track.scrollLeft;
      updateSliderButtons();
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      cardWidth = getCardWidth() + 32;
      updateSliderButtons();
    });

    // Initial button state
    updateSliderButtons();
  });
}

// Initialize product sliders when DOM is loaded
document.addEventListener("DOMContentLoaded", initProductSliders);

// Counter Animation for About Stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      // Format number with + for all except years
      const label = counter.nextElementSibling.textContent;
      if (label.includes('Years')) {
        counter.textContent = Math.floor(current);
      } else {
        counter.textContent = Math.floor(current) + '+';
      }
    }, 16);
  });
}

// Intersection Observer for About Stats Animation
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Start observing when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const statsSection = document.querySelector('.about-stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
});

// Scroll to Top Functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Show/Hide Back to Top Button
window.addEventListener('scroll', () => {
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  }
});

