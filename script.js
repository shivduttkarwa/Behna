// ====== HERO SLIDER (auto & dots) ======
const heroSlides = document.querySelectorAll(".main-hero-slide");
const heroDots = document.getElementById("mainHeroDots");
let heroCurrent = 0,
  heroTimer = null,
  heroPrev = 0;

function showHeroSlide(idx) {
  if (idx === heroCurrent) return;
  heroSlides.forEach((slide, i) => {
    slide.classList.remove("active", "out-left", "out-right");
    if (heroDots.children[i]) heroDots.children[i].classList.remove("active");
  });
  let outClass = idx > heroCurrent ? "out-left" : "out-right";
  heroSlides[heroCurrent].classList.add(outClass);
  heroSlides[idx].classList.add("active");
  if (heroDots.children[idx]) heroDots.children[idx].classList.add("active");
  heroPrev = heroCurrent;
  heroCurrent = idx;
}
function nextHeroSlide() {
  showHeroSlide((heroCurrent + 1) % heroSlides.length);
}
function startHeroTimer() {
  heroTimer = setInterval(nextHeroSlide, 4700);
}
function resetHeroTimer() {
  clearInterval(heroTimer);
  startHeroTimer();
}
if (heroDots) {
  heroSlides.forEach((_, i) => {
    let dot = document.createElement("div");
    dot.className = "main-hero-dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => {
      showHeroSlide(i);
      resetHeroTimer();
    });
    heroDots.appendChild(dot);
  });
}
startHeroTimer();

// ===== HAMBURGER MOBILE NAV =====
document.querySelector(".menu-toggle").addEventListener("click", function () {
  this.classList.toggle("active");
  document.querySelector(".nav-links").classList.toggle("active");
});
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelector(".nav-links").classList.remove("active");
    document.querySelector(".menu-toggle").classList.remove("active");
  });
});

// ===== PRODUCT DATA =====
const products = {
  newArrivals: [
    {
      name: "Banarasi Silk Saree",
      price: "₹4,999",
      image:
        "https://images.unsplash.com/photo-1571875257727-256c39da42af?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
      desc: "Handwoven pure silk with intricate zari work",
    },
    {
      name: "Kalamkari Kurta Set",
      price: "₹2,499",
      image:
        "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      desc: "Organic cotton with traditional Kalamkari prints",
    },
    {
      name: "Chanderi Dupatta",
      price: "₹1,299",
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=1972&q=80",
      desc: "Lightweight Chanderi silk with golden borders",
    },
    {
      name: "Cotton Printed Suit",
      price: "₹3,299",
      image:
        "https://images.unsplash.com/photo-1595341595379-cf1cd0fb7fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      desc: "Breathable cotton with traditional block prints",
    },
  ],
  festive: [
    {
      name: "Zari Work Suit",
      price: "₹6,999",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80",
      desc: "Elegant suit with festive zari detailing",
    },
    {
      name: "Silk Anarkali",
      price: "₹8,499",
      image:
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
      desc: "Luxurious silk anarkali for celebrations",
    },
    {
      name: "Chikankari Kurti",
      price: "₹2,299",
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      desc: "Traditional hand-embroidered chikankari kurti",
    },
    {
      name: "Block Print Kurti",
      price: "₹1,499",
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=736&q=80",
      desc: "Soft cotton, vibrant block print",
    },
  ],
  everyday: [
    {
      name: "Cotton Saree",
      price: "₹1,299",
      image:
        "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=686&q=80",
      desc: "Easy-care cotton for daily wear",
    },
    {
      name: "Handloom Linen Saree",
      price: "₹2,799",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      desc: "Breezy linen, perfect for summer",
    },
    {
      name: "Printed Silk Saree",
      price: "₹3,199",
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      desc: "Lightweight silk with fresh prints",
    },
    {
      name: "Rayon Saree",
      price: "₹1,899",
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=1972&q=80",
      desc: "Comfort meets style for every day",
    },
  ],
  wedding: [
    {
      name: "Embroidered Cord Set",
      price: "₹3,599",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1494&q=80",
      desc: "Two-piece set, stunning embroidery",
    },
    {
      name: "Georgette Co-ord",
      price: "₹2,499",
      image:
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
      desc: "Soft georgette, all-day comfort",
    },
    {
      name: "Festive Cord Set",
      price: "₹2,999",
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=736&q=80",
      desc: "Festive colors, tailored for a flawless fit",
    },
    {
      name: "Printed Cord Set",
      price: "₹1,899",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      desc: "Bright prints, relaxed silhouette",
    },
  ],
  accessories: [
    {
      name: "Jhumka Earrings",
      price: "₹1,299",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      desc: "Gold-plated, handcrafted",
    },
    {
      name: "Silk Potli Bag",
      price: "₹1,499",
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      desc: "Handwoven silk, beautiful embroidery",
    },
    {
      name: "Maang Tikka",
      price: "₹2,999",
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=1972&q=80",
      desc: "Pearls & stones, festive perfect",
    },
    {
      name: "Stole & Dupatta",
      price: "₹1,299",
      image:
        "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=686&q=80",
      desc: "Softest cotton, elegant design",
    },
  ],
};

function createProductCard(product) {
  return `
    <div class="product-card">
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image">
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price}</div>
        <div class="product-desc">${product.desc}</div>
        <button class="product-btn">View Details</button>
      </div>
    </div>
  `;
}

// ==== BULLETPROOF SLIDER LOGIC ====
function initSlider(section, productsArr) {
  const track = document.getElementById(section + "Slider");
  const nav = document.getElementById(section + "Nav");
  if (!track || !nav) return;

  let slidesPerView = 1;
  let current = 0;

  function updateSlidesPerView() {
    if (window.innerWidth >= 1024) slidesPerView = 3;
    else if (window.innerWidth >= 600) slidesPerView = 2;
    else slidesPerView = 1;
  }

  // Build slides ONCE
  function buildSlides() {
    track.innerHTML = "";
    productsArr.forEach((product) => {
      track.innerHTML += createProductCard(product);
    });
    track.style.display = "flex";
    track.style.transition = "transform 0.4s cubic-bezier(.67,.12,.44,1.04)";
    track.style.willChange = "transform";
    // Initial card widths
    setCardWidths();
  }

  function setCardWidths() {
    let widthPct = 100 / slidesPerView;
    Array.from(track.children).forEach((card) => {
      card.style.flex = `0 0 ${widthPct}%`;
      card.style.maxWidth = `${widthPct}%`;
    });
  }

  function updateTrack() {
    let slideWidth = track.offsetWidth / slidesPerView;
    let move = current * slideWidth;
    track.style.transform = `translateX(-${move}px)`;
  }

  function renderNav() {
    nav.innerHTML = "";
    let dotCount = Math.max(1, productsArr.length - slidesPerView + 1);
    for (let i = 0; i < dotCount; i++) {
      nav.innerHTML += `<div class="slider-dot${
        i === current ? " active" : ""
      }" data-index="${i}"></div>`;
    }
    nav.querySelectorAll(".slider-dot").forEach((dot) => {
      dot.addEventListener("click", function () {
        current = parseInt(this.dataset.index);
        update();
      });
    });
  }

  function clampCurrent() {
    let maxIdx = Math.max(0, productsArr.length - slidesPerView);
    if (current > maxIdx) current = maxIdx;
    if (current < 0) current = 0;
  }

  function update() {
    clampCurrent();
    setCardWidths();
    updateTrack();
    renderNav();
  }

  // Touch/drag swipe support (never gets lost)
  let startX = 0,
    isDragging = false;

  track.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    isDragging = true;
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    let diff = startX - e.touches[0].clientX;
    if (Math.abs(diff) > 40) {
      let maxIdx = Math.max(0, productsArr.length - slidesPerView);
      if (diff > 0 && current < maxIdx) {
        current++;
        update();
        isDragging = false;
      } else if (diff < 0 && current > 0) {
        current--;
        update();
        isDragging = false;
      }
    }
  });

  track.addEventListener("touchend", () => (isDragging = false));

  // Responsive: adjust slidesPerView and reset widths
  function resizeHandler() {
    let oldSlidesPerView = slidesPerView;
    updateSlidesPerView();
    setCardWidths();
    if (slidesPerView !== oldSlidesPerView) current = 0;
    update();
  }

  // Initial setup
  updateSlidesPerView();
  buildSlides();
  update();
  window.addEventListener("resize", resizeHandler);
}

// ==== INIT ALL SLIDERS (MATCHES SECTION IDS) ====
document.addEventListener("DOMContentLoaded", function () {
  initSlider("newArrivals", products.newArrivals);
  initSlider("festive", products.festive);
  initSlider("everyday", products.everyday);
  initSlider("wedding", products.wedding);
  initSlider("accessories", products.accessories);
});
