/**
 * Simple AOS-like Animation System
 * Usage: <div data-animate="fade-up" data-delay="150">Content</div>
 */

class AnimateOnScroll {
  private observer: IntersectionObserver | null = null;
  private initialized = false;

  init() {
    if (this.initialized) return;
    
    this.injectGlobalStyles();
    this.setupObserver();
    this.initialized = true;
  }

  private injectGlobalStyles() {
    if (document.getElementById('aos-styles')) return;

    const style = document.createElement('style');
    style.id = 'aos-styles';
    style.textContent = `
      /* Initial state - elements are invisible until animated */
      [data-animate] {
        opacity: 0;
        will-change: transform, opacity;
        transition: all 0.7s cubic-bezier(0.4, 0.0, 0.2, 1);
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
        transition: all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
      [data-animate="bounce-in"].aos-animate {
        transform: scale(1);
      }

      /* Performance optimizations */
      [data-animate].aos-animate {
        will-change: auto;
      }
    `;

    document.head.appendChild(style);
  }

  private setupObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const delay = parseInt(element.getAttribute('data-delay') || '0');
            
            setTimeout(() => {
              element.classList.add('aos-animate');
              this.observer?.unobserve(element);
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Observe all existing elements
    this.observeElements();
    
    // Watch for new elements (for dynamic components)
    this.watchForNewElements();
  }

  private observeElements() {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(element => {
      if (!element.classList.contains('aos-animate')) {
        this.observer?.observe(element);
      }
    });
  }

  private watchForNewElements() {
    // Use MutationObserver to watch for newly added animated elements
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            
            // Check if the element itself has data-animate
            if (element.hasAttribute('data-animate')) {
              this.observer?.observe(element);
            }
            
            // Check for child elements with data-animate
            const animatedChildren = element.querySelectorAll('[data-animate]');
            animatedChildren.forEach(child => {
              if (!child.classList.contains('aos-animate')) {
                this.observer?.observe(child);
              }
            });
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Public method to manually refresh (if needed)
  refresh() {
    this.observeElements();
  }

  // Cleanup method
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.initialized = false;
    
    const styles = document.getElementById('aos-styles');
    if (styles) {
      styles.remove();
    }
  }
}

// Create global instance
const AOS = new AnimateOnScroll();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => AOS.init());
} else {
  AOS.init();
}

// Export for manual control if needed
export default AOS;