const lenis = new Lenis({
  autoRaf: true,
});

lenis.on("scroll", (e) => {});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  /*

This is function is handling the offcanvas menu
It will move the menu to the offcanvas menu when the screen is less than 820px

*/

  function offcanvsMenu() {
    const t = document.querySelector(".menu-toggle"),
      m = document.querySelector(".off-canvas-menu-inner"),
      n = document.querySelector(".menu"),
      c = document.querySelector(".cta_main"),
      x = document.querySelector(".menu-close"),
      h = document.querySelector(".header"),
      b = document.querySelector("body");

    const moveMenu = () => {
      const w = window.innerWidth <= 991,
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

  /*

This is function is handling the sticky header
It will add a class to the header when the user scrolls down
It will remove the class when the user scrolls up

*/

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

  /*

This is function is handling the parallax effect
It will add a parallax effect to the elements with the class "parallax"

*/

  function customParallax() {
    const parallaxElements = document.querySelectorAll(".parallax");

    new simpleParallax(parallaxElements, {
      scale: 1.2,
      delay: 0.2,
      transition: "cubic-bezier(0,0,0,02)",
      orientation: "up",
    });
  }
  customParallax();

  /*


This function is handling the velocity slider
which will work on scroll


*/

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
          start: "top 60%",
          end: "bottom 70%",
          scrub: true,
          markers: false,
        },
      });

      tl.to(section, {
        backgroundColor: "rgb(249, 245, 237)",
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

  /*
This is function is for the text animation
Line by Line Staggering the text with custom ease


*/

  function textAnimation() {
    const SplittingTextConfig = {
      selector: "h1, h2, p, span",
      type: "words,lines",
      linesClass: "line",
      duration: 0.5,
      yPercent: 100,
      opacity: 0,
      stagger: 0.1,
      ease: "cubic-bezier(0.77, 0, 0.175, 1)",
      start: "top 95%",
    };

    document.fonts.ready.then(() => {
      const elements = document.querySelectorAll(SplittingTextConfig.selector);

      if (elements.length === 0) {
        console.warn("No elements found for SplitText animation");
        return;
      }

      elements.forEach((element) => {
        element.style.opacity = "1";

        const split = new SplitText(element, {
          type: SplittingTextConfig.type,
          linesClass: SplittingTextConfig.linesClass,
        });

        const animation = gsap.timeline({ paused: true });
        split.lines.forEach((line, index) => {
          const wordsInLine = line.querySelectorAll("div"); // Select word divs inside the line
          animation.from(
            wordsInLine,
            {
              duration: SplittingTextConfig.duration,
              yPercent: SplittingTextConfig.yPercent,
              opacity: SplittingTextConfig.opacity,
              ease: SplittingTextConfig.ease,
            },
            index * SplittingTextConfig.stagger
          );
        });

        ScrollTrigger.create({
          trigger: element,
          scroller: document.body,
          start: SplittingTextConfig.start,
          animation: animation,
          toggleActions: "play none none reverse",
          // markers: true,
        });
      });
    });
  }
  textAnimation();

  /*

This function is handling the border animation
It will animate the borders of the elements with the class "border-animate"
when they come into view using GSAP and ScrollTrigger


*/

  function animateOnView() {
    // Select all border-animate spans
    const borders = document.querySelectorAll(".border-animate");

    // Animate each border as it comes into view
    borders.forEach((border) => {
      gsap.to(border, {
        width: "100%", // Animate width from 0% to 100%
        duration: 1, // Animation duration in seconds
        ease: "power2.out", // Smooth easing
        scrollTrigger: {
          trigger: border, // Trigger animation when the border span enters the viewport
          start: "top 80%", // Start animation when the top of the border is 80% from the top of the viewport
          toggleActions: "play none none none", // Play animation on enter, no reverse on leave
        },
      });
    });
  }
  animateOnView();

  function asideNavigationSys() {
    // Function to remove active class from all links and sections
    function clearActiveClasses() {
      document.querySelectorAll(".aside_navigation-list a").forEach((link) => {
        link.classList.remove("is_view");
      });
      document.querySelectorAll(".procedure_section").forEach((section) => {
        section.classList.remove("is_view");
      });
    }

    // Function to set active class based on section ID
    function setActiveSection(sectionId) {
      clearActiveClasses();
      const navLink = document.querySelector(`a[href="#${sectionId}"]`);
      const section = document.querySelector(`#${sectionId}`);
      if (navLink && section) {
        navLink.classList.add("is_view");
        section.classList.add("is_view");
      }
    }

    // Intersection Observer to detect visible sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isScrolling) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
          }
        });
      },
      {
        rootMargin: "-150px 0px -150px 0px",
        threshold: 0.5,
      }
    );

    // Flag to track if scrolling is caused by a click
    let isScrolling = false;

    // Observe all sections
    document.querySelectorAll(".procedure_section").forEach((section) => {
      observer.observe(section);
    });

    // Handle navigation link clicks with offset
    document.querySelectorAll(".aside_navigation-list a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute("href").substring(1);
        const targetSection = document.querySelector(`#${sectionId}`);
        if (targetSection) {
          isScrolling = true;

          // Calculate the offset to align section with nav item
          const offset = 150;
          const sectionPosition =
            targetSection.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = sectionPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          setActiveSection(sectionId);

          // Close the off-canvas menu after clicking a link
          closeMenu();

          // Re-enable observer after scrolling completes
          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      });
    });

    // Set initial active section based on current scroll position
    window.addEventListener("load", () => {
      const sections = document.querySelectorAll(".procedure_section");
      let closestSection = null;
      let minDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = section;
        }
      });

      if (closestSection) {
        setActiveSection(closestSection.id);
      }
    });

    // Off-canvas menu functionality
    const menuToggle = document.querySelector(".aside_menu-toggle");
    const offcanvasMenu = document.querySelector(".aside_offcanvas-menu");
    const backdrop = document.querySelector(".aside_backdrop");
    const closeMenuBtn = document.querySelector(".aside_close-menu");

    function openMenu() {
      offcanvasMenu.classList.add("open");
      backdrop.classList.add("active");

      // GSAP stagger animation for menu links
      gsap.fromTo(
        ".aside_navigation-list li",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" }
      );
    }

    function closeMenu() {
      offcanvasMenu.classList.remove("open");
      backdrop.classList.remove("active");
    }

    // Event listeners for menu toggle, close button, and backdrop
    menuToggle.addEventListener("click", openMenu);
    closeMenuBtn.addEventListener("click", closeMenu);
    backdrop.addEventListener("click", closeMenu);
  }

  asideNavigationSys();

  var swiper = new Swiper(".journal_slider", {
    spaceBetween: 30,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
  });
});
