class l {
  constructor() {
    this.observer = null, this.initialized = !1;
  }
  init() {
    this.initialized || (this.injectGlobalStyles(), this.setupObserver(), this.initialized = !0);
  }
  injectGlobalStyles() {
    if (document.getElementById("aos-styles")) return;
    const a = document.createElement("style");
    a.id = "aos-styles", a.textContent = `
      /* Initial state - elements are invisible until animated.
         Transition only opacity/transform (not "all") so the browser can run
         this on the compositor thread instead of triggering layout/paint. */
      [data-animate] {
        opacity: 0;
        will-change: transform, opacity;
        transition: opacity 0.6s cubic-bezier(0.4, 0.0, 0.2, 1),
                    transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
      }

      /* Animation classes applied by observer */
      [data-animate].aos-animate {
        opacity: 1;
      }

      /* Fade animations */
      [data-animate="fade-up"] {
        transform: translateY(30px);
      }
      [data-animate="fade-up"].aos-animate {
        transform: translateY(0);
      }

      [data-animate="fade-down"] {
        transform: translateY(-30px);
      }
      [data-animate="fade-down"].aos-animate {
        transform: translateY(0);
      }

      [data-animate="fade-left"] {
        transform: translateX(-30px);
      }
      [data-animate="fade-left"].aos-animate {
        transform: translateX(0);
      }

      [data-animate="fade-right"] {
        transform: translateX(30px);
      }
      [data-animate="fade-right"].aos-animate {
        transform: translateX(0);
      }

      [data-animate="fade-in"] {
        /* No transform, just opacity */
      }
      [data-animate="fade-in"].aos-animate {
        /* Opacity handled by base class */
      }

      /* Zoom animations */
      [data-animate="zoom-in"] {
        transform: scale(0.9);
      }
      [data-animate="zoom-in"].aos-animate {
        transform: scale(1);
      }

      [data-animate="zoom-out"] {
        transform: scale(1.1);
      }
      [data-animate="zoom-out"].aos-animate {
        transform: scale(1);
      }

      /* Slide animations */
      [data-animate="slide-up"] {
        transform: translateY(50px);
      }
      [data-animate="slide-up"].aos-animate {
        transform: translateY(0);
      }

      [data-animate="slide-down"] {
        transform: translateY(-50px);
      }
      [data-animate="slide-down"].aos-animate {
        transform: translateY(0);
      }

      [data-animate="slide-left"] {
        transform: translateX(-50px);
      }
      [data-animate="slide-left"].aos-animate {
        transform: translateX(0);
      }

      [data-animate="slide-right"] {
        transform: translateX(50px);
      }
      [data-animate="slide-right"].aos-animate {
        transform: translateX(0);
      }

      /* Scale animation */
      [data-animate="scale-in"] {
        transform: scale(0.8);
      }
      [data-animate="scale-in"].aos-animate {
        transform: scale(1);
      }

      /* Bounce animation */
      [data-animate="bounce-in"] {
        transform: scale(0.3);
        transition: opacity 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55),
                    transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
      [data-animate="bounce-in"].aos-animate {
        transform: scale(1);
      }

      /* Performance optimizations */
      [data-animate].aos-animate {
        will-change: auto;
      }

      /* Reduced motion: show content instantly, no transforms */
      @media (prefers-reduced-motion: reduce) {
        [data-animate] {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }
      }
    `, document.head.appendChild(a);
  }
  setupObserver() {
    this.observer = new IntersectionObserver(
      (a) => {
        a.forEach((e) => {
          const t = e.target;
          if (e.isIntersecting) {
            const n = parseInt(t.getAttribute("data-delay") || "0");
            setTimeout(() => {
              t.classList.add("aos-animate");
            }, n);
          } else
            t.classList.remove("aos-animate");
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px"
      }
    ), this.observeElements(), this.watchForNewElements();
  }
  observeElements() {
    document.querySelectorAll("[data-animate]").forEach((e) => {
      var t;
      e.classList.contains("aos-animate") || (t = this.observer) == null || t.observe(e);
    });
  }
  watchForNewElements() {
    new MutationObserver((e) => {
      e.forEach((t) => {
        t.addedNodes.forEach((n) => {
          var i;
          if (n.nodeType === Node.ELEMENT_NODE) {
            const s = n;
            s.hasAttribute("data-animate") && ((i = this.observer) == null || i.observe(s)), s.querySelectorAll("[data-animate]").forEach((o) => {
              var r;
              o.classList.contains("aos-animate") || (r = this.observer) == null || r.observe(o);
            });
          }
        });
      });
    }).observe(document.body, {
      childList: !0,
      subtree: !0
    });
  }
  // Public method to manually refresh (if needed)
  refresh() {
    this.observeElements();
  }
  // Cleanup method
  destroy() {
    this.observer && (this.observer.disconnect(), this.observer = null), this.initialized = !1;
    const a = document.getElementById("aos-styles");
    a && a.remove();
  }
}
const m = new l();
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => m.init()) : m.init();
export {
  m as A
};
