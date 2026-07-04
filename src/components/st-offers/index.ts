import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import AOS from '../../utils/animate-on-scroll';

export default class StOffers extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    primary_color: string;
    brand_color: string;
    green_color: string;
    section_title: string;
    section_subtitle: string;
    badge_label: string;
    badge_icon: string;
    cta_normal: string;
    cta_added: string;
    offers: Array<{
      image: string;
      name: string;
      price_after: number;
      price_before: number;
      currency: string;
    }>;
  };

  @state()
  private selectedOffer: number = 0;

  @state()
  private addedToCart: boolean = false;

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

  private handleAddToCart() {
    this.addedToCart = true;
    this.requestUpdate();
    // Reset after 3 seconds
    setTimeout(() => {
      this.addedToCart = false;
      this.requestUpdate();
    }, 3000);
  }

  private handleSelectOffer(index: number) {
    this.selectedOffer = index;
    this.requestUpdate();
  }

  injectStyles() {
    if (this.styleElement) return;

    const bgColor = this.config?.bg_color || '#ffffff';
    const primaryColor = this.config?.primary_color || '#050505';
    const brandColor = this.config?.brand_color || '#0071E3';
    const greenColor = this.config?.green_color || '#20A535';

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .st-offers {
        background: ${bgColor};
        color: ${primaryColor};
        padding: 5rem 1.5rem;
        display: block;
        overflow: hidden;
      }

      .st-offers__container {
        max-width: 1200px;
        margin: 0 auto;
      }

      .st-offers__header {
        text-align: center;
        margin-bottom: 3rem;
        max-width: 640px;
        margin-left: auto;
        margin-right: auto;
      }

      .st-offers__title {
        font-size: clamp(1.5rem, 3vw, 3rem);
        font-weight: 700;
        margin-bottom: 1rem;
        line-height: 1.3;
        color: ${primaryColor};
      }

      .st-offers__subtitle {
        opacity: 0.7;
        font-size: 1rem;
        line-height: 1.8;
        margin: 0 auto;
      }

      .st-offers__grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        margin-bottom: 3rem;
      }

      @media (max-width: 768px) {
        .st-offers__grid {
          grid-template-columns: 1fr;
        }
      }

      .st-offers__card {
        border: 2px solid transparent;
        border-radius: 1.5rem;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.03);
        cursor: pointer;
        transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
      }

      .st-offers__card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      }

      .st-offers__card.is-selected {
        border-color: ${brandColor};
        box-shadow: 0 0 0 2px ${brandColor}20;
      }

      .st-offers__card-image-wrap {
        aspect-ratio: 1;
        overflow: hidden;
      }

      .st-offers__card-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }

      .st-offers__card:hover .st-offers__card-img {
        transform: scale(1.05);
      }

      .st-offers__card-info {
        padding: 1rem 1.25rem;
      }

      .st-offers__card-name {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: ${primaryColor};
      }

      .st-offers__card-price {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .st-offers__price-after {
        font-size: 1.125rem;
        font-weight: 700;
        color: ${brandColor};
      }

      .st-offers__price-before {
        font-size: 0.875rem;
        text-decoration: line-through;
        opacity: 0.5;
      }

      .st-offers__cta {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .st-offers__badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 9999px;
        background: ${brandColor}1A;
        color: ${brandColor};
        border: 1px solid ${brandColor}33;
        font-size: 0.875rem;
      }

      .st-offers__btn {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 2.5rem;
        border-radius: 9999px;
        background: ${brandColor};
        color: #ffffff;
        border: none;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s, background 0.3s ease;
      }

      .st-offers__btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px ${brandColor}40;
      }

      .st-offers__btn--added {
        background: ${greenColor};
      }

      .st-offers__btn--added:hover {
        box-shadow: 0 8px 20px ${greenColor}40;
      }

      .st-offers__checkmark-path {
        stroke-dasharray: 30;
        stroke-dashoffset: 30;
      }

      .st-offers__checkmark-path.is-drawn {
        stroke-dashoffset: 0;
        transition: stroke-dashoffset 0.3s ease;
      }

      [dir="rtl"] .st-offers__card-info {
        text-align: right;
      }

      [dir="ltr"] .st-offers__card-info {
        text-align: left;
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const offers = (this.config.offers || []).slice(0, 3);

    return html`
      <section id="st-offers" class="st-offers">
        <div class="st-offers__container">
          <!-- Section header -->
          <div class="st-offers__header" data-animate="fade-up">
            <h2 class="st-offers__title">${this.config.section_title}</h2>
            ${this.config.section_subtitle
              ? html`<p class="st-offers__subtitle">${this.config.section_subtitle}</p>`
              : ''}
          </div>

          <!-- Offers grid (max 3 cards) -->
          <div class="st-offers__grid">
            ${offers.map(
              (offer, i) => html`
                <div
                  class="st-offers__card ${i === this.selectedOffer ? 'is-selected' : ''}"
                  data-animate="bounce-in"
                  data-delay="${i * 300}"
                  @click="${() => this.handleSelectOffer(i)}"
                >
                  <!-- Offer image -->
                  <div class="st-offers__card-image-wrap">
                    <img
                      src="${offer.image}"
                      alt="${offer.name}"
                      class="st-offers__card-img"
                      loading="lazy"
                    />
                  </div>

                  <!-- Offer info -->
                  <div class="st-offers__card-info">
                    <h3 class="st-offers__card-name">${offer.name}</h3>
                    <div class="st-offers__card-price">
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
                    </div>
                  </div>
                </div>
              `
            )}
          </div>

          <!-- CTA section -->
          <div class="st-offers__cta" data-animate="fade-up" data-delay="600">
            <!-- Badge -->
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

            <!-- Add to cart button -->
            ${this.addedToCart
              ? html`
                  <button class="st-offers__btn st-offers__btn--added" type="button">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        class="st-offers__checkmark-path is-drawn"
                        d="M4 12l5 5L20 7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>${this.config.cta_added}</span>
                  </button>
                `
              : html`
                  <button
                    class="st-offers__btn"
                    type="button"
                    @click="${this.handleAddToCart.bind(this)}"
                  >
                    <span>${this.config.cta_normal}</span>
                  </button>
                `}
          </div>
        </div>
      </section>
    `;
  }
}
