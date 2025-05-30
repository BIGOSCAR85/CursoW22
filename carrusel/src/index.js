/*- Desarrolla un carrusel de imágenes que permita a los usuarios navegar entre diferentes imágenes.*/
// index.js

document.addEventListener("DOMContentLoaded", () => {
  // 🔀 Toggle menú hamburguesa
  let toggleBtn = document.getElementById("menu-toggle");
  let mobileMenu = document.getElementById("mobile-menu");

  toggleBtn.addEventListener("click", () => {
    let isHidden = mobileMenu.classList.toggle("hidden");
    toggleBtn.setAttribute("aria-expanded", !isHidden);
  });

  // 🎠 Carousel
  let items = document.querySelectorAll('[id^="carousel-item-"]');
  let indicators = document.querySelectorAll('[id^="carousel-indicator-"]');
  let carouselContainer = document.getElementById("carousel-example");

  let current = 0;
  let intervalId;

  // 🖼️ Mostrar imagen actual
  function showItem(index) {
    items.forEach((item, i) => {
      item.classList.toggle("opacity-100", i === index);
      item.classList.toggle("opacity-0", i !== index);
      item.classList.toggle("pointer-events-none", i !== index);
    });
    updateIndicators(index);
  }

  // 🔘 Actualizar indicadores
  function updateIndicators(index) {
    indicators.forEach((btn, i) => {
      btn.classList.add("bg-white", "transition-opacity", "duration-300");
      btn.classList.toggle("opacity-100", i === index);
      btn.classList.toggle("opacity-40", i !== index);
      btn.setAttribute("aria-current", i === index ? "true" : "false");
    });
  }

  // ▶️ Botón siguiente
  document.getElementById("data-carousel-next").addEventListener("click", () => {
    current = (current + 1) % items.length;
    showItem(current);
  });

  // ◀️ Botón anterior
  document.getElementById("data-carousel-prev").addEventListener("click", () => {
    current = (current - 1 + items.length) % items.length;
    showItem(current);
  });

  // 👆 Click en indicadores
  indicators.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      current = index;
      showItem(current);
    });
  });

  // 🔁 Auto-rotación
  function startCarousel() {
    intervalId = setInterval(() => {
      current = (current + 1) % items.length;
      showItem(current);
    }, 5000);
  }

  function stopCarousel() {
    clearInterval(intervalId);
  }

  // 🛑 Pausar rotación al pasar el mouse
  carouselContainer.addEventListener("mouseenter", stopCarousel);
  carouselContainer.addEventListener("mouseleave", startCarousel);

  // 🚀 Inicializar
  showItem(current);
  startCarousel();
});