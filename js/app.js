// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on("scroll", (e) => {});

document.addEventListener("DOMContentLoaded", () => {
  function offcanvsMenu() {
    const t = document.querySelector(".menu-toggle"),
          m = document.querySelector(".off-canvas-menu-inner"),
          n = document.querySelector(".menu"),
          c = document.querySelector(".cta_main"),
          x = document.querySelector(".menu-close"),
          h = document.querySelector(".header"),
          b = document.querySelector("body");
  
    const moveMenu = () => {
      const w = window.innerWidth <= 768,
            l = document.querySelector(".header_navigations_links");
      if (w) {
        if (!m.contains(n)) m.appendChild(n);
        if (!m.contains(c)) m.appendChild(c);
      } else {
        if (!l.contains(n)) l.appendChild(n);
        if (!l.contains(c)) l.appendChild(c);
      }
    };
  
    window.addEventListener("resize", moveMenu);
    moveMenu();
  
    t.addEventListener("click", () => {
      m.classList.add("active");
      h.classList.add("menu-active");
      b.classList.add("no-scroll");
    });
  
    x.addEventListener("click", () => {
      m.classList.remove("active");
      h.classList.remove("menu-active");
      b.classList.remove("no-scroll");
    });
  
    document.addEventListener("click", (e) => {
      if (!m.contains(e.target) && !t.contains(e.target)) {
        m.classList.remove("active");
        h.classList.remove("menu-active");
        b.classList.remove("no-scroll");
      }
    });
  
    m.querySelectorAll(".header_nav_links").forEach((i) =>
      i.addEventListener("click", () => {
        m.classList.remove("active");
        h.classList.remove("menu-active");
        b.classList.remove("no-scroll");
      })
    );
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

  function velocitySlider() {
    const sliders = document.querySelectorAll(".siteVelocity__slider");
    const baseSpeed = 0.5; // Base speed for control

    sliders.forEach((slider) => {
        let images = Array.from(slider.children);
        let imgWidth, totalWidth;
        let isScrolling = false;

        // Calculate widths
        function updateWidths() {
            imgWidth = images[0].offsetWidth + 20;
            totalWidth = imgWidth * images.length;
        }

        updateWidths();

        // Clone images for seamless loop
        while (slider.scrollWidth < window.innerWidth * 2) {
            images.forEach((img) => slider.appendChild(img.cloneNode(true)));
            images = Array.from(slider.children);
            updateWidths();
        }

        let position = 0;
        let extraSpeed = 0;
        let direction = 1; // 1 for right, -1 for left
        let speed = baseSpeed;

        function animate() {
            speed = (baseSpeed + extraSpeed) * direction;
            position += speed;

            // Seamless wrapping
            if (Math.abs(position) >= totalWidth) {
                position = position % totalWidth;
            }

            slider.style.transform = `translateX(${-position}px)`;

            // Gradual speed decay when not scrolling
            if (!isScrolling) {
                extraSpeed *= 0.95;
                if (Math.abs(extraSpeed) < 0.01) extraSpeed = 0;
            }

            requestAnimationFrame(animate);
        }

        // Throttle wheel events
        function throttle(fn, wait) {
            let lastTime = 0;
            return function (...args) {
                const now = performance.now();
                if (now - lastTime >= wait) {
                    fn.apply(this, args);
                    lastTime = now;
                }
            };
        }

        // Scroll handling
        window.addEventListener(
            "wheel",
            throttle((event) => {
                isScrolling = true;
                let delta = event.deltaY || -event.wheelDelta;

                // Determine direction based on scroll
                direction = delta > 0 ? -1 : 1; // Down scroll: left, Up scroll: right

                // Increase speed based on scroll intensity
                let acceleration = Math.min(Math.abs(delta) * 0.02, 2); // Increased multiplier and cap
                extraSpeed = Math.min(extraSpeed + acceleration, 12); // Higher max speed cap

                // Reset scrolling flag after a short delay
                setTimeout(() => {
                    isScrolling = false;
                }, 150);
            }, 50)
        );

        // Recalculate on resize
        window.addEventListener("resize", () => {
            images = Array.from(slider.children);
            updateWidths();
            position = position % totalWidth;
        });

        // Optimize rendering
        slider.style.willChange = "transform";
        slider.style.transition = "none";

        animate();
    });
}

velocitySlider();
});

var swiper = new Swiper(".journal_slider", {
  // slidesPerView: 3.5,
  spaceBetween: 30,
  breakpoints: {
    320: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2.5,
      spaceBetween: 30,
    },
    1440: {
      slidesPerView: 3.5,
      spaceBetween: 50,
    },
  },
});
