import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import AOS from '../../utils/animate-on-scroll';

export default class StVariants extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    primary_color: string;
    brand_color: string;
    section_title: string;
    selector_label: string;
    variants: Array<{
      product_image: string;
      side_image: string;
      color_hex: string;
      color_title: string;
    }>;
  };

  @state() private currentVariantIndex: number = 0;
  @state() private isTransitioning: boolean = false;
  @state() private lightboxOpen: boolean = false;
  @state() private lightboxSrc: string = '';

  private styleElement: HTMLStyleElement | null = null;

  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
    AOS.init();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.styleElement?.remove();
    this.styleElement = null;
  }

  updated(changedProperties: any) {
    super.updated(changedProperties);
    AOS.refresh();
  }

  injectStyles() {
    if (this.styleElement) return;

    const bgColor = this.config?.bg_color || '#ffffff';
    const primaryColor = this.config?.primary_color || '#050505';
    const brandColor = this.config?.brand_color || '#0071E3';

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .st-variants {
        display: block;
        width: 100%;
        background: ${bgColor};
        color: ${primaryColor};
        padding: 5rem 1.5rem;
        overflow: hidden;
      }

      .st-variants__container {
        max-width: 1200px;
        margin: 0 auto;
      }

      .st-variants__title {
        font-size: clamp(1.5rem, 3vw, 3rem);
        font-weight: 700;
        margin-bottom: 3rem;
      }

      .st-variants__layout {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 3rem;
        align-items: center;
      }

      @media (max-width: 768px) {
        .st-variants__layout {
          grid-template-columns: 1fr;
        }
      }

      [dir="rtl"] .st-variants__layout {
        direction: rtl;
      }

      .st-variants__selector {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .st-variants__selector-label {
        font-size: 1rem;
        opacity: 0.7;
        font-weight: 500;
        margin: 0;
      }

      .st-variants__product-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      @media (min-width: 769px) {
        .st-variants__product-wrap {
          display: block;
        }
      }

      .st-variants__product-image,
      .st-variants__side-image {
        width: 100%;
        object-fit: contain;
        transition: opacity 0.175s ease;
      }

      .st-variants__product-image.is-transitioning,
      .st-variants__side-image.is-transitioning {
        opacity: 0.2;
      }

      .st-variants__product-image {
        max-height: 300px;
        object-fit: contain;
      }

      .st-variants__color-buttons {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .st-variants__color-btn {
        display: flex;
        align-items: center;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 9999px;
        transition: background 0.2s;
      }

      .st-variants__color-btn:hover {
        background: rgba(0, 0, 0, 0.05);
      }

      .st-variants__color-dot {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        flex-shrink: 0;
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.2s;
      }

      .st-variants__color-btn.is-active .st-variants__color-dot {
        box-shadow: 0 0 0 3px ${bgColor}, 0 0 0 5px ${brandColor};
      }

      .st-variants__color-label {
        max-width: 0;
        overflow: hidden;
        white-space: nowrap;
        opacity: 0;
        margin-inline-start: 0;
        color: ${brandColor};
        font-size: 0.875rem;
        font-weight: 700;
        transition: max-width 0.5s ease, margin-inline-start 0.5s ease, opacity 0.5s ease;
      }

      .st-variants__color-btn.is-active .st-variants__color-label {
        max-width: 200px;
        opacity: 1;
        margin-inline-start: 8px;
      }

      .st-variants__side-panel {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .st-variants__side-image {
        width: 100%;
        max-height: 600px;
        object-fit: cover;
        border-radius: 2rem;
        cursor: pointer;
        transition: transform 0.3s ease, opacity 0.175s ease;
      }

      .st-variants__side-image:hover {
        transform: scale(1.02);
      }

      .st-variants__lightbox {
        position: fixed;
        inset: 0;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .st-variants__lightbox-inner {
        position: relative;
        max-width: 85vw;
        max-height: 85vh;
      }

      .st-variants__lightbox-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 12px;
      }

      .st-variants__lightbox-close {
        position: absolute;
        top: -2.5rem;
        right: 0;
        background: transparent;
        color: white;
        border: none;
        font-size: 1.75rem;
        cursor: pointer;
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  private selectVariant(index: number) {
    if (this.isTransitioning || index === this.currentVariantIndex) return;

    this.isTransitioning = true;
    this.requestUpdate();

    // After 175ms (half of the 0.35s transition), swap the index
    setTimeout(() => {
      this.currentVariantIndex = index;
      this.requestUpdate();

      // Remove transitioning state after fade-in completes
      setTimeout(() => {
        this.isTransitioning = false;
        this.requestUpdate();
      }, 175);
    }, 175);
  }

  private openLightbox(src: string) {
    this.lightboxSrc = src;
    this.lightboxOpen = true;
  }

  private closeLightbox() {
    this.lightboxOpen = false;
  }

  render() {
    if (!this.config || !this.config.variants || this.config.variants.length === 0) {
      return html`<div>Configuration is required</div>`;
    }

    const variants = this.config.variants;
    const safeIndex = Math.min(this.currentVariantIndex, variants.length - 1);
    const currentVariant = variants[safeIndex];
    const transitioningClass = this.isTransitioning ? 'is-transitioning' : '';

    return html`
      <section class="st-variants">
        <div class="st-variants__container">
          <h2 class="st-variants__title" data-animate="fade-up">
            ${this.config.section_title}
          </h2>

          <div class="st-variants__layout">
            <div class="st-variants__selector">
              <p
                class="st-variants__selector-label"
                data-animate="fade-up"
                data-delay="150"
              >
                ${this.config.selector_label}
              </p>

              <div class="st-variants__product-wrap">
                <img
                  src="${currentVariant.product_image}"
                  alt="${currentVariant.color_title}"
                  loading="lazy"
                  class="st-variants__product-image ${transitioningClass}"
                  data-animate="fade-up"
                  data-delay="100"
                />
              </div>

              <div
                class="st-variants__color-buttons"
                data-animate="fade-up"
                data-delay="300"
              >
                ${variants.map(
                  (variant, index) => html`
                    <button
                      type="button"
                      class="st-variants__color-btn ${index === safeIndex ? 'is-active' : ''}"
                      aria-label="${variant.color_title}"
                      @click="${() => this.selectVariant(index)}"
                    >
                      <span
                        class="st-variants__color-dot"
                        style="background: ${variant.color_hex}"
                      ></span>
                      <span class="st-variants__color-label">${variant.color_title}</span>
                    </button>
                  `
                )}
              </div>
            </div>

            <div class="st-variants__side-panel">
              <img
                src="${currentVariant.side_image}"
                alt="${currentVariant.color_title}"
                loading="lazy"
                class="st-variants__side-image ${transitioningClass}"
                data-animate="zoom-in"
                data-delay="200"
                @click="${() => this.openLightbox(currentVariant.side_image)}"
              />
            </div>
          </div>
        </div>

        ${this.lightboxOpen
          ? html`
              <div class="st-variants__lightbox" @click="${() => this.closeLightbox()}">
                <div
                  class="st-variants__lightbox-inner"
                  @click="${(e: Event) => e.stopPropagation()}"
                >
                  <img
                    src="${this.lightboxSrc}"
                    alt=""
                    class="st-variants__lightbox-img"
                  />
                  <button
                    type="button"
                    class="st-variants__lightbox-close"
                    aria-label="Close"
                    @click="${() => this.closeLightbox()}"
                  >
                    ✕
                  </button>
                </div>
              </div>
            `
          : ''}
      </section>
    `;
  }
}
