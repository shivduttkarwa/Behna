// ── Collections page — Swiper & smooth scroll ──

const collSwiperConfig = {
  spaceBetween: 16,
  loop: false,
  speed: 700,
  grabCursor: true,
  autoplay: { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true },
  pagination: { clickable: true },
  navigation: false,
  breakpoints: {
    480:  { slidesPerView: 2, spaceBetween: 16 },
    768:  { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 24 },
    1440: { slidesPerView: 4, spaceBetween: 24 },
  },
};

document.addEventListener('DOMContentLoaded', function () {
  new Swiper('.suits-swiper',    { ...collSwiperConfig, slidesPerView: 1, pagination: { el: '.suits-pagination',    clickable: true }, navigation: { prevEl: '.suits-prev',    nextEl: '.suits-next' } });
  new Swiper('.kurtis-swiper',   { ...collSwiperConfig, slidesPerView: 1, pagination: { el: '.kurtis-pagination',   clickable: true }, navigation: { prevEl: '.kurtis-prev',   nextEl: '.kurtis-next' } });
  new Swiper('.anarkali-swiper', { ...collSwiperConfig, slidesPerView: 1, pagination: { el: '.anarkali-pagination', clickable: true }, navigation: { prevEl: '.anarkali-prev', nextEl: '.anarkali-next' } });
  new Swiper('.coords-swiper',   { ...collSwiperConfig, slidesPerView: 1, pagination: { el: '.coords-pagination',   clickable: true }, navigation: { prevEl: '.coords-prev',   nextEl: '.coords-next' } });
  new Swiper('.festival-swiper', { ...collSwiperConfig, slidesPerView: 1, pagination: { el: '.festival-pagination', clickable: true }, navigation: { prevEl: '.festival-prev', nextEl: '.festival-next' } });
});

// Smooth scroll for hero nav links
document.querySelectorAll('.coll-hero-nav a').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    closeMenu();
  });
});
