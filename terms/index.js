document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".burger");
  let isOpen = false;

  const timeline = gsap.timeline({ paused: true });

  timeline.set(".block-overlay", { display: "block" });

  timeline.to(".logo-link, .tenex-logo-nav", {
    color: "black",
    duration: 0.4,
    ease: "power2.inOut",
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
      document.body.classList.remove("menu-open");
    } else {
      // open menu
      timeline.play();
      document.body.classList.add("no-scroll");
      document.body.classList.add("menu-open");
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
document.addEventListener("DOMContentLoaded", () => {
  // Split text into words
  const splitH1 = new SplitType(".text-h1-xl", { types: "words" });
  const splitXL = new SplitType(".text-xl", { types: "lines" });

  // Create GSAP timeline
  const tl = gsap.timeline();

  // Animate h1 words
  tl.from(splitH1.words, {
    y: -100, // drop in from below
    opacity: 0,
    duration: 1,
    ease: "back.inOut",
    stagger: 0.1, // each word one after the other
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
    "+=0.3",
  ); // small delay after first animation finishes
});
