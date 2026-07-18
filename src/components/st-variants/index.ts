import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import AOS from '../../utils/animate-on-scroll';
import '../../utils/fonts';

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
    const grayColor = '#F8F8F8';
    const darkGrayColor = '#DDDDDD';

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .st-variants {
        display: block;
        width: 100%;
        background: ${bgColor};
        color: ${primaryColor};
        overflow: hidden;
      }

      .st-variants__container {
        max-width: 1440px;
        margin: 0 auto;
        padding: 2.5rem 0.5rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      @media (min-width: 768px) {
        .st-variants__container { padding: 52px 1rem 3rem; gap: 2rem; }
      }

      @media (min-width: 1024px) {
        .st-variants__container { padding: 52px 2.5rem 3rem; }
      }

      @media (min-width: 1280px) {
        .st-variants__container { padding: 52px 88px 3rem; }
      }

      .st-variants__title {
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1.35;
        margin: 0;
        text-align: start;
      }

      @media (min-width: 768px) {
        .st-variants__title { font-size: 1.875rem; line-height: 40px; }
      }

      @media (min-width: 1024px) {
        .st-variants__title { font-size: 2.25rem; line-height: 48px; }
      }

      @media (min-width: 1280px) {
        .st-variants__title { font-size: 40px; line-height: 64px; }
      }

      /* Split layout: selector panel 42% / lifestyle image 58%, fixed 654px on lg */
      .st-variants__layout {
        display: flex;
        position: relative;
      }

      @media (min-width: 1024px) {
        .st-variants__layout { height: min(654px, calc(100vh - 220px)); }
      }

      /* Selector panel — gray bg + border + asymmetric rounding (matches source) */
      .st-variants__selector {
        background: ${grayColor};
        border: 1px solid ${darkGrayColor};
        border-start-start-radius: 0.75rem;
        border-start-end-radius: 0.75rem;
        width: 100%;
        min-width: 35%;
        padding: 2rem 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-x: hidden;
        overflow-y: hidden;
      }

      @media (min-width: 768px) {
        .st-variants__selector { padding: 2rem 1.5rem; }
      }

      @media (min-width: 1024px) {
        .st-variants__selector {
          width: 42%;
          padding: 2rem 38px;
          border-start-end-radius: 0;
          border-end-start-radius: 0.75rem;
        }
      }

      .st-variants__product-wrap {
        display: flex;
        position: relative;
        align-items: center;
        flex-grow: 1;
        width: 100%;
        overflow-x: auto;
        padding: 0.25rem;
      }

      @media (min-width: 640px) {
        .st-variants__product-wrap { padding: 1rem; }
      }

      @media (min-width: 1024px) {
        .st-variants__product-wrap { justify-content: center; }
      }

      .st-variants__product-image,
      .st-variants__mobile-side-image {
        transition: opacity 0.35s ease;
      }

      .st-variants__product-image.is-transitioning,
      .st-variants__mobile-side-image.is-transitioning,
      .st-variants__side-image.is-transitioning {
        opacity: 0.3;
      }

      /* Mobile: product shot floats as a circular badge over the lifestyle image */
      .st-variants__product-image {
        position: absolute;
        top: 6%;
        inset-inline-start: 2%;
        width: 10rem;
        height: 10rem;
        border-radius: 9999px;
        object-fit: contain;
        cursor: pointer;
      }

      @media (min-width: 1024px) {
        .st-variants__product-image {
          position: relative;
          top: 0;
          inset-inline-start: 0;
          width: 100%;
          min-width: 100%;
          max-width: 100%;
          height: auto;
          max-height: 400px;
          border-radius: 0;
        }
      }

      .st-variants__mobile-side-image {
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        object-fit: cover;
        max-height: max(55vh, 375px);
        border-radius: 0.75rem;
        cursor: pointer;
      }

      .st-variants__mobile-side-image:hover { opacity: 0.9; }

      @media (min-width: 1024px) {
        .st-variants__mobile-side-image { display: none; }
      }

      .st-variants__selector-footer {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
      }

      .st-variants__selector-label {
        font-size: 1.125rem;
        line-height: 1.75rem;
        font-weight: 700;
        margin: 0;
      }

      @media (min-width: 768px) {
        .st-variants__selector-label { font-size: 1.25rem; line-height: 2rem; }
      }

      @media (min-width: 1024px) {
        .st-variants__selector-label { font-size: 1.5rem; line-height: 2.25rem; }
      }

      /* Color buttons — horizontal scrollable row (matches source) */
      .st-variants__color-buttons {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        overflow-x: auto;
        scrollbar-width: thin;
        scrollbar-color: ${brandColor} #F1F1F1;
      }

      .st-variants__color-btn {
        display: flex;
        align-items: center;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.25rem 0;
        flex-shrink: 0;
      }

      .st-variants__color-btn:first-of-type { padding-inline-start: 0.25rem; }

      .st-variants__color-dot {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 9999px;
        position: relative;
        z-index: 20;
        flex-shrink: 0;
        transition: width 0.2s, height 0.2s, outline 0.2s;
        outline: 0 solid transparent;
      }

      .st-variants__color-btn.is-active .st-variants__color-dot {
        width: 2.25rem;
        height: 2.25rem;
        outline: 1.5px solid ${brandColor};
        outline-offset: 2.5px;
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
        transition: max-width 0.5s ease-in-out, margin-inline-start 0.5s ease-in-out, opacity 0.5s ease-in-out;
      }

      @media (min-width: 1024px) {
        .st-variants__color-label { font-size: 1rem; }
      }

      .st-variants__color-btn.is-active .st-variants__color-label {
        max-width: 200px;
        opacity: 1;
        margin-inline-start: 8px;
      }

      /* Desktop lifestyle panel — 58%, gray bg, end-side rounding */
      .st-variants__side-panel {
        display: none;
        cursor: pointer;
        width: 58%;
        height: 100%;
        background: ${grayColor};
        border-start-end-radius: 0.75rem;
        border-end-end-radius: 0.75rem;
        overflow: hidden;
      }

      @media (min-width: 1024px) {
        .st-variants__side-panel { display: block; }
      }

      .st-variants__side-panel:hover { opacity: 0.9; }

      .st-variants__side-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 0.35s ease;
      }

      /* Decorative pointer arrow (desktop only, matches source) */
      .st-variants__pointer {
        position: absolute;
        top: -2rem;
        inset-inline-end: -2px;
        width: 101px;
        height: 103px;
        display: none;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }

      @media (min-width: 1024px) {
        .st-variants__pointer { display: flex; }
      }

      .st-variants__pointer img {
        width: 101px;
        height: 103px;
        display: block;
      }

      .st-variants__lightbox {
        position: fixed;
        inset: 0;
        z-index: 1000;
        background: rgba(34, 34, 34, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .st-variants__lightbox-inner {
        position: relative;
        max-width: 85vw;
        max-height: 85vh;
      }

      @media (min-width: 1024px) {
        .st-variants__lightbox-inner { max-width: 75vw; }
      }

      .st-variants__lightbox-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 12px;
        max-height: 85vh;
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

      @media (prefers-reduced-motion: reduce) {
        .st-variants *,
        .st-variants *::before,
        .st-variants *::after {
          transition: none !important;
          animation: none !important;
        }
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
          <h3 class="st-variants__title" data-animate="fade-up">
            ${this.config.section_title}
          </h3>

          <div class="st-variants__layout" data-animate="fade-up">
            <!-- Selector panel -->
            <div class="st-variants__selector">
              <div class="st-variants__product-wrap">
                <img
                  src="${currentVariant.product_image}"
                  alt="${currentVariant.color_title}"
                  loading="lazy"
                  class="st-variants__product-image ${transitioningClass}"
                  @click="${() => this.openLightbox(currentVariant.product_image)}"
                />
                <img
                  src="${currentVariant.side_image}"
                  alt="${currentVariant.color_title}"
                  loading="lazy"
                  class="st-variants__mobile-side-image ${transitioningClass}"
                  @click="${() => this.openLightbox(currentVariant.side_image)}"
                />
              </div>

              <div class="st-variants__selector-footer">
                <h4 class="st-variants__selector-label">
                  ${this.config.selector_label}
                </h4>

                <div class="st-variants__color-buttons">
                  ${variants.map(
                    (variant, index) => html`
                      <button
                        type="button"
                        class="st-variants__color-btn ${index === safeIndex ? 'is-active' : ''}"
                        aria-label="${variant.color_title}"
                        aria-current="${index === safeIndex ? 'true' : 'false'}"
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
            </div>

            <!-- Desktop lifestyle panel -->
            <div
              class="st-variants__side-panel"
              @click="${() => this.openLightbox(currentVariant.side_image)}"
            >
              <img
                src="${currentVariant.side_image}"
                alt="${currentVariant.color_title}"
                loading="eager"
                class="st-variants__side-image ${transitioningClass}"
              />
            </div>

            <!-- Decorative pointer arrow -->
            <div class="st-variants__pointer">
              <img src="/assets/pointer.svg" alt="" title="إشارة للمنتج" />
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
