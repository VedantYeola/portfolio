(function (html) {
  "use strict";

  const cfg = {
    googleFormURL: "https://forms.gle/DPeri3GE3p2qzxQe8", // Replace with your Google Form link
    googleScriptURL: "YOUR_GOOGLE_APPS_SCRIPT_URL", // Replace with your Web App URL
  };

  /* Preloader */
  const ssPreloader = function () {
    const siteBody = document.querySelector("body");
    const preloader = document.querySelector("#preloader");
    if (!preloader) return;

    html.classList.add("ss-preload");

    window.addEventListener("load", function () {
      html.classList.remove("ss-preload");
      html.classList.add("ss-loaded");

      preloader.addEventListener("transitionend", function (e) {
        if (e.target.matches("#preloader")) {
          siteBody.classList.add("ss-show");
          e.target.style.display = "none";
        }
      });
    });
  };

  /* Mobile Menu */
  const ssMobileMenu = function () {
    const toggleButton = document.querySelector(".s-header__menu-toggle");
    const mainNavWrap = document.querySelector(".s-header__nav");
    const siteBody = document.querySelector("body");

    if (!(toggleButton && mainNavWrap)) return;

    toggleButton.addEventListener("click", function (e) {
      e.preventDefault();
      toggleButton.classList.toggle("is-clicked");
      siteBody.classList.toggle("menu-is-open");
    });

    mainNavWrap.querySelectorAll(".s-header__nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 900px)").matches) {
          toggleButton.classList.toggle("is-clicked");
          siteBody.classList.toggle("menu-is-open");
        }
      });
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 901px)").matches) {
        siteBody.classList.remove("menu-is-open");
        toggleButton.classList.remove("is-clicked");
      }
    });
  };

  /* Swiper (for sliders) */
  const ssSwiper = function () {
    new Swiper(".home-slider", {
      slidesPerView: 1,
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: {
        401: { slidesPerView: 1, spaceBetween: 20 },
        801: { slidesPerView: 2, spaceBetween: 40 },
        1331: { slidesPerView: 3, spaceBetween: 48 },
        1774: { slidesPerView: 4, spaceBetween: 48 },
      },
    });

    new Swiper(".page-slider", {
      slidesPerView: 1,
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: {
        401: { slidesPerView: 1, spaceBetween: 20 },
        801: { slidesPerView: 2, spaceBetween: 40 },
        1241: { slidesPerView: 3, spaceBetween: 48 },
      },
    });
  };

  /* Google Form Submission & Data Saving */
  const ssGoogleFormRedirect = function () {
    const mcForm = document.querySelector("#mc-form");

    if (!mcForm) return;

    mcForm.setAttribute("novalidate", true);

    mcForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let emailField = event.target.querySelector("#mce-EMAIL");
      let email = emailField.value.trim();

      if (!email) {
        alert("Please enter a valid email address.");
        return;
      }

      // Save email to Google Sheets
      fetch(cfg.googleScriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      })
        .then(() => {
          // Open Google Form in a new tab
          window.open(cfg.googleFormURL, "_blank");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Something went wrong. Please try again.");
        });
    });
  };

  /* Alert Boxes */
  const ssAlertBoxes = function () {
    document.querySelectorAll(".alert-box").forEach(function (box) {
      box.addEventListener("click", function (e) {
        if (e.target.matches(".alert-box__close")) {
          e.stopPropagation();
          e.target.parentElement.classList.add("hideit");

          setTimeout(function () {
            box.style.display = "none";
          }, 500);
        }
      });
    });
  };

  /* Back to Top */
  const ssBackToTop = function () {
    const pxShow = 900;
    const goTopButton = document.querySelector(".ss-go-top");

    if (!goTopButton) return;

    if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

    window.addEventListener("scroll", function () {
      if (window.scrollY >= pxShow) {
        goTopButton.classList.add("link-is-visible");
      } else {
        goTopButton.classList.remove("link-is-visible");
      }
    });
  };

  /* Initialize */
  (function ssInit() {
    ssPreloader();
    ssMobileMenu();
    ssSwiper();
    ssGoogleFormRedirect(); // Save email to Google Sheets before opening form
    ssAlertBoxes();
  })();
})(document.documentElement);
