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

    // Set initial visibility to hidden for all targeted elements
    document
      .querySelectorAll(SplittingTextConfig.selector)
      .forEach((element) => {
        element.style.visibility = "hidden";
      });

    document.fonts.ready.then(() => {
      if (document.body.classList.contains("animation_init")) {
        const elements = document.querySelectorAll(
          SplittingTextConfig.selector
        );

        if (elements.length === 0) {
          console.warn("No elements found for SplitText animation");
          return;
        }

        elements.forEach((element) => {
          element.style.visibility = "visible";
          element.style.opacity = "1";

          const split = new SplitText(element, {
            type: SplittingTextConfig.type,
            linesClass: SplittingTextConfig.linesClass,
          });

          const animation = gsap.timeline({ paused: true });
          split.lines.forEach((line, index) => {
            const wordsInLine = line.querySelectorAll("div");
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
      } else {
        console.log(
          'Animation not initialized: body does not have "animation_init" class'
        );
      }
    });
  }

  document.body.classList.add("animation_init");
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
      const links = document.querySelectorAll(".aside_navigation-list a");
      const sections = document.querySelectorAll(".procedure_section");
      if (links.length) {
        links.forEach((link) => link.classList.remove("is_view"));
      }
      if (sections.length) {
        sections.forEach((section) => section.classList.remove("is_view"));
      }
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
    const sections = document.querySelectorAll(".procedure_section");
    if (!sections.length) {
      console.warn("No .procedure_section elements found for aside navigation");
      return;
    }

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
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Handle navigation link clicks with offset
    const navLinks = document.querySelectorAll(".aside_navigation-list a");
    if (navLinks.length) {
      navLinks.forEach((link) => {
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
    } else {
      console.warn("No .aside_navigation-list a elements found for navigation");
    }

    // Set initial active section based on current scroll position
    window.addEventListener("load", () => {
      if (sections.length) {
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
      }
    });

    // Off-canvas menu functionality
    const menuToggle = document.querySelector(".aside_menu-toggle");
    const offcanvasMenu = document.querySelector(".aside_offcanvas-menu");
    const backdrop = document.querySelector(".aside_backdrop");
    const closeMenuBtn = document.querySelector(".aside_close-menu");

    function openMenu() {
      if (offcanvasMenu && backdrop) {
        offcanvasMenu.classList.add("open");
        backdrop.classList.add("active");

        // GSAP stagger animation for menu links
        const menuLinks = document.querySelectorAll(
          ".aside_navigation-list li"
        );
        if (menuLinks.length && typeof gsap !== "undefined") {
          gsap.fromTo(
            menuLinks,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              stagger: 0.1,
              duration: 0.5,
              ease: "power2.out",
            }
          );
        }
      }
    }

    function closeMenu() {
      if (offcanvasMenu && backdrop) {
        offcanvasMenu.classList.remove("open");
        backdrop.classList.remove("active");
      }
    }

    // Event listeners for menu toggle, close button, and backdrop
    if (menuToggle) {
      menuToggle.addEventListener("click", openMenu);
    }
    if (closeMenuBtn) {
      closeMenuBtn.addEventListener("click", closeMenu);
    }
    if (backdrop) {
      backdrop.addEventListener("click", closeMenu);
    }
  }

  asideNavigationSys();

  function initRadioButtons() {
    const radioGroups = document.querySelectorAll(
      ".contact_method-buttons .site_checkbox-group"
    );
    if (!radioGroups.length) {
      console.warn(
        "No .site_checkbox-group elements found in .contact_method-buttons"
      );
      return;
    }

    radioGroups.forEach((group) => {
      const input = group.querySelector(".site_checkbox");
      const label = group.querySelector("label");

      if (!input || !label) {
        console.warn(
          "Radio input or label missing in .site_checkbox-group within .contact_method-buttons"
        );
        return;
      }

      // Set initial ARIA state
      label.setAttribute("aria-checked", input.checked);

      // Update ARIA state on change
      input.addEventListener("change", () => {
        // Update all labels in the group to reflect checked state
        radioGroups.forEach((g) => {
          const otherInput = g.querySelector(".site_checkbox");
          const otherLabel = g.querySelector("label");
          if (otherInput && otherLabel) {
            otherLabel.setAttribute("aria-checked", otherInput.checked);
          }
        });
      });
    });
  }

  initRadioButtons();

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
