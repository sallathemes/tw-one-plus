import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ScrollScene } from '../../utils/scroll-scene';
import '../../utils/fonts';

export default class StImagesSlider extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    primary_color: string;
    brand_color: string;
    section_title: string;
    images: Array<{ src: string; title: string }>;
  };

  @state() private lightboxOpen = false;
  @state() private lightboxIndex = 0;

  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }

  private styleElement: HTMLStyleElement | null = null;
  private scene: ScrollScene | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
    window.addEventListener('keydown', this.keyHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.keyHandler);
    this.scene?.destroy();
    this.scene = null;
    this.styleElement?.remove();
  }

  firstUpdated() {
    this.syncScene();
  }

  // Self-driving rAF loop (not a 'scroll' listener) so the parallax still
  // animates inside editor-preview shells that scroll via a transformed
  // wrapper or a non-composed shadow-DOM scroller.
  private syncScene() {
    if (this.scene) return;
    const wrap = this.querySelector('.st-images-slider__parallax') as HTMLElement | null;
    if (!wrap) return;
    this.scene = new ScrollScene(wrap, this.updateParallax);
  }

  /**
   * Scroll-linked slide-in matching source's Framer useScroll/useTransform:
   * x goes from -100% to 0% as the track scrolls from viewport bottom
   * (offset ['0 1', '1 1']).
   */
  private updateParallax = (_p: number, rect: DOMRect, viewportHeight: number) => {
    const wrap = this.querySelector('.st-images-slider__parallax') as HTMLElement | null;
    if (!wrap) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wrap.style.transform = 'none';
      return;
    }

    const progress =
      rect.height > 0 ? Math.min(1, Math.max(0, (viewportHeight - rect.top) / rect.height)) : 0;
    wrap.style.transform = `translateX(${(1 - progress) * -100}%)`;
  };

  private keyHandler = (e: KeyboardEvent) => {
    if (!this.lightboxOpen) return;
    if (e.key === 'Escape') this.closeLightbox();
    if (e.key === 'ArrowLeft') this.lightboxStep(1);
    if (e.key === 'ArrowRight') this.lightboxStep(-1);
  };

  private openLightbox(index: number) {
    this.lightboxIndex = index;
    this.lightboxOpen = true;
    this.requestUpdate();
  }

  private closeLightbox() {
    this.lightboxOpen = false;
    this.requestUpdate();
  }

  private lightboxStep(dir: number) {
    const count = this.config?.images?.length || 0;
    if (!count) return;
    this.lightboxIndex = (this.lightboxIndex + dir + count) % count;
    this.requestUpdate();
  }

  injectStyles() {
    if (this.styleElement) return;

    const primaryColor = this.config?.primary_color || '#050505';
    const brandColor = this.config?.brand_color || '#0071E3';

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .st-images-slider {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 2.5rem 0;
        overflow: hidden;
      }

      @media (min-width: 768px) {
        .st-images-slider { padding: 4rem 0; }
      }

      .st-images-slider__header-wrap {
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 0.5rem;
      }

      @media (min-width: 768px) {
        .st-images-slider__header-wrap { padding: 0 1rem; }
      }

      @media (min-width: 1024px) {
        .st-images-slider__header-wrap { padding: 0 2.5rem; }
      }

      @media (min-width: 1280px) {
        .st-images-slider__header-wrap { padding: 0 88px; }
      }

      .st-images-slider__title {
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1.35;
        max-width: 727px;
        margin: 0;
        text-align: start;
        color: ${primaryColor};
      }

      @media (min-width: 768px) {
        .st-images-slider__title { font-size: 1.875rem; line-height: 40px; }
      }

      @media (min-width: 1024px) {
        .st-images-slider__title { font-size: 2.25rem; line-height: 48px; }
      }

      @media (min-width: 1280px) {
        .st-images-slider__title { font-size: 40px; line-height: 64px; }
      }

      /* Parallax wrapper — slides in from -100% as you scroll (source Framer x transform) */
      .st-images-slider__parallax {
        width: 100%;
        padding-inline-start: calc((100vw - 1440px) / 2 + 88px);
        will-change: transform;
      }

      /* Scrollable track */
      .st-images-slider__track {
        display: flex;
        gap: 1.5rem;
        padding: 1rem 0.5rem;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
        scrollbar-color: ${brandColor} #F1F1F1;
      }

      @media (min-width: 768px) {
        .st-images-slider__track { padding: 1.5rem 1rem; }
      }

      @media (min-width: 1024px) {
        .st-images-slider__track { padding: 1.5rem 2.5rem; }
      }

      @media (min-width: 1280px) {
        .st-images-slider__track { padding: 2rem 0; }
      }

      .st-images-slider__track::-webkit-scrollbar { height: 8px; }

      .st-images-slider__track::-webkit-scrollbar-track {
        background: #F1F1F1;
        border-radius: 4px;
      }

      .st-images-slider__track::-webkit-scrollbar-thumb {
        background: ${brandColor};
        border-radius: 4px;
      }

      /* Cards — matches source: min-w min(90%, 565px), h 364px / md 464px */
      .st-images-slider__item {
        position: relative;
        flex-shrink: 0;
        min-width: min(90%, 565px);
        height: 364px;
        cursor: pointer;
        transition: opacity 0.2s ease;
      }

      @media (min-width: 768px) {
        .st-images-slider__item { height: 464px; }
      }

      .st-images-slider__item:hover { opacity: 0.8; }

      .st-images-slider__item:last-of-type { margin-inline-end: 0.5rem; }

      .st-images-slider__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 1rem;
        display: block;
      }

      /* Lightbox (source ImageDialog equivalent) */
      .st-images-slider__lightbox {
        position: fixed;
        inset: 0;
        z-index: 50;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(34, 34, 34, 0.5);
      }

      .st-images-slider__lightbox-content {
        max-width: 85%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }

      @media (min-width: 1024px) {
        .st-images-slider__lightbox-content { max-width: 75%; }
      }

      .st-images-slider__lightbox-main {
        position: relative;
        display: flex;
        align-items: center;
      }

      .st-images-slider__lightbox-img {
        max-height: calc(100vh - 200px);
        width: 100%;
        max-width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
        object-fit: contain;
      }

      .st-images-slider__lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        border: none;
        cursor: pointer;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .st-images-slider__lightbox-nav--prev { inset-inline-start: 0.5rem; }
      .st-images-slider__lightbox-nav--next { inset-inline-end: 0.5rem; }

      .st-images-slider__lightbox-thumbs {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 8px;
        flex-wrap: wrap;
      }

      .st-images-slider__lightbox-thumb {
        height: 100px;
        width: 100px;
        overflow: hidden;
        padding: 0;
        border: 2px solid transparent;
        background: none;
        cursor: pointer;
      }

      .st-images-slider__lightbox-thumb.is-active { border-color: ${brandColor}; }

      .st-images-slider__lightbox-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const bgColor = this.config.bg_color || '#ffffff';
    const images = this.config.images || [];

    return html`
      <section class="st-images-slider" style="background: ${bgColor};">
        <!-- Section header (start-aligned, matches source SectionHeader) -->
        <div class="st-images-slider__header-wrap">
          <h3 class="st-images-slider__title">${this.config.section_title}</h3>
        </div>

        <!-- Parallax wrapper + scrollable track -->
        <div class="st-images-slider__parallax">
          <div class="st-images-slider__track">
            ${images.map(
              (img, i) => html`
                <div
                  class="st-images-slider__item"
                  @click=${() => this.openLightbox(i)}
                >
                  <img
                    src="${img.src}"
                    alt="${img.title || ''}"
                    class="st-images-slider__img"
                    loading="lazy"
                  />
                </div>
              `
            )}
          </div>
        </div>

        <!-- Lightbox -->
        ${this.lightboxOpen && images.length
          ? html`
              <div
                class="st-images-slider__lightbox"
                @click=${(e: Event) => {
                  if (e.target === e.currentTarget) this.closeLightbox();
                }}
              >
                <div class="st-images-slider__lightbox-content">
                  <div class="st-images-slider__lightbox-main">
                    <img
                      class="st-images-slider__lightbox-img"
                      src="${images[this.lightboxIndex].src}"
                      alt="${images[this.lightboxIndex].title || ''}"
                    />
                    ${images.length > 1
                      ? html`
                          <button
                            class="st-images-slider__lightbox-nav st-images-slider__lightbox-nav--prev"
                            aria-label="السابق"
                            @click=${() => this.lightboxStep(-1)}
                          >&#8250;</button>
                          <button
                            class="st-images-slider__lightbox-nav st-images-slider__lightbox-nav--next"
                            aria-label="التالي"
                            @click=${() => this.lightboxStep(1)}
                          >&#8249;</button>
                        `
                      : ''}
                  </div>
                  ${images.length > 1
                    ? html`
                        <div class="st-images-slider__lightbox-thumbs">
                          ${images.map(
                            (img, i) => html`
                              <button
                                class="st-images-slider__lightbox-thumb ${i === this.lightboxIndex ? 'is-active' : ''}"
                                @click=${() => { this.lightboxIndex = i; this.requestUpdate(); }}
                              >
                                <img src="${img.src}" alt="${img.title || ''}" loading="lazy" />
                              </button>
                            `
                          )}
                        </div>
                      `
                    : ''}
                </div>
              </div>
            `
          : ''}
      </section>
    `;
  }
}
