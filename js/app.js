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
        threshold: 0.1,
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

  function initFormValidation() {
    const form = document.getElementById("contact-form");
    if (!form) {
      console.warn("Form with id 'contact-form' not found");
      return;
    }

    // Select required text inputs by ID
    const requiredInputIds = ["fullname", "companyname", "email", "phone"];
    const inputs = requiredInputIds
      .map((id) => form.querySelector(`#${id}`))
      .filter(Boolean);

    const radioContainer = form.querySelector(".contact_method-buttons");
    const radioGroups = radioContainer
      ? radioContainer.querySelectorAll(".site_checkbox-group")
      : [];
    const checkboxContainer = form.querySelector(".products_lists-checkboxs");
    const checkboxes = checkboxContainer
      ? checkboxContainer.querySelectorAll(".site_checkbox")
      : [];

    // Dynamically create error message elements if missing
    const ensureErrorMessage = (parent, id, message) => {
      let errorDiv = document.getElementById(id);
      if (!errorDiv) {
        errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.id = id;
        errorDiv.textContent = message;
        parent.appendChild(errorDiv); // Changed to append inside the parent
      }
      return errorDiv;
    };

    inputs.forEach((input) => {
      const inputGroup = input.closest(".site_input-group");
      if (inputGroup) {
        ensureErrorMessage(
          inputGroup,
          `${input.id}-error`,
          `Please enter your ${
            input.id === "email"
              ? "valid email address"
              : input.id === "phone"
              ? "valid phone number"
              : input.id
          }.`
        );
      }
    });

    if (checkboxContainer) {
      ensureErrorMessage(
        checkboxContainer,
        "products-error",
        "Please select at least one product."
      );
    }

    if (radioContainer) {
      ensureErrorMessage(
        radioContainer,
        "contact-method-error",
        "Please select a contact method."
      );
    }

    // Restrict phone input to valid characters in real-time
    const phoneInput = form.querySelector("#phone");
    console.log("Phone input element:", phoneInput);
    if (phoneInput) {
      phoneInput.addEventListener("input", (e) => {
        console.log("Phone input changed:", e.target.value);
        e.target.value = e.target.value.replace(/[^0-9+\s-]/g, "");
        console.log("Cleaned phone input:", e.target.value);
      });
      phoneInput.addEventListener("paste", (e) => {
        setTimeout(() => {
          e.target.value = e.target.value.replace(/[^0-9+\s-]/g, "");
          console.log("Cleaned pasted phone input:", e.target.value);
        }, 0);
      });
    }

    // Initialize ARIA states for radio buttons
    if (radioGroups.length) {
      radioGroups.forEach((group) => {
        const input = group.querySelector(".site_checkbox");
        const label = group.querySelector("label");
        if (input && label) {
          label.setAttribute("aria-checked", input.checked);
          input.addEventListener("change", () => {
            radioGroups.forEach((g) => {
              const otherInput = g.querySelector(".site_checkbox");
              const otherLabel = g.querySelector("label");
              if (otherInput && otherLabel) {
                otherLabel.setAttribute("aria-checked", otherInput.checked);
              }
            });
            if (radioContainer) {
              radioContainer.classList.remove("error");
              radioContainer.removeAttribute("aria-invalid");
              const errorMessage = document.getElementById(
                "contact-method-error"
              );
              if (errorMessage) errorMessage.style.display = "none";
            }
          });
        }
      });
    }

    // Initialize ARIA states for checkboxes
    if (checkboxes.length) {
      checkboxes.forEach((checkbox) => {
        const label = checkbox.nextElementSibling;
        if (label && label.tagName === "LABEL") {
          label.setAttribute("aria-checked", checkbox.checked);
          checkbox.addEventListener("change", () => {
            label.setAttribute("aria-checked", checkbox.checked);
            if (
              checkboxContainer &&
              Array.from(checkboxes).some((cb) => cb.checked)
            ) {
              checkboxContainer.classList.remove("error");
              checkboxContainer.removeAttribute("aria-invalid");
              const errorMessage = document.getElementById("products-error");
              if (errorMessage) errorMessage.style.display = "none";
            }
          });
        }
      });
    }

    // Form submission validation
    form.addEventListener("submit", (e) => {
      console.log("Submit button clicked");
      e.preventDefault();
      let isValid = true;
      let firstInvalidElement = null;

      // Validate required text inputs
      inputs.forEach((input) => {
        const inputGroup = input.closest(".site_input-group");
        const errorMessage = inputGroup
          ? document.getElementById(`${input.id}-error`)
          : null;
        console.log(`Validating ${input.id}:`, input.value.trim());

        if (!input.value.trim()) {
          isValid = false;
          if (inputGroup) {
            inputGroup.classList.add("error");
            input.setAttribute("aria-invalid", "true");
          }
          if (errorMessage) {
            errorMessage.style.display = "block";
            console.log(`Showing error for ${input.id}`);
          }
          if (!firstInvalidElement) {
            firstInvalidElement = input;
          }
        } else if (input.type === "email" && input.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(input.value.trim())) {
            isValid = false;
            if (inputGroup) {
              inputGroup.classList.add("error");
              input.setAttribute("aria-invalid", "true");
            }
            if (errorMessage) {
              errorMessage.textContent = "Please enter a valid email address.";
              errorMessage.style.display = "block";
            }
            if (!firstInvalidElement) {
              firstInvalidElement = input;
            }
          }
        } else if (input.type === "tel" && input.value.trim()) {
          const cleanedPhone = input.value.trim().replace(/[\s-]/g, "");
          console.log("Cleaned phone for validation:", cleanedPhone);
          const phonePattern = /^\+?\d{7,15}$/;
          if (!phonePattern.test(cleanedPhone)) {
            isValid = false;
            if (inputGroup) {
              inputGroup.classList.add("error");
              input.setAttribute("aria-invalid", "true");
            }
            if (errorMessage) {
              errorMessage.textContent =
                "Please enter a valid phone number (7-15 digits, optional +).";
              errorMessage.style.display = "block";
            }
            if (!firstInvalidElement) {
              firstInvalidElement = input;
            }
          }
        } else {
          if (inputGroup) {
            inputGroup.classList.remove("error");
            input.removeAttribute("aria-invalid");
          }
          if (errorMessage) {
            errorMessage.style.display = "none";
          }
        }
      });

      // Validate radio buttons
      const isAnyRadioChecked =
        radioGroups.length &&
        Array.from(radioGroups).some((group) => {
          const input = group.querySelector(".site_checkbox");
          return input && input.checked;
        });
      console.log("Radio checked:", isAnyRadioChecked);

      if (!isAnyRadioChecked) {
        isValid = false;
        if (radioContainer) {
          radioContainer.classList.add("error");
          radioContainer.setAttribute("aria-invalid", "true");
          const errorMessage = document.getElementById("contact-method-error");
          if (errorMessage) {
            errorMessage.style.display = "block";
            console.log("Showing radio error");
            if (!firstInvalidElement) {
              firstInvalidElement = errorMessage;
            }
          }
        }
      } else if (radioContainer) {
        radioContainer.classList.remove("error");
        radioContainer.removeAttribute("aria-invalid");
        const errorMessage = document.getElementById("contact-method-error");
        if (errorMessage) {
          errorMessage.style.display = "none";
        }
      }

      // Validate checkboxes
      const isAnyCheckboxChecked =
        checkboxes.length && Array.from(checkboxes).some((cb) => cb.checked);
      console.log("Checkbox checked:", isAnyCheckboxChecked);

      if (!isAnyCheckboxChecked) {
        isValid = false;
        if (checkboxContainer) {
          checkboxContainer.classList.add("error");
          checkboxContainer.setAttribute("aria-invalid", "true");
          const errorMessage = document.getElementById("products-error");
          if (errorMessage) {
            errorMessage.style.display = "block";
            console.log("Showing checkbox error");
            if (!firstInvalidElement) {
              firstInvalidElement = errorMessage;
            }
          }
        }
      } else if (checkboxContainer) {
        checkboxContainer.classList.remove("error");
        checkboxContainer.removeAttribute("aria-invalid");
        const errorMessage = document.getElementById("products-error");
        if (errorMessage) {
          errorMessage.style.display = "none";
        }
      }

      // Focus first valid element
      if (!isValid && firstInvalidElement) {
        firstInvalidElement.focus();
      }

      if (isValid) {
        form.submit();
      }
    });
  }
  initFormValidation();

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
