const lenis = new Lenis({
  autoRaf: true,
});

lenis.on("scroll", (e) => {});

document.addEventListener("DOMContentLoaded", () => {

  gsap.registerPlugin(ScrollTrigger);
  
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
      let scrollThreshold = viewportHeight * 0.5;

      if (currentScroll > lastScrollTop) {
        if (
          currentScroll > scrollThreshold &&
          !header.classList.contains("header--hidden")
        ) {
          header.classList.add("header--hidden");
        }
      } else {
        if (header.classList.contains("header--hidden")) {
          header.classList.remove("header--hidden");
        }
      }

      if (currentScroll > header.offsetHeight && !isHeaderFixed) {
        header.classList.add("header--fixed");
        isHeaderFixed = true;
      } else if (currentScroll <= header.offsetHeight && isHeaderFixed) {
        header.classList.remove("header--fixed");
        isHeaderFixed = false;
      }

      if (currentScroll < 50) {
        header.classList.remove("header--hidden");
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
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
    const baseSpeed = 0.5;

    sliders.forEach((slider) => {
      let images = Array.from(slider.children);
      let imgWidth, totalWidth;
      let isScrolling = false;

      function updateWidths() {
        imgWidth = images[0].offsetWidth + 20;
        totalWidth = imgWidth * images.length;
      }

      updateWidths();

      while (slider.scrollWidth < window.innerWidth * 2) {
        images.forEach((img) => slider.appendChild(img.cloneNode(true)));
        images = Array.from(slider.children);
        updateWidths();
      }

      let position = 0;
      let extraSpeed = 0;
      let direction = 1;
      let speed = baseSpeed;

      function animate() {
        speed = (baseSpeed + extraSpeed) * direction;
        position += speed;

        if (Math.abs(position) >= totalWidth) {
          position = position % totalWidth;
        }

        slider.style.transform = `translateX(${-position}px)`;

        if (!isScrolling) {
          extraSpeed *= 0.95;
          if (Math.abs(extraSpeed) < 0.01) extraSpeed = 0;
        }

        requestAnimationFrame(animate);
      }

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

      window.addEventListener(
        "wheel",
        throttle((event) => {
          isScrolling = true;
          let delta = event.deltaY || -event.wheelDelta;

          direction = delta > 0 ? -1 : 1;

          let acceleration = Math.min(Math.abs(delta) * 0.02, 2);
          extraSpeed = Math.min(extraSpeed + acceleration, 12);

          setTimeout(() => {
            isScrolling = false;
          }, 150);
        }, 50)
      );

      window.addEventListener("resize", () => {
        images = Array.from(slider.children);
        updateWidths();
        position = position % totalWidth;
      });

      slider.style.willChange = "transform";
      slider.style.transition = "none";

      animate();
    });
  }
  velocitySlider();

  function animateBackgrounds() {
    const sections = document.querySelectorAll(".change_background");

    sections.forEach((section, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 50%",
          end: "bottom top",
          scrub: true,
          markers: false,
        },
      });

      tl.to(section, {
        backgroundColor: "rgb(239, 246, 255)",
        duration: 1,
        ease: "linear",
      }).to(section, {
        backgroundColor: "rgb(255, 255, 255)",
        duration: 1,
        ease: "linear",
      });
    });
  }
  animateBackgrounds();

  var swiper = new Swiper(".journal_slider", {
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
});


