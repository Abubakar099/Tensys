  
//      marquee start  **********
       document.addEventListener("DOMContentLoaded", function () {
        const toggleButton = document.querySelector(".burger");
        let isOpen = false;

        const timeline = gsap.timeline({ paused: true });

        // Example: overlay reveal
        timeline.set(".block-overlay", { display: "block" });

        // Animate logo links
        timeline.to(".logo-link, .tenex-logo-nav", {
          color: "black",
          duration: 0.5,
          ease: "power3.inOut",
        });

        // Animate burger pseudo-elements by targeting the CSS variable
        timeline.to(
          ".burger",
          {
            "--burger-color": "#000000",
            duration: 0.5,
            ease: "power3.inOut",
          },
          "<",
        );

        // Overlay blocks animation
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
          } else {
            // open menu
            timeline.play();
            document.body.classList.add("no-scroll");
          }
          isOpen = !isOpen;
        });
      });
    
    //   marquee start  **********

    

    
    //   marquee start  **********

    
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
    
    //   marquee start  **********

    

    
    //   marquee start  **********

    
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
    
    //   marquee start  **********

    
    
        
    //   marquee start  **********

    
          // Copy prompt text functionality
          document.addEventListener("click", function (e) {
            if (e.target.classList.contains("prompt-copy")) {
              e.preventDefault();
              const promptText = e.target.previousElementSibling.textContent;
    
              navigator.clipboard
                .writeText(promptText)
                .then(function () {
                  const originalText = e.target.textContent;
                  e.target.textContent = "Copied!";
                  setTimeout(function () {
                    e.target.textContent = originalText;
                  }, 2000);
                })
                .catch(function (err) {
                  console.error("Failed to copy: ", err);
                });
            }
          });
        
        //   marquee start  **********

        
    
        
        //   marquee start  **********

        
          // Get elements
          const modal = document.querySelector(".playbook-modal");
          const openModalBtn = document.getElementById("open-modal");
          const form = document.getElementById("wf-form-Ultrathink-Form-2");
          const playbookContent = document.getElementById("playbook-content");
          const playbookStrategy = document.getElementById("the-strategy");
          const regWall = document.getElementById("reg-wall");
          const playbookInput = document.getElementById("source");
          let hasShownModal = false;
    
          // Set the playbook title from CMS field
          playbookInput.value =
            "The Definitive Field Guide to Vibe Coding Using Gemini 3";
    
          // Listen for scroll to show modal at 30%
          window.addEventListener("scroll", () => {
            if (hasShownModal) return;
    
            const scrollPercent =
              (window.scrollY /
                (document.documentElement.scrollHeight - window.innerHeight)) *
              100;
    
            if (scrollPercent >= 30) {
              modal.style.display = "flex";
              modal.style.opacity = "1";
              hasShownModal = true;
            }
          });
    
          // Open modal button click handler
          if (openModalBtn) {
            openModalBtn.addEventListener("click", (e) => {
              e.preventDefault();
              modal.style.display = "flex";
              modal.style.opacity = "1";
            });
          }
    
          // Handle form submission
          if (form) {
            form.addEventListener("submit", function (e) {
              e.preventDefault();
    
              // Optional: Send to backend here
    
              modal.style.display = "none";
              modal.style.opacity = "0";
              playbookContent.style.height = "100%";
              playbookContent.style.overflow = "visible";
              regWall.style.display = "none";
              playbookStrategy.style.display = "block";
    
              if (openModalBtn) openModalBtn.style.display = "none";
    
              return false;
            });
          }
    
          // Close modal functionality
          const closeBtn = modal ? modal.querySelector(".close-button") : null;
          if (closeBtn) {
            closeBtn.addEventListener("click", () => {
              modal.style.display = "none";
              modal.style.opacity = "0";
            });
          }
        
        //   marquee start  **********
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(".ticker-scroller",{
            xPercent: -50,
            ease:"none",
            duration:20,
            repeat: -1,
            modifiers:{
                xpercent:gsap.utils.unitize((x)=> parseFloat(x)% 50),
            },
        });
        //   marquee start  **********
        