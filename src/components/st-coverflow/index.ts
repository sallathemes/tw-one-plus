import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import AOS from '../../utils/animate-on-scroll';
import '../../utils/fonts';

interface CoverflowItem {
  tag: string;
  title_line1: string;
  title_line2: string;
  desc: string;
  image: string;
  cta_text: string;
  cta_link: string;
}

export default class StCoverflow extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    text_color: string;
    secondary_color: string;
    brand_color: string;
    section_label: string;
    autoplay: boolean;
    autoplay_delay: number;
    items: CoverflowItem[];
  };

  @state() private currentIndex = 0;
  @state() private isHovered = false;

  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }

  private styleElement: HTMLStyleElement | null = null;
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;
  private touchStartX = 0;

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
    AOS.init();
    window.addEventListener('keydown', this.keyHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.keyHandler);
    this.stopAutoplay();
    this.styleElement?.remove();
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    AOS.refresh();
    this.syncAutoplay();
  }

  private get total() {
    return this.config?.items?.length || 0;
  }

  private get isRtl() {
    return (document.documentElement.dir || 'rtl') === 'rtl';
  }

  private nextSlide = () => {
    if (this.total < 2) return;
    this.currentIndex = (this.currentIndex + 1) % this.total;
  };

  private prevSlide = () => {
    if (this.total < 2) return;
    this.currentIndex = (this.currentIndex - 1 + this.total) % this.total;
  };

  private goToSlide(index: number) {
    if (this.total < 1) return;
    this.currentIndex = index % this.total;
  }

  private syncAutoplay() {
    const shouldRun = !!this.config?.autoplay && !this.isHovered && this.total > 1;
    if (shouldRun && !this.autoplayTimer) {
      const delay = this.config?.autoplay_delay || 5000;
      this.autoplayTimer = setInterval(this.nextSlide, delay);
    } else if (!shouldRun && this.autoplayTimer) {
      this.stopAutoplay();
    }
  }

  private stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  private keyHandler = (e: KeyboardEvent) => {
    // Matches the theme's RTL-first arrow convention (see st-images-slider).
    if (e.key === 'ArrowLeft') this.nextSlide();
    if (e.key === 'ArrowRight') this.prevSlide();
  };

  private onMouseEnter = () => {
    this.isHovered = true;
    this.syncAutoplay();
  };

  private onMouseLeave = () => {
    this.isHovered = false;
    this.syncAutoplay();
  };

  private onTouchStart = (e: TouchEvent) => {
    this.touchStartX = e.touches[0].clientX;
  };

  private onTouchEnd = (e: TouchEvent) => {
    const delta = e.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(delta) < 45) return;
    const isRtl = this.isRtl;
    if (delta < 0) {
      isRtl ? this.prevSlide() : this.nextSlide();
    } else {
      isRtl ? this.nextSlide() : this.prevSlide();
    }
  };

  injectStyles() {
    if (this.styleElement) return;

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .st-coverflow {
        position: relative;
        display: flex;
        width: 100%;
        min-height: 720px;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        padding: 3.5rem 0;
        background: var(--st-coverflow-bg, #0c0a09);
        color: var(--st-coverflow-text, #ffffff);
        user-select: none;
      }

      .st-coverflow__bg {
        position: absolute;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;
      }

      .st-coverflow__bg img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.22) blur(32px);
        transform: scale(1.15);
        transition: opacity 1000ms ease;
      }

      .st-coverflow__bg::after {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, rgba(12,10,9,0.3) 0%, rgba(12,10,9,0.92) 100%);
      }

      .st-coverflow__inner {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 1152px;
        margin: 0 auto;
        padding: 0 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .st-coverflow__eyebrow {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin: 0 0 2rem;
      }

      .st-coverflow__eyebrow-line {
        width: 36px;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--st-coverflow-brand, #c5a880));
      }

      .st-coverflow__eyebrow-line--end {
        background: linear-gradient(90deg, var(--st-coverflow-brand, #c5a880), transparent);
      }

      .st-coverflow__eyebrow h3 {
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--st-coverflow-brand, #c5a880);
        margin: 0;
      }

      .st-coverflow__stage {
        position: relative;
        width: 100%;
        height: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem;
        perspective: 1400px;
      }

      .st-coverflow__card {
        position: absolute;
        width: 300px;
        height: 460px;
        border-radius: 18px;
        overflow: hidden;
        background: #171311;
        border: 1px solid rgba(255, 255, 255, 0.12);
        transform-origin: center center;
        transition: transform 800ms cubic-bezier(0.25, 1, 0.5, 1),
                    opacity 800ms cubic-bezier(0.25, 1, 0.5, 1),
                    filter 800ms cubic-bezier(0.25, 1, 0.5, 1);
      }

      @media (min-width: 640px) {
        .st-coverflow__card { width: 330px; height: 500px; }
      }

      .st-coverflow__card.is-center {
        box-shadow: 0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(197,168,128,0.25);
        cursor: default;
      }

      .st-coverflow__card:not(.is-center) {
        cursor: pointer;
      }

      .st-coverflow__card-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .st-coverflow__card-vignette {
        position: absolute;
        inset: 0;
        z-index: 10;
        pointer-events: none;
        background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.68) 60%, rgba(0,0,0,0.96) 100%);
      }

      .st-coverflow__card-content {
        position: relative;
        z-index: 20;
        width: 100%;
        height: 100%;
        padding: 20px 18px 22px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
        box-sizing: border-box;
        opacity: 0;
        transform: translateY(16px);
        transition: opacity 500ms ease, transform 500ms ease;
        pointer-events: none;
      }

      .st-coverflow__card.is-center .st-coverflow__card-content {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }

      .st-coverflow__card-tag {
        display: block;
        text-align: end;
        width: 100%;
        font-size: 0.78rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        color: rgba(255,255,255,0.9);
        text-shadow: 0 2px 6px rgba(0,0,0,0.8);
      }

      .st-coverflow__card-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        margin-top: auto;
        padding-bottom: 4px;
      }

      .st-coverflow__card-title {
        font-size: 1.5rem;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--st-coverflow-text, #ffffff);
        margin: 0;
        line-height: 1.15;
        text-shadow: 0 3px 12px rgba(0,0,0,0.95);
      }

      .st-coverflow__card-title-2 {
        font-size: 1rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--st-coverflow-text, #ffffff);
        line-height: 1.2;
        text-shadow: 0 3px 10px rgba(0,0,0,0.9);
      }

      .st-coverflow__card-divider {
        width: 34px;
        height: 2px;
        background: var(--st-coverflow-brand, #c5a880);
        border-radius: 2px;
        margin: 5px auto 4px;
        box-shadow: 0 0 8px rgba(197,168,128,0.7);
      }

      .st-coverflow__card-desc {
        font-size: 0.82rem;
        font-style: italic;
        color: var(--st-coverflow-secondary, rgba(255,255,255,0.85));
        max-width: 280px;
        margin: 0 0 10px;
        line-height: 1.4;
        text-shadow: 0 2px 8px rgba(0,0,0,0.9);
      }

      .st-coverflow__card-cta {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 18px;
        border-radius: 9999px;
        background: linear-gradient(135deg, var(--st-coverflow-brand, #c5a880) 0%, color-mix(in srgb, var(--st-coverflow-brand, #c5a880) 70%, #000) 100%);
        color: #110d0c;
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        text-decoration: none;
        box-shadow: 0 4px 14px rgba(0,0,0,0.4), 0 0 15px rgba(197,168,128,0.3);
        transition: transform 200ms ease;
      }

      .st-coverflow__card-cta:hover { transform: translateY(-2px); }
      .st-coverflow__card-cta i { font-size: 0.7rem; }

      .st-coverflow__nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 46px;
        height: 46px;
        border-radius: 9999px;
        background: rgba(0,0,0,0.55);
        border: 1px solid rgba(255,255,255,0.2);
        color: var(--st-coverflow-text, #ffffff);
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(8px);
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        z-index: 40;
        transition: background 200ms ease, transform 200ms ease;
      }

      .st-coverflow__nav:hover { background: rgba(0,0,0,0.75); }
      .st-coverflow__nav--prev { inset-inline-start: 8px; }
      .st-coverflow__nav--next { inset-inline-end: 8px; }

      @media (min-width: 1024px) {
        .st-coverflow__nav--prev { inset-inline-start: 24px; }
        .st-coverflow__nav--next { inset-inline-end: 24px; }
      }

      .st-coverflow__dots {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        z-index: 30;
      }

      .st-coverflow__dot {
        height: 8px;
        width: 8px;
        border-radius: 9999px;
        background: rgba(255,255,255,0.25);
        border: none;
        padding: 0;
        cursor: pointer;
        box-shadow: none;
        transition: width 300ms ease, background 300ms ease, box-shadow 300ms ease;
      }

      .st-coverflow__dot.is-active {
        width: 28px;
        background: var(--st-coverflow-brand, #c5a880);
        box-shadow: 0 0 10px rgba(197,168,128,0.7);
      }

      @media (prefers-reduced-motion: reduce) {
        .st-coverflow__card { transition: none; }
        .st-coverflow__card-content { transition: none; }
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  render() {
    if (!this.config || !this.config.items?.length) return html``;

    const items = this.config.items;
    const total = items.length;
    const active = items[Math.min(this.currentIndex, total - 1)];
    const rtlSign = this.isRtl ? -1 : 1;

    return html`
      <section
        id="st-coverflow"
        class="st-coverflow"
        style="
          --st-coverflow-bg: ${this.config.bg_color || '#0c0a09'};
          --st-coverflow-text: ${this.config.text_color || '#ffffff'};
          --st-coverflow-secondary: ${this.config.secondary_color || 'rgba(255,255,255,0.85)'};
          --st-coverflow-brand: ${this.config.brand_color || '#c5a880'};
        "
        @mouseenter="${this.onMouseEnter}"
        @mouseleave="${this.onMouseLeave}"
        @touchstart="${this.onTouchStart}"
        @touchend="${this.onTouchEnd}"
      >
        <div class="st-coverflow__bg">
          ${active?.image ? html`<img src="${active.image}" alt="" />` : ''}
        </div>

        <div class="st-coverflow__inner">
          ${this.config.section_label
            ? html`
                <div class="st-coverflow__eyebrow" data-animate="fade-up">
                  <span class="st-coverflow__eyebrow-line"></span>
                  <h3>${this.config.section_label}</h3>
                  <span class="st-coverflow__eyebrow-line st-coverflow__eyebrow-line--end"></span>
                </div>
              `
            : ''}

          <div class="st-coverflow__stage">
            ${items.map((item, idx) => {
              const offset = (idx - this.currentIndex + total) % total;
              const isCenter = offset === 0;

              let x = 0;
              let scale = 0.4;
              let rotate = 0;
              let opacity = 0;
              let zIndex = 0;
              let filter = 'brightness(0.4) blur(2px)';

              if (offset === 0) {
                x = 0; scale = 1; rotate = 0; opacity = 1; zIndex = 30; filter = 'brightness(1)';
              } else if (offset === 1) {
                x = 285; scale = 0.84; rotate = -24; opacity = 0.65; zIndex = 20; filter = 'brightness(0.75)';
              } else if (offset === 2) {
                x = 510; scale = 0.68; rotate = -38; opacity = 0.38; zIndex = 10; filter = 'brightness(0.55) blur(1px)';
              } else if (offset === total - 1) {
                x = -285; scale = 0.84; rotate = 24; opacity = 0.65; zIndex = 20; filter = 'brightness(0.75)';
              } else if (offset === total - 2) {
                x = -510; scale = 0.68; rotate = 38; opacity = 0.38; zIndex = 10; filter = 'brightness(0.55) blur(1px)';
              }

              x *= rtlSign;
              rotate *= rtlSign;

              return html`
                <div
                  class="st-coverflow__card ${isCenter ? 'is-center' : ''}"
                  style="
                    transform: translateX(${x}px) scale(${scale}) rotateY(${rotate}deg);
                    opacity: ${opacity};
                    z-index: ${zIndex};
                    filter: ${filter};
                  "
                  @click="${() => !isCenter && this.goToSlide(idx)}"
                >
                  <img class="st-coverflow__card-img" loading="lazy" src="${item.image}" alt="${item.title_line1 || ''}" />
                  <div class="st-coverflow__card-vignette"></div>
                  <div class="st-coverflow__card-content">
                    ${item.tag ? html`<span class="st-coverflow__card-tag">${item.tag}</span>` : html`<span></span>`}
                    <div class="st-coverflow__card-body">
                      <h2 class="st-coverflow__card-title">${item.title_line1}</h2>
                      ${item.title_line2 ? html`<span class="st-coverflow__card-title-2">${item.title_line2}</span>` : ''}
                      <span class="st-coverflow__card-divider"></span>
                      ${item.desc ? html`<p class="st-coverflow__card-desc">${item.desc}</p>` : ''}
                      ${item.cta_text
                        ? html`
                            <a class="st-coverflow__card-cta" href="${item.cta_link || '#'}">
                              <span>${item.cta_text}</span>
                              <i class="sicon-arrow-left"></i>
                            </a>
                          `
                        : ''}
                    </div>
                  </div>
                </div>
              `;
            })}

            ${total > 1
              ? html`
                  <button type="button" class="st-coverflow__nav st-coverflow__nav--prev" aria-label="السابق" @click="${this.prevSlide}">
                    <i class="sicon-arrow-right"></i>
                  </button>
                  <button type="button" class="st-coverflow__nav st-coverflow__nav--next" aria-label="التالي" @click="${this.nextSlide}">
                    <i class="sicon-arrow-left"></i>
                  </button>
                `
              : ''}
          </div>

          ${total > 1
            ? html`
                <div class="st-coverflow__dots">
                  ${items.map(
                    (_, idx) => html`
                      <button
                        type="button"
                        class="st-coverflow__dot ${idx === this.currentIndex ? 'is-active' : ''}"
                        aria-label="${idx + 1}"
                        @click="${() => this.goToSlide(idx)}"
                      ></button>
                    `
                  )}
                </div>
              `
            : ''}
        </div>
      </section>
    `;
  }
}
