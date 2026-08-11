function initializeNavigation() {
  const menuButton = document.querySelector(".menu-button");
  const navigation = document.querySelector(".site-nav");

  if (!menuButton || !navigation) return;

  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    navigation.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function initializeCurrentYear() {
  document.querySelectorAll("[data-current-year]").forEach((year) => {
    year.textContent = new Date().getFullYear();
  });
}

function initializeOfficeGallery() {
  const stage = document.querySelector(".office-gallery-stage");
  const slides = Array.from(document.querySelectorAll("[data-office-slide]"));
  const dots = Array.from(document.querySelectorAll("[data-office-slide-index]"));
  const previousButton = document.querySelector(".office-gallery-previous");
  const nextButton = document.querySelector(".office-gallery-next");
  const position = document.querySelector(".office-gallery-position");

  if (!stage || !slides.length || !previousButton || !nextButton || !position) return;

  let currentSlide = 0;
  let touchStartX = 0;

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== currentSlide;
    });

    dots.forEach((dot, dotIndex) => {
      dot.setAttribute("aria-current", String(dotIndex === currentSlide));
    });

    position.textContent = `${currentSlide + 1} / ${slides.length}`;
  };

  previousButton.addEventListener("click", () => showSlide(currentSlide - 1));
  nextButton.addEventListener("click", () => showSlide(currentSlide + 1));

  dots.forEach((dot) => {
    dot.addEventListener("click", () => showSlide(Number(dot.dataset.officeSlideIndex)));
  });

  stage.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(currentSlide + (event.key === "ArrowRight" ? 1 : -1));
    }
  });

  stage.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true },
  );

  stage.addEventListener(
    "touchend",
    (event) => {
      const swipeDistance = event.changedTouches[0].clientX - touchStartX;

      if (Math.abs(swipeDistance) >= 50) {
        showSlide(currentSlide + (swipeDistance < 0 ? 1 : -1));
      }
    },
    { passive: true },
  );

  stage.dataset.galleryReady = "true";
}

function initializeSite() {
  initializeNavigation();
  initializeCurrentYear();
  initializeOfficeGallery();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSite, { once: true });
} else {
  initializeSite();
}
