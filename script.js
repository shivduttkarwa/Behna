// ===== HERO SLIDER (Slide/Fade/Pill Dots) =====
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
      name: "Zari Work Saree",
      price: "₹6,999",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80",
      desc: "Heavy zari work for festive occasions",
    },
    {
      name: "Silk Lehenga",
      price: "₹8,499",
      image:
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
      desc: "Pure silk with intricate embroidery",
    },
    {
      name: "Embroidered Anarkali",
      price: "₹5,299",
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      desc: "Floor-length Anarkali with detailed handwork",
    },
    {
      name: "Velvet Blouse",
      price: "₹2,999",
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=736&q=80",
      desc: "Rich velvet with antique gold embroidery",
    },
  ],
  everyday: [
    {
      name: "Cotton Printed Kurta",
      price: "₹1,299",
      image:
        "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=686&q=80",
      desc: "Comfortable daily wear with traditional prints",
    },
    {
      name: "Linen Palazzos",
      price: "₹1,499",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      desc: "Breathable linen for all-day comfort",
    },
    {
      name: "Chikankari Top",
      price: "₹999",
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      desc: "Delicate Chikankari embroidery on cotton",
    },
    {
      name: "Rayon Dupatta",
      price: "₹799",
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=1972&q=80",
      desc: "Lightweight with subtle prints",
    },
  ],
  wedding: [
    {
      name: "Bridal Red Lehenga",
      price: "₹24,999",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1494&q=80",
      desc: "Hand-embroidered with Swarovski crystals",
    },
    {
      name: "Zardozi Saree",
      price: "₹18,499",
      image:
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
      desc: "Traditional Zardozi work on pure silk",
    },
    {
      name: "Pearl Embroidered Gown",
      price: "₹32,999",
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=736&q=80",
      desc: "Contemporary bridal wear with pearl detailing",
    },
    {
      name: "Bridal Jewelry Set",
      price: "₹12,499",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      desc: "Antique finish temple jewelry set",
    },
  ],
  accessories: [
    {
      name: "Jhumka Earrings",
      price: "₹1,299",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      desc: "Traditional gold-plated jhumkas",
    },
    {
      name: "Silk Potli Bag",
      price: "₹1,499",
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      desc: "Handwoven silk with embroidery",
    },
    {
      name: "Bridal Maang Tikka",
      price: "₹2,999",
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=1972&q=80",
      desc: "Intricately designed with pearls and stones",
    },
    {
      name: "Traditional Mojris",
      price: "₹1,799",
      image:
        "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=686&q=80",
      desc: "Hand-embroidered leather mojris",
    },
  ],
};

// ===== PRODUCT CARD TEMPLATE =====
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

// ===== SLIDER SETUP (ROBUST & MOBILE FRIENDLY) =====
function initSlider(section, productsArr) {
  const slider = document.getElementById(section + "Slider");
  const nav = document.getElementById(section + "Nav");
  if (!slider || !nav) return; // safety check

  let slidesPerView = 1;
  let current = 0;

  function updateSlidesPerView() {
    if (window.innerWidth >= 1024) {
      slidesPerView = 3;
    } else if (window.innerWidth >= 600) {
      slidesPerView = 2;
    } else {
      slidesPerView = 1;
    }
  }

  function getMaxIndex() {
    return Math.max(0, productsArr.length - slidesPerView);
  }

  function renderSlider() {
    slider.innerHTML = "";
    let width = (100 / slidesPerView).toFixed(4) + "%";
    productsArr.forEach((product, i) => {
      slider.innerHTML += `<div class="product-card" style="flex:0 0 ${width};max-width:${width}">${createProductCard(
        product
      )}</div>`;
    });
    slider.style.transform = `translateX(-${current * (100 / slidesPerView)}%)`;
  }

  function renderNav() {
    nav.innerHTML = "";
    let dotCount =
      productsArr.length <= slidesPerView
        ? 1
        : productsArr.length - slidesPerView + 1;
    for (let i = 0; i < dotCount; i++) {
      nav.innerHTML += `<div class="slider-dot${
        i === current ? " active" : ""
      }" data-index="${i}"></div>`;
    }
    nav.querySelectorAll(".slider-dot").forEach((dot) => {
      dot.addEventListener("click", function () {
        current = parseInt(this.dataset.index);
        updateSlider();
      });
    });
  }

  function updateSlider() {
    let maxIdx = getMaxIndex();
    if (current > maxIdx) current = maxIdx;
    if (current < 0) current = 0;
    renderSlider();
    renderNav();
  }

  // Touch swipe for mobile
  let startX = 0,
    isDown = false;
  slider.addEventListener(
    "touchstart",
    (e) => {
      isDown = true;
      startX = e.touches[0].clientX;
    },
    false
  );
  slider.addEventListener(
    "touchmove",
    (e) => {
      if (!isDown) return;
      let moveX = e.touches[0].clientX;
      let diff = startX - moveX;
      if (Math.abs(diff) > 50) {
        let maxIdx = getMaxIndex();
        if (diff > 0 && current < maxIdx) {
          current++;
        } else if (diff < 0 && current > 0) {
          current--;
        }
        updateSlider();
        isDown = false;
      }
    },
    false
  );
  slider.addEventListener("touchend", () => (isDown = false), false);

  function onResize() {
    let prev = slidesPerView;
    updateSlidesPerView();
    if (slidesPerView !== prev) {
      current = 0;
      updateSlider();
    } else {
      let maxIdx = getMaxIndex();
      if (current > maxIdx) {
        current = maxIdx;
        updateSlider();
      }
    }
  }
  window.addEventListener("resize", onResize);

  updateSlidesPerView();
  updateSlider();
}

// ===== INIT ALL SLIDERS =====
document.addEventListener("DOMContentLoaded", function () {
  initSlider("newArrivals", products.newArrivals);
  initSlider("festive", products.festive);
  initSlider("everyday", products.everyday);
  initSlider("wedding", products.wedding);
  initSlider("accessories", products.accessories);
});
