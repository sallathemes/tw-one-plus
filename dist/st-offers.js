import { LitElement as x, html as r } from "lit";
import { property as w, state as y } from "lit/decorators.js";
import { classMap as $ } from "lit/directives/class-map.js";
import { A as g } from "./animate-on-scroll-ROUn9sF1.js";
import "./fonts-CqDo7kag.js";
import { m as u } from "./mock-product-D0ZJbJ-m.js";
var v = Object.defineProperty, b = (c, s, i, n) => {
  for (var e = void 0, o = c.length - 1, t; o >= 0; o--)
    (t = c[o]) && (e = t(s, i, e) || e);
  return e && v(s, i, e), e;
};
class f extends x {
  constructor() {
    super(...arguments), this.selectedVariant = 0, this.styleElement = null;
  }
  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles(), g.init();
  }
  disconnectedCallback() {
    var s;
    super.disconnectedCallback(), (s = this.styleElement) == null || s.remove(), this.styleElement = null;
  }
  updated(s) {
    super.updated(s), g.refresh();
  }
  handleSelectVariant(s) {
    this.selectedVariant = s, this.requestUpdate();
  }
  injectStyles() {
    var d, l, m, _, p, h;
    if (this.styleElement) return;
    const s = ((d = this.config) == null ? void 0 : d.bg_color) || "#ffffff", i = ((l = this.config) == null ? void 0 : l.primary_color) || "#050505", n = ((m = this.config) == null ? void 0 : m.secondary_color) || "#525252", e = ((_ = this.config) == null ? void 0 : _.brand_color) || "#0071E3", o = ((p = this.config) == null ? void 0 : p.green_color) || "#20A535", t = ((h = this.config) == null ? void 0 : h.red_color) || "#F62A33", a = "#EEEEEE";
    this.styleElement = document.createElement("style"), this.styleElement.textContent = `
      .st-offers {
        background: ${s};
        color: ${i};
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
        border: 1px solid ${o};
        background: ${o}1A;
        color: ${o};
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
        color: ${i};
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
        color: ${n};
        margin: 0 auto;
      }

      @media (min-width: 1024px) {
        .st-offers__subtitle { font-size: 1rem; }
      }

      /* Variants row: horizontal scroll on mobile, 3-up on desktop (matches source) */
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
        border: 1px solid ${a};
        border-radius: 1rem;
        padding: 1rem 1rem 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        transition: border-color 0.3s ease, opacity 0.3s ease;
      }

      .st-offers__card.is-selected .st-offers__card-inner {
        border-color: ${e};
      }

      .st-offers__card.is-out-of-stock .st-offers__card-inner {
        opacity: 0.5;
      }

      .st-offers__card-img {
        height: 281px;
        object-fit: cover;
        width: 100%;
        display: block;
        border-radius: 0.75rem;
      }

      .st-offers__card-name {
        font-size: 1rem;
        font-weight: 700;
        text-align: center;
        color: ${i};
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
        color: ${t};
      }

      .st-offers__price-out-of-stock {
        font-weight: 700;
        color: ${n};
      }

      .st-offers__price-before {
        text-decoration: line-through;
        color: ${i};
      }

      /* Buy button — one shared "buy now" CTA for the whole component (matches
         the button used across the bundle's other sections, e.g. st-hero) */
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
        border: 1px solid ${e};
        background: ${e};
        cursor: pointer;
        text-decoration: none;
        transition: opacity 0.3s ease;
      }

      @media (min-width: 1024px) {
        .st-offers__btn { padding: 1rem; }
      }

      .st-offers__btn .st-buy-btn__label {
        font-size: 0.875rem;
        font-weight: 800;
        color: #ffffff;
      }

      @media (min-width: 1024px) {
        .st-offers__btn .st-buy-btn__label { font-size: 1rem; }
      }

      .st-offers__btn i {
        font-size: 1.125rem;
        line-height: 1;
        color: #ffffff;
      }
    `, document.head.appendChild(this.styleElement);
  }
  render() {
    if (!this.config)
      return r`<div>Configuration is required</div>`;
    const s = (this.config.variants || []).slice(0, 3), i = this.config.currency || "ر.س", n = Math.min(this.selectedVariant, Math.max(s.length - 1, 0)), e = s[n], o = e ? {
      price: e.price ?? u.price,
      regularPrice: e.regular_price,
      currency: i,
      isOnSale: e.is_on_sale ?? !1,
      isOutOfStock: e.is_out_of_stock ?? !1
    } : u;
    return r`
      <section id="st-offers" class="st-offers">
        <div class="st-offers__container">
          <!-- Section header: badge above title (matches source SectionHeader).
               Animated on its own — the grid below stages the cards separately,
               so the two don't fade in on top of each other. -->
          <div class="st-offers__header" data-animate="fade-up" data-delay="0">
            ${this.config.badge_label ? r`
                  <div class="st-offers__badge">
                    ${this.config.badge_icon ? r`<i class="${this.config.badge_icon}"></i>` : ""}
                    <span>${this.config.badge_label}</span>
                  </div>
                ` : ""}
            <div>
              <h3 class="st-offers__title">${this.config.section_title}</h3>
              ${this.config.section_subtitle ? r`<h4 class="st-offers__subtitle">${this.config.section_subtitle}</h4>` : ""}
            </div>
          </div>

          <!-- Variant options row (max 3 cards, same product) -->
          <div class="st-offers__grid">
            ${s.map(
      (t, a) => r`
                <div
                  class="${$({
        "st-offers__card": !0,
        "is-selected": a === n,
        "is-out-of-stock": !!t.is_out_of_stock
      })}"
                  data-animate="bounce-in"
                  data-delay="${a * 300}"
                  @click="${() => this.handleSelectVariant(a)}"
                >
                  <div class="st-offers__card-inner">
                    <img
                      src="${t.image}"
                      alt="${t.name}"
                      class="st-offers__card-img"
                      loading="lazy"
                    />
                    <h5 class="st-offers__card-name">${t.name}</h5>
                    <h6 class="st-offers__card-price">
                      ${t.is_out_of_stock ? r`<span class="st-offers__price-out-of-stock">نفذت الكمية</span>` : r`
                            <span class="st-offers__price-after">
                              ${t.price} ${i}
                            </span>
                            ${t.is_on_sale && t.regular_price && t.regular_price > t.price ? r`
                                  <span class="st-offers__price-before">
                                    ${t.regular_price} ${i}
                                  </span>
                                ` : ""}
                          `}
                    </h6>
                  </div>
                </div>
              `
    )}
          </div>

          <!-- Buy: one shared button for every variant above. Reflects whichever
               card is selected and disables/blocks navigation when it's out of stock. -->
          <div class="st-offers__cta">
            <buy-now-button
              .product="${o}"
              label="${this.config.cta_label}"
              link="${this.config.button_link || "#"}"
              btn-class="st-offers__btn"
              icon="sicon-caret-left-double"
            ></buy-now-button>
          </div>
        </div>
      </section>
    `;
  }
}
b([
  w({ type: Object })
], f.prototype, "config");
b([
  y()
], f.prototype, "selectedVariant");
typeof f < "u" && f.registerSallaComponent("salla-st-offers");
export {
  f as default
};
