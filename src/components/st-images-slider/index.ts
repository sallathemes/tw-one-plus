import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export default class StImagesSlider extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    brand_color: string;
    section_title: string;
    images: Array<{ src: string; title: string }>;
  };

  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }

  private styleElement: HTMLStyleElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.styleElement?.remove();
  }

  private get track(): HTMLElement | null {
    return this.querySelector('.st-images-slider__track');
  }

  private cardWidth(): number {
    const card = this.querySelector('.st-images-slider__item') as HTMLElement | null;
    if (!card) return 300;
    // include the gap (1.5rem = 24px)
    return card.offsetWidth + 24;
  }

  private scrollPrev() {
    const track = this.track;
    if (!track) return;
    const isRtl = document.documentElement.dir === 'rtl';
    track.scrollBy({ left: isRtl ? this.cardWidth() : -this.cardWidth(), behavior: 'smooth' });
  }

  private scrollNext() {
    const track = this.track;
    if (!track) return;
    const isRtl = document.documentElement.dir === 'rtl';
    track.scrollBy({ left: isRtl ? -this.cardWidth() : this.cardWidth(), behavior: 'smooth' });
  }

  injectStyles() {
    if (this.styleElement) return;

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .st-images-slider {
        display: block;
        width: 100%;
        padding: 4rem 0;
      }

      .st-images-slider__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1.5rem 2rem;
      }

      .st-images-slider__title {
        font-size: clamp(1.5rem, 4vw, 3rem);
        font-weight: 700;
        line-height: 1.4;
        max-width: 727px;
        margin: 0;
      }

      .st-images-slider__nav {
        display: flex;
        gap: 0.5rem;
        flex-shrink: 0;
      }

      .st-images-slider__nav-btn {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        border: 1.5px solid currentColor;
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        opacity: 0.6;
        transition: opacity 0.2s ease;
        padding: 0;
      }

      .st-images-slider__nav-btn:hover {
        opacity: 1;
      }

      /* Scrollable track */
      .st-images-slider__track {
        display: flex;
        gap: 1.5rem;
        padding-inline: 1.5rem;
        padding-bottom: 1.25rem;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        /* Custom scrollbar — thin blue progress bar */
        scrollbar-width: thin;
        scrollbar-color: #0071E3 #E9E9E9;
      }

      .st-images-slider__track::-webkit-scrollbar {
        height: 4px;
      }

      .st-images-slider__track::-webkit-scrollbar-track {
        background: #E9E9E9;
        border-radius: 2px;
      }

      .st-images-slider__track::-webkit-scrollbar-thumb {
        background: #0071E3;
        border-radius: 2px;
      }

      /* Portrait cards */
      .st-images-slider__item {
        position: relative;
        flex-shrink: 0;
        width: clamp(280px, 35vw, 460px);
        aspect-ratio: 3 / 4;
        border-radius: 1.5rem;
        overflow: hidden;
        cursor: pointer;
        scroll-snap-align: center;
        transition: opacity 0.2s ease;
      }

      .st-images-slider__item:hover {
        opacity: 0.8;
      }

      /* Image fills the full card */
      .st-images-slider__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      /* Label overlay — bottom-inline-end, white bold text */
      .st-images-slider__label {
        position: absolute;
        bottom: 1rem;
        inset-inline-end: 1rem;
        color: white;
        font-weight: 700;
        font-size: 0.875rem;
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
        pointer-events: none;
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const bgColor = this.config.bg_color || '#ffffff';
    const brandColor = this.config.brand_color || '#0071E3';
    const textColor = this.config.bg_color === '#050505' ? '#ffffff' : '#050505';
    const images = this.config.images || [];

    return html`
      <section
        class="st-images-slider"
        style="background: ${bgColor}; color: ${textColor}; --st-images-slider-brand: ${brandColor};"
      >
        <!-- Header row: title + nav arrows -->
        <div class="st-images-slider__header">
          <h2 class="st-images-slider__title">${this.config.section_title}</h2>
          <div class="st-images-slider__nav">
            <button
              class="st-images-slider__nav-btn"
              aria-label="السابق"
              @click=${() => this.scrollPrev()}
            >&#8249;</button>
            <button
              class="st-images-slider__nav-btn"
              aria-label="التالي"
              @click=${() => this.scrollNext()}
            >&#8250;</button>
          </div>
        </div>

        <!-- Scroll-snap track -->
        <div class="st-images-slider__track">
          ${images.map(
            (img) => html`
              <div class="st-images-slider__item">
                <img
                  src="${img.src}"
                  alt="${img.title || ''}"
                  class="st-images-slider__img"
                  loading="lazy"
                />
                ${img.title
                  ? html`<span class="st-images-slider__label">${img.title}</span>`
                  : ''}
              </div>
            `
          )}
        </div>
      </section>
    `;
  }
}
