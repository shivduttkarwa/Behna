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
