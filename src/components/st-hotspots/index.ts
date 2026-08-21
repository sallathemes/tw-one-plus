import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import AOS from '../../utils/animate-on-scroll';
import '../../utils/fonts';

export default class StHotspots extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    primary_color: string;
    secondary_color: string;
    brand_color: string;
    card_bg_color: string;
    section_title: string;
    section_subtitle: string;
    product_image: string;
    product_image_alt: string;
    hotspots: Array<{
      x_percent: number;
      y_percent: number;
      image: string;
      title: string;
      description: string;
    }>;
  };

  @state() private activeIndex = 0;

  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }

  private styleElement: HTMLStyleElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
    AOS.init();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.styleElement?.remove();
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    AOS.refresh();
  }

  private selectHotspot(index: number) {
    if (index === this.activeIndex) return;
    this.activeIndex = index;
  }

  injectStyles() {
    if (this.styleElement) return;

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .st-hotspots {
        display: block;
        width: 100%;
        padding: 3.5rem 0;
        background: var(--st-hotspots-bg, #F5F5F5);
        overflow: visible;
      }

      .st-hotspots__container {
        max-width: 1160px;
        margin: 0 auto;
        padding: 0 1.25rem;
      }

      @media (min-width: 1024px) {
        .st-hotspots__container { padding: 0 2.5rem; }
      }

      /* ── header ── */
      .st-hotspots__header {
        text-align: center;
        max-width: 640px;
        margin: 0 auto 3rem;
      }

      .st-hotspots__header h2 {
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1.35;
        color: var(--st-hotspots-primary, #111111);
        margin: 0 0 0.85rem;
      }

      @media (min-width: 768px) {
        .st-hotspots__header h2 { font-size: 1.875rem; }
      }

      @media (min-width: 1280px) {
        .st-hotspots__header h2 { font-size: 2.25rem; }
      }

      .st-hotspots__title-bar {
        display: inline-block;
        width: 64px;
        height: 4px;
        border-radius: 9999px;
        background: var(--st-hotspots-brand, #1F3A5F);
        margin: 0 0 0.85rem;
      }

      .st-hotspots__header p {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.75;
        color: var(--st-hotspots-secondary, #666666);
      }

      /* ── layout: card + media ── */
      .st-hotspots__layout {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        gap: 2rem;
      }

      @media (min-width: 768px) {
        .st-hotspots__layout {
          flex-direction: row-reverse;
          align-items: stretch;
          gap: 2.5rem;
        }
      }

      @media (min-width: 1280px) {
        .st-hotspots__layout { gap: 4rem; }
      }

      /* ── content card ── */
      .st-hotspots__card {
        width: 100%;
        max-width: 420px;
        background: var(--st-hotspots-card-bg, #ffffff);
        border-radius: 1.25rem;
        padding: 1.5rem;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
        display: flex;
        flex-direction: column;
      }

      @media (min-width: 768px) {
        .st-hotspots__card {
          flex: 0 0 380px;
          padding: 1.75rem;
          justify-content: center;
        }
      }

      .st-hotspots__card-inner {
        animation: stHotspotsFadeIn 0.4s ease both;
      }

      @keyframes stHotspotsFadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .st-hotspots__card-img {
        width: 100%;
        height: 220px;
        object-fit: cover;
        border-radius: 0.85rem;
        display: block;
        margin: 0 0 1.25rem;
      }

      .st-hotspots__card-title {
        font-size: 1.2rem;
        font-weight: 800;
        color: var(--st-hotspots-primary, #111111);
        margin: 0 0 0.65rem;
      }

      .st-hotspots__card-desc {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.8;
        color: var(--st-hotspots-secondary, #666666);
      }

      /* ── numbered nav pills inside the card ── */
      .st-hotspots__nav {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        margin-top: 1.5rem;
        padding-top: 1.25rem;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
      }

      .st-hotspots__nav-btn {
        width: 36px;
        height: 36px;
        border-radius: 9999px;
        border: 1.5px solid rgba(0, 0, 0, 0.15);
        background: transparent;
        color: var(--st-hotspots-primary, #111111);
        font-size: 0.9rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
      }

      .st-hotspots__nav-btn:hover {
        border-color: var(--st-hotspots-brand, #1F3A5F);
      }

      .st-hotspots__nav-btn.is-active {
        background: var(--st-hotspots-brand, #1F3A5F);
        border-color: var(--st-hotspots-brand, #1F3A5F);
        color: #ffffff;
        transform: scale(1.05);
      }

      /* ── product media + hotspot markers ── */
      .st-hotspots__media {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      @media (min-width: 768px) {
        .st-hotspots__media { flex: 1 1 auto; min-width: 0; }
      }

      .st-hotspots__image-frame {
        position: relative;
        width: 100%;
        max-width: 460px;
      }

      @media (min-width: 768px) {
        .st-hotspots__image-frame { max-width: 520px; }
      }

      .st-hotspots__product-img {
        width: 100%;
        height: auto;
        display: block;
      }

      /* Physically anchored to the photographed product — deliberately NOT
         using inset-inline-start, since the image itself is never mirrored
         under RTL and the marker must stay pinned to the same physical spot. */
      .st-hotspots__marker {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 34px;
        height: 34px;
        border-radius: 9999px;
        border: 2px solid var(--st-hotspots-brand, #1F3A5F);
        background: rgba(255, 255, 255, 0.92);
        color: var(--st-hotspots-primary, #111111);
        font-size: 0.85rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0;
        transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
      }

      @media (min-width: 768px) {
        .st-hotspots__marker { width: 40px; height: 40px; font-size: 0.95rem; }
      }

      .st-hotspots__marker:hover {
        transform: translate(-50%, -50%) scale(1.08);
      }

      .st-hotspots__marker.is-active {
        background: var(--st-hotspots-brand, #1F3A5F);
        color: #ffffff;
      }

      .st-hotspots__marker.is-active::after {
        content: '';
        position: absolute;
        inset: -8px;
        border-radius: 9999px;
        border: 2px solid var(--st-hotspots-brand, #1F3A5F);
        animation: stHotspotsPulse 2.2s ease-out infinite;
        pointer-events: none;
      }

      @keyframes stHotspotsPulse {
        0% { transform: scale(0.85); opacity: 0.6; }
        100% { transform: scale(1.35); opacity: 0; }
      }

      @media (prefers-reduced-motion: reduce) {
        .st-hotspots__card-inner { animation: none; }
        .st-hotspots__marker.is-active::after { animation: none; display: none; }
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  render() {
    if (!this.config) return html``;

    const bgColor = this.config.bg_color || '#F5F5F5';
    const primaryColor = this.config.primary_color || '#111111';
    const secondaryColor = this.config.secondary_color || '#666666';
    const brandColor = this.config.brand_color || '#1F3A5F';
    const cardBgColor = this.config.card_bg_color || '#ffffff';
    const hotspots = this.config.hotspots || [];
    const activeIndex = Math.min(this.activeIndex, Math.max(hotspots.length - 1, 0));
    const active = hotspots[activeIndex];

    return html`
      <section
        id="st-hotspots"
        class="st-hotspots"
        style="
          --st-hotspots-bg: ${bgColor};
          --st-hotspots-primary: ${primaryColor};
          --st-hotspots-secondary: ${secondaryColor};
          --st-hotspots-brand: ${brandColor};
          --st-hotspots-card-bg: ${cardBgColor};
        "
      >
        <div class="st-hotspots__container">
          <div class="st-hotspots__header" data-animate="fade-up">
            <span class="st-hotspots__title-bar"></span>
            <h2>${this.config.section_title}</h2>
            ${this.config.section_subtitle
              ? html`<p>${this.config.section_subtitle}</p>`
              : ''}
          </div>

          <div class="st-hotspots__layout">
            <div class="st-hotspots__card" data-animate="fade-up" data-delay="80">
              ${active
                ? repeat(
                    [active],
                    () => activeIndex,
                    (h) => html`
                      <div class="st-hotspots__card-inner">
                        ${h.image
                          ? html`<img
                              class="st-hotspots__card-img"
                              loading="lazy"
                              src="${h.image}"
                              alt="${h.title || ''}"
                            />`
                          : ''}
                        ${h.title
                          ? html`<h3 class="st-hotspots__card-title">
                              ${h.title}
                            </h3>`
                          : ''}
                        ${h.description
                          ? html`<p class="st-hotspots__card-desc">
                              ${h.description}
                            </p>`
                          : ''}
                      </div>
                    `
                  )
                : ''}

              ${hotspots.length > 1
                ? html`
                    <div class="st-hotspots__nav">
                      ${hotspots.map(
                        (_, i) => html`
                          <button
                            type="button"
                            class="st-hotspots__nav-btn ${i === activeIndex ? 'is-active' : ''}"
                            aria-label="${i + 1}"
                            @click="${() => this.selectHotspot(i)}"
                          >
                            ${i + 1}
                          </button>
                        `
                      )}
                    </div>
                  `
                : ''}
            </div>

            <div class="st-hotspots__media" data-animate="fade-up" data-delay="0">
              <div class="st-hotspots__image-frame">
                <img
                  class="st-hotspots__product-img"
                  loading="lazy"
                  src="${this.config.product_image}"
                  alt="${this.config.product_image_alt || this.config.section_title || ''}"
                />
                ${hotspots.map(
                  (h, i) => html`
                    <button
                      type="button"
                      class="st-hotspots__marker ${i === activeIndex ? 'is-active' : ''}"
                      style="left: ${h.x_percent}%; top: ${h.y_percent}%;"
                      aria-label="${h.title || i + 1}"
                      @click="${() => this.selectHotspot(i)}"
                    >
                      ${i + 1}
                    </button>
                  `
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
