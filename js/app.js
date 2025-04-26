// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on("scroll", (e) => {});

document.addEventListener("DOMContentLoaded", () => {
  function offcanvsMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const offCanvasMenu = document.querySelector(".off-canvas-menu");
    const menu = document.querySelector(".menu");
    const ctaMain = document.querySelector(".cta_main");
    const menuClose = document.querySelector(".menu-close");
    const header = document.querySelector(".header");

    window.addEventListener("resize", () => {
      moveMenuAndCtaToOffCanvas();
    });

    function moveMenuAndCtaToOffCanvas() {
      if (window.innerWidth <= 768) {
        if (!offCanvasMenu.contains(menu)) {
          offCanvasMenu.appendChild(menu);
        }
        if (!offCanvasMenu.contains(ctaMain)) {
          offCanvasMenu.appendChild(ctaMain);
        }
      } else {
        const headerNavigationsLinks = document.querySelector(
          ".header_navigations_links"
        );
        if (!headerNavigationsLinks.contains(menu)) {
          headerNavigationsLinks.appendChild(menu);
        }
        if (!headerNavigationsLinks.contains(ctaMain)) {
          headerNavigationsLinks.appendChild(ctaMain);
        }
      }
    }

    moveMenuAndCtaToOffCanvas();

    menuToggle.addEventListener("click", () => {
      offCanvasMenu.classList.add("active");
      header.classList.add("menu-active");
    });

    menuClose.addEventListener("click", () => {
      offCanvasMenu.classList.remove("active");
      header.classList.remove("menu-active");
    });

    document.addEventListener("click", (e) => {
      if (!offCanvasMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        offCanvasMenu.classList.remove("active");
        header.classList.remove("menu-active");
      }
    });

    const menuItems = offCanvasMenu.querySelectorAll(".header_nav_links");
    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        offCanvasMenu.classList.remove("active");
        header.classList.remove("menu-active");
      });
    });
  }
  offcanvsMenu();

  function stickyScroll() {
    let lastScrollTop = 50;
    let header = document.querySelector(".header");
    let isHeaderFixed = false;

    window.addEventListener("scroll", () => {
      let currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      let viewportHeight = window.innerHeight;
      let scrollThreshold = viewportHeight * 0.5; // 50% of viewport height

      // Determine scroll direction
      if (currentScroll > lastScrollTop) {
        // Scrolling down
        if (
          currentScroll > scrollThreshold &&
          !header.classList.contains("header--hidden")
        ) {
          header.classList.add("header--hidden");
        }
      } else {
        // Scrolling up
        if (header.classList.contains("header--hidden")) {
          header.classList.remove("header--hidden");
        }
      }

      // Fix header when scrolling past its height
      if (currentScroll > header.offsetHeight && !isHeaderFixed) {
        header.classList.add("header--fixed");
        isHeaderFixed = true;
      } else if (currentScroll <= header.offsetHeight && isHeaderFixed) {
        header.classList.remove("header--fixed");
        isHeaderFixed = false;
      }

      // Show header when near the top
      if (currentScroll < 50) {
        header.classList.remove("header--hidden");
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll
    });
  }
  stickyScroll();

  function customParallax() {
    const parallaxElements = document.querySelectorAll(".parallax");

    new simpleParallax(parallaxElements, {
      scale: 1.2,
      delay: 0.2,
      transition: "cubic-bezier(0,0,0,1)",
      orientation: "up",
    });
  }
  customParallax();
});

var swiper = new Swiper(".journal_slider", {
  slidesPerView: 3.5,
  spaceBetween: 30,
  centeredSlides: true,
});
