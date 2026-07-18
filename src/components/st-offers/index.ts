import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import AOS from '../../utils/animate-on-scroll';
import '../../utils/fonts';

export default class StOffers extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    primary_color: string;
    secondary_color: string;
    brand_color: string;
    green_color: string;
    red_color: string;
    section_title: string;
    section_subtitle: string;
    badge_label: string;
    badge_icon: string;
    cta_label: string;
    offers: Array<{
      image: string;
      name: string;
      price_after: number;
      price_before: number;
      currency: string;
      link: string;
    }>;
  };

  // Matches source: no offer selected until the shopper picks one
  @state()
  private selectedOffer: number | null = null;

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

  // No offer picked yet: block navigation instead of following an empty/"#" link
  private handleBuyClick(e: Event) {
    if (this.selectedOffer === null) e.preventDefault();
  }

  private handleSelectOffer(index: number) {
    this.selectedOffer = index;
    this.requestUpdate();
  }

  injectStyles() {
    if (this.styleElement) return;

    const bgColor = this.config?.bg_color || '#ffffff';
    const primaryColor = this.config?.primary_color || '#050505';
    const secondaryColor = this.config?.secondary_color || '#525252';
    const brandColor = this.config?.brand_color || '#0071E3';
    const greenColor = this.config?.green_color || '#20A535';
    const redColor = this.config?.red_color || '#F62A33';
    const lightColor = '#EEEEEE';

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .st-offers {
        background: ${bgColor};
        color: ${primaryColor};
        display: block;
        overflow: hidden;
      }

      .st-offers__container {
        max-width: 1440px;
        margin: 0 auto;
        padding: 2.5rem 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        overflow: hidden;
      }

      @media (min-width: 768px) {
        .st-offers__container { padding: 4rem 1rem; }
      }

      @media (min-width: 1024px) {
        .st-offers__container { padding: 4rem 2.5rem; }
      }

      @media (min-width: 1280px) {
        .st-offers__container { padding: 4rem 88px; }
      }

      .st-offers__header {
        text-align: center;
        max-width: 619px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      /* Badge (tag above the title, green — matches source SectionHeader tag) */
      .st-offers__badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        width: max-content;
        margin: 0 auto;
        padding: 0.5rem 1rem;
        border-radius: 100px;
        border: 1px solid ${greenColor};
        background: ${greenColor}1A;
        color: ${greenColor};
      }

      .st-offers__badge i { font-size: 1.25rem; }

      .st-offers__badge span {
        font-size: 0.75rem;
        font-weight: 700;
      }

      @media (min-width: 768px) {
        .st-offers__badge span { font-size: 0.875rem; }
      }

      @media (min-width: 1024px) {
        .st-offers__badge span { font-size: 1rem; }
      }

      .st-offers__title {
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1.35;
        margin: 0 0 0.625rem;
        color: ${primaryColor};
      }

      @media (min-width: 768px) {
        .st-offers__title { font-size: 1.875rem; line-height: 40px; }
      }

      @media (min-width: 1024px) {
        .st-offers__title { font-size: 2.25rem; line-height: 48px; }
      }

      @media (min-width: 1280px) {
        .st-offers__title { font-size: 40px; line-height: 64px; }
      }

      .st-offers__subtitle {
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.8;
        color: ${secondaryColor};
        margin: 0 auto;
      }

      @media (min-width: 1024px) {
        .st-offers__subtitle { font-size: 1rem; }
      }

      /* Offers row: horizontal scroll on mobile, 3-up on desktop (matches source) */
      .st-offers__grid {
        display: flex;
        gap: 1rem;
        width: 100%;
        overflow-x: auto;
        padding-bottom: 0.5rem;
        margin-bottom: -0.5rem;
      }

      @media (min-width: 1024px) {
        .st-offers__grid {
          gap: 1.5rem;
          overflow: visible;
          justify-content: flex-start;
        }
      }

      .st-offers__card {
        cursor: pointer;
        border-radius: 1rem;
        min-width: 70%;
        width: 50%;
        max-width: 32rem;
        transition: box-shadow 0.3s ease;
      }

      @media (min-width: 640px) {
        .st-offers__card { min-width: 50%; }
      }

      @media (min-width: 1024px) {
        .st-offers__card { min-width: 0; width: 33.333%; }
      }

      .st-offers__card:hover {
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
      }

      .st-offers__card-inner {
        border: 1px solid ${lightColor};
        border-radius: 1rem;
        padding: 1rem 1rem 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        transition: border-color 0.3s ease;
      }

      .st-offers__card.is-selected .st-offers__card-inner {
        border-color: ${brandColor};
      }

      .st-offers__card-img {
        max-height: 281px;
        object-fit: contain;
        width: 100%;
      }

      .st-offers__card-name {
        font-size: 1rem;
        font-weight: 700;
        text-align: center;
        color: ${primaryColor};
        margin: 0;
      }

      @media (min-width: 768px) {
        .st-offers__card-name { font-size: 1.125rem; }
      }

      @media (min-width: 1280px) {
        .st-offers__card-name { font-size: 1.25rem; }
      }

      .st-offers__card-price {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        font-size: 0.875rem;
        margin: 0;
      }

      @media (min-width: 768px) {
        .st-offers__card-price { font-size: 1rem; }
      }

      @media (min-width: 1280px) {
        .st-offers__card-price { font-size: 1.125rem; }
      }

      .st-offers__price-after {
        font-weight: 800;
        color: ${redColor};
      }

      .st-offers__price-before {
        text-decoration: line-through;
        color: ${primaryColor};
      }

      /* Buy button — links out to the merchant's real store to complete the purchase */
      .st-offers__cta {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .st-offers__btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        width: 100%;
        max-width: 373px;
        padding: 0.75rem 1rem;
        border-radius: 1000px;
        border: 1px solid ${brandColor};
        background: ${brandColor};
        cursor: pointer;
        text-decoration: none;
        transition: opacity 0.3s ease;
      }

      @media (min-width: 1024px) {
        .st-offers__btn { padding: 1rem; }
      }

      .st-offers__btn.is-disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .st-offers__btn-label {
        font-size: 0.875rem;
        font-weight: 800;
        color: #ffffff;
      }

      @media (min-width: 1024px) {
        .st-offers__btn-label { font-size: 1rem; }
      }

      .st-offers__btn i {
        font-size: 1.125rem;
        line-height: 1;
        color: #ffffff;
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const offers = (this.config.offers || []).slice(0, 3);
    const selected = this.selectedOffer !== null ? offers[this.selectedOffer] : null;

    return html`
      <section id="st-offers" class="st-offers">
        <div class="st-offers__container" data-animate="fade-up">
          <!-- Section header: badge above title (matches source SectionHeader) -->
          <div class="st-offers__header">
            ${this.config.badge_label
              ? html`
                  <div class="st-offers__badge">
                    ${this.config.badge_icon
                      ? html`<i class="${this.config.badge_icon}"></i>`
                      : ''}
                    <span>${this.config.badge_label}</span>
                  </div>
                `
              : ''}
            <div>
              <h3 class="st-offers__title">${this.config.section_title}</h3>
              ${this.config.section_subtitle
                ? html`<h4 class="st-offers__subtitle">${this.config.section_subtitle}</h4>`
                : ''}
            </div>
          </div>

          <!-- Offers row (max 3 cards) -->
          <div class="st-offers__grid">
            ${offers.map(
              (offer, i) => html`
                <div
                  class="${classMap({ 'st-offers__card': true, 'is-selected': i === this.selectedOffer })}"
                  data-animate="bounce-in"
                  data-delay="${i * 300}"
                  @click="${() => this.handleSelectOffer(i)}"
                >
                  <div class="st-offers__card-inner">
                    <img
                      src="${offer.image}"
                      alt="${offer.name}"
                      class="st-offers__card-img"
                      loading="lazy"
                    />
                    <h5 class="st-offers__card-name">${offer.name}</h5>
                    <h6 class="st-offers__card-price">
                      <span class="st-offers__price-after">
                        ${offer.price_after} ${offer.currency}
                      </span>
                      ${offer.price_before > offer.price_after
                        ? html`
                            <span class="st-offers__price-before">
                              ${offer.price_before} ${offer.currency}
                            </span>
                          `
                        : ''}
                    </h6>
                  </div>
                </div>
              `
            )}
          </div>

          <!-- Buy: links out to the merchant's store to complete the purchase.
               Disabled (no navigation) until an offer is selected. -->
          <div class="st-offers__cta">
            <a
              class="${classMap({ 'st-offers__btn': true, 'is-disabled': !selected })}"
              href="${selected?.link || '#'}"
              aria-disabled="${!selected}"
              title="${!selected ? 'إختر عرض لتفعيل الزر' : ''}"
              @click="${this.handleBuyClick}"
            >
              <span class="st-offers__btn-label">${this.config.cta_label}</span>
              <i class="sicon-caret-left-double"></i>
            </a>
          </div>
        </div>
      </section>
    `;
  }
}
