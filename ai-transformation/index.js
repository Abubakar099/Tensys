document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".burger");
  let isOpen = false;

  const timeline = gsap.timeline({ paused: true });
  timeline.set(".block-overlay", { display: "block" });
  timeline.to(".logo-link, .tenex-logo-nav", {
    color: "black",
    duration: 0.4,
    ease: "power3.inOut",
  });

  
  timeline.to(
    ".burger",
    {
      "--burger-color": "#000000",
      duration: 0.5,
      ease: "power3.inOut",
    },
    "<",
  );

  timeline.to(".block", {
    duration: 1,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    stagger: 0.075,
    ease: "power3.inOut",
  });

  // Menu items fade in
  timeline.to(
    ".block-menu-title, .block-menu-item",
    {
      duration: 0.3,
      opacity: 1,
      stagger: 0.05,
    },
    "-=0.5",
  );

  // Toggle logic
  toggleButton.addEventListener("click", function () {
    toggleButton.classList.toggle("active");

    if (isOpen) {
      // close menu
      timeline.reverse();
      document.body.classList.remove("no-scroll");
      document.body.classList.remove("menu-open")
    } else {
      // open menu
      timeline.play();
      document.body.classList.add("no-scroll");
      document.body.classList.add("menu-open")

    }
    isOpen = !isOpen;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Ensure grid is visible on page load
  gsap.set(".load_grid", { display: "grid" });
  gsap.set(".load_grid-item", { opacity: 1 });

  // Animate the grid away to reveal the page
  gsap.to(".load_grid-item", {
    opacity: 0,
    duration: 0.2,
    stagger: { amount: 0.5, from: "random" },
    onComplete: () => {
      gsap.set(".load_grid", { display: "none" });
    },
  });

  // Handle link clicks
  $("a").on("click", function (e) {
    if (
      $(this).prop("hostname") === window.location.host &&
      $(this).attr("href").indexOf("#") === -1 &&
      $(this).attr("target") !== "_blank"
    ) {
      e.preventDefault();
      let destination = $(this).attr("href");

      // Bring grid back and animate it in to cover page
      gsap.set(".load_grid", { display: "grid" });
      gsap.fromTo(
        ".load_grid-item",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.2,
          stagger: { amount: 0.5, from: "random" },
          onComplete: () => {
            window.location = destination;
          },
        },
      );
    }
  });

  // Fix back/forward cache issue
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  };
});

document.addEventListener("DOMContentLoaded", () => {
  // Target all Webflow "button-like" elements
  document.querySelectorAll("[data-url]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const url = el.getAttribute("data-url");
      if (!url) return;

      // ⌘ (Mac) or Ctrl (Win) + click → open in new tab
      if (e.metaKey || e.ctrlKey) {
        window.open(url, "_blank");
      }
      // Middle mouse click → open in new tab
      else if (e.button === 1) {
        window.open(url, "_blank");
      }
      // Normal click → same tab
      else {
        window.location.href = url;
      }
    });
  });
});

// Initialize slider Swiper
const swiper = new Swiper(".services-swiper", {
  slidesPerView: 3,
  spaceBetween: 24,
  
  loop: true,
  watchOverflow: true,
  mousewheel: {
    forceToAxis: true,
    sensitivity: 1,
  },
  breakpoints: {
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 24 },
  },
  on: {
    init: function () {
      updateFirstVisible(this);
    },
    slideChange: function () {
      updateFirstVisible(this);
    },
  },
});

// Select arrow and fix the click behavior
const rightArrow = document.querySelector(".swiper-right-arrow");
if (rightArrow) {
  rightArrow.addEventListener("click", (e) => {
    e.preventDefault(); // CRITICAL: Stop the <a> tag from jumping
    swiper.slideNext();
  });
}

function updateFirstVisible(swiperInstance) {
  swiperInstance.slides.forEach((slide) =>
    slide.classList.remove("first-visible"),
  );
  // In loop mode, use realIndex or ensure the index exists
  const firstIndex = swiperInstance.activeIndex;
  if (swiperInstance.slides[firstIndex]) {
    swiperInstance.slides[firstIndex].classList.add("first-visible");
  }
}

// Wheel prevention with safety check
const swiperEl = document.querySelector(".services-swiper");
if (swiperEl) {
  swiperEl.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
    },
    { passive: false },
  );
}

document.addEventListener("DOMContentLoaded", () => {
  // Split text into words
  const splitH1 = new SplitType(".text-h1-xl", { types: "words" });
  const splitXL = new SplitType(".text-xl", { types: "lines" });

  // Create GSAP timeline
  const tl = gsap.timeline();

  // Animate h1 words
  tl.from(splitH1.words, {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "back.inOut",
    stagger: 0.1,
  });

  // Animate xl text words after
  tl.from(
    splitXL.lines,
    {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "back.inOut",
      stagger: 0.1,
    },
    "-=0.5",
  ); // small delay after first animation finishes
});

//*********** */ marquee ticker
gsap.to(".ticker-scroller-wrapper", {
  xPercent: -50,
  ease: "none",
  duration: 20,
  repeat: -1,
  modifiers: {
    // Optional: ensures the value stays within a clean range
    xPercent: gsap.utils.unitize((x) => parseFloat(x) % 50),
  },
});
// end /* ********************** */

//   ************ Gsap Animation ************
gsap.registerPlugin(ScrollTrigger);
gsap.from(".flex-gap-2 ", {
  scrollTrigger: {
    trigger: ".grid-cols",
    start: "left 80%",
    end: "left 30%",
    scrub: 1,
  },
  x: 80,
  opacity: 0,
  stagger: 0.2,
  ease: "power2.out",
});
// end

// slider

// slider
