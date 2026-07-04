import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import AOS from '../../utils/animate-on-scroll';

export default class StProductImages extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    text_color: string;
    brand_color: string;
    section_title: string;
    grid_columns: string; // '2' or '3'
    images: Array<{
      src: string;
      alt: string;
      overlay_text: string;
      overlay_position: string; // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
      always_show: boolean;
      show_overlay_bg: boolean;
    }>;
  };

  @state() private lightboxIndex: number = 0;
  @state() private lightboxOpen: boolean = false;

  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }

  private styleElement: HTMLStyleElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
    AOS.init();
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('keydown', this.handleKeydown);
    requestAnimationFrame(() => this.handleScroll());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('keydown', this.handleKeydown);
    this.styleElement?.remove();
    this.styleElement = null;
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    AOS.refresh();
    this.handleScroll();
  }

  // 3D scroll perspective: tilts the grid from a 45deg perspective angle
  // (pushed 500px away) to flat as the section scrolls into view.
  private handleScroll = () => {
    const wrapper = this.querySelector('.st-product-images__perspective') as HTMLElement;
    const section = this.querySelector('.st-product-images') as HTMLElement;
    if (!section || !wrapper) return;

    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight;

    // progress: 0 when bottom enters viewport, 1 when section has scrolled fully in
    const progress = Math.min(1, Math.max(0, (windowH - rect.top) / (windowH * 0.8)));

    const rotateX = 45 * (1 - progress);
    const translateZ = 500 * (1 - progress);

    wrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) translateZ(${translateZ}px)`;
  };

  private handleKeydown = (e: KeyboardEvent) => {
    if (!this.lightboxOpen) return;
    if (e.key === 'Escape') this.closeLightbox();
    if (e.key === 'ArrowLeft') this.prevImage();
    if (e.key === 'ArrowRight') this.nextImage();
  };

  private openLightbox(index: number) {
    this.lightboxIndex = index;
    this.lightboxOpen = true;
  }

  private closeLightbox() {
    this.lightboxOpen = false;
  }

  private prevImage() {
    const images = this.config?.images ?? [];
    if (!images.length) return;
    this.lightboxIndex = (this.lightboxIndex - 1 + images.length) % images.length;
  }

  private nextImage() {
    const images = this.config?.images ?? [];
    if (!images.length) return;
    this.lightboxIndex = (this.lightboxIndex + 1) % images.length;
  }

  injectStyles() {
    if (this.styleElement) return;

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .st-product-images {
        display: block;
        padding: 4rem 1.5rem;
        overflow: hidden;
      }

      .st-product-images__container {
        max-width: 1200px;
        margin: 0 auto;
      }

      .st-product-images__header {
        margin-bottom: 2.5rem;
      }

      .st-product-images__title {
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.3;
        margin: 0;
      }

      @media (min-width: 768px) {
        .st-product-images__title {
          font-size: 2.25rem;
        }
      }

      .st-product-images__perspective {
        /* Initial 3D state - JS updates this on scroll */
        transform: perspective(1000px) rotateX(45deg) translateZ(500px);
        transform-style: preserve-3d;
        will-change: transform;
        transition: none;
      }

      .st-product-images__grid {
        display: grid;
        gap: 1rem;
      }

      .st-product-images__grid--2 {
        grid-template-columns: repeat(2, 1fr);
      }

      .st-product-images__grid--3 {
        grid-template-columns: repeat(3, 1fr);
      }

      /* Mobile: always 2 cols */
      @media (max-width: 768px) {
        .st-product-images__grid--3 {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .st-product-images__cell {
        position: relative;
        overflow: hidden;
        border-radius: 1.25rem;
        cursor: pointer;
      }

      .st-product-images__img {
        width: 100%;
        aspect-ratio: 4/3;
        object-fit: cover;
        display: block;
        transition: transform 0.3s ease;
      }

      .st-product-images__cell:hover .st-product-images__img {
        transform: scale(1.03);
      }

      /* Overlay */
      .st-product-images__overlay {
        position: absolute;
        inset: 0;
        opacity: 0;
        transition: opacity 0.3s ease;
        display: flex;
        align-items: flex-end;
        padding: 1rem;
      }

      .st-product-images__overlay.is-always-visible,
      .st-product-images__cell:hover .st-product-images__overlay {
        opacity: 1;
      }

      .st-product-images__overlay--top-left {
        align-items: flex-start;
        justify-content: flex-start;
      }

      .st-product-images__overlay--top-right {
        align-items: flex-start;
        justify-content: flex-end;
      }

      .st-product-images__overlay--bottom-left {
        align-items: flex-end;
        justify-content: flex-start;
      }

      .st-product-images__overlay--bottom-right {
        align-items: flex-end;
        justify-content: flex-end;
      }

      .st-product-images__overlay-bg {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
      }

      .st-product-images__overlay-text {
        position: relative;
        z-index: 1;
        color: white;
        font-weight: 600;
        font-size: 0.875rem;
      }

      /* Expand hint */
      .st-product-images__expand {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translate(-50%, 0.5rem);
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.125rem;
        z-index: 2;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        pointer-events: none;
      }

      .st-product-images__cell:hover .st-product-images__expand {
        opacity: 1;
        transform: translate(-50%, 0);
      }

      /* Lightbox */
      .st-product-images__lightbox {
        position: fixed;
        inset: 0;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .st-product-images__lightbox-inner {
        position: relative;
        max-width: 85vw;
        max-height: 85vh;
      }

      .st-product-images__lightbox-img {
        width: 100%;
        height: 100%;
        max-height: 85vh;
        object-fit: contain;
        border-radius: 12px;
      }

      .st-product-images__lb-close {
        position: absolute;
        top: -2.5rem;
        right: 0;
        background: transparent;
        color: white;
        border: none;
        font-size: 1.75rem;
        cursor: pointer;
        line-height: 1;
      }

      .st-product-images__lb-prev,
      .st-product-images__lb-next {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.15);
        color: white;
        border: none;
        font-size: 2.5rem;
        line-height: 1;
        cursor: pointer;
        padding: 0.5rem 1rem;
        border-radius: 50%;
        transition: background 0.2s;
      }

      .st-product-images__lb-prev:hover,
      .st-product-images__lb-next:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      .st-product-images__lb-prev {
        left: 1rem;
      }

      .st-product-images__lb-next {
        right: 1rem;
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const bgColor = this.config.bg_color || '#ffffff';
    const textColor = this.config.text_color || '#050505';
    const brandColor = this.config.brand_color || '#0071E3';
    const gridColumns = this.config.grid_columns === '3' ? '3' : '2';
    const images = this.config.images ?? [];
    const lightboxImage = images[this.lightboxIndex];

    return html`
      <section
        class="st-product-images"
        style="background: ${bgColor}; color: ${textColor};"
      >
        <div class="st-product-images__container">
          ${this.config.section_title ? html`
            <div class="st-product-images__header" data-animate="fade-up">
              <h2 class="st-product-images__title">${this.config.section_title}</h2>
            </div>
          ` : ''}

          <div class="st-product-images__perspective">
            <div class="st-product-images__grid st-product-images__grid--${gridColumns}">
              ${images.map((img, i) => html`
                <div
                  class="st-product-images__cell"
                  @click="${() => this.openLightbox(i)}"
                >
                  <img
                    loading="lazy"
                    src="${img.src}"
                    alt="${img.alt}"
                    class="st-product-images__img"
                  />

                  <div
                    class="st-product-images__overlay ${img.always_show ? 'is-always-visible' : ''} st-product-images__overlay--${img.overlay_position || 'bottom-right'}"
                  >
                    ${img.show_overlay_bg ? html`
                      <div class="st-product-images__overlay-bg"></div>
                    ` : ''}
                    ${img.overlay_text ? html`
                      <span class="st-product-images__overlay-text">${img.overlay_text}</span>
                    ` : ''}
                  </div>

                  <div
                    class="st-product-images__expand"
                    style="background: ${brandColor};"
                  >
                    <span class="sicon-arrow-expand"></span>
                  </div>
                </div>
              `)}
            </div>
          </div>
        </div>

        ${this.lightboxOpen && lightboxImage ? html`
          <div class="st-product-images__lightbox" @click="${this.closeLightbox}">
            <div
              class="st-product-images__lightbox-inner"
              @click="${(e: Event) => e.stopPropagation()}"
            >
              <img
                src="${lightboxImage.src}"
                alt="${lightboxImage.alt}"
                class="st-product-images__lightbox-img"
              />
              <button
                class="st-product-images__lb-close"
                aria-label="Close"
                @click="${this.closeLightbox}"
              >✕</button>
              <button
                class="st-product-images__lb-prev"
                aria-label="Previous image"
                @click="${this.prevImage}"
              >‹</button>
              <button
                class="st-product-images__lb-next"
                aria-label="Next image"
                @click="${this.nextImage}"
              >›</button>
            </div>
          </div>
        ` : ''}
      </section>
    `;
  }
}
