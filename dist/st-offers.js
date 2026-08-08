import { LitElement as x, html as r } from "lit";
import { property as w, state as y } from "lit/decorators.js";
import { classMap as $ } from "lit/directives/class-map.js";
import { A as g } from "./animate-on-scroll-CruvFX6N.js";
import "./fonts-CqDo7kag.js";
import { b as v, m as u, r as k } from "./mock-product-B38SvcvQ.js";
var z = Object.defineProperty, b = (d, e, i, n) => {
  for (var t = void 0, o = d.length - 1, a; o >= 0; o--)
    (a = d[o]) && (t = a(e, i, t) || t);
  return t && z(e, i, t), t;
};
class c extends x {
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
    var e;
    super.disconnectedCallback(), (e = this.styleElement) == null || e.remove(), this.styleElement = null;
  }
  updated(e) {
    super.updated(e), g.refresh();
  }
  // Out of stock: block navigation instead of following an empty/"#" link
  handleBuyClick(e, i) {
    i && e.preventDefault();
  }
  handleSelectVariant(e) {
    this.selectedVariant = e, this.requestUpdate();
  }
  injectStyles() {
    var f, l, m, _, p, h;
    if (this.styleElement) return;
    const e = ((f = this.config) == null ? void 0 : f.bg_color) || "#ffffff", i = ((l = this.config) == null ? void 0 : l.primary_color) || "#050505", n = ((m = this.config) == null ? void 0 : m.secondary_color) || "#525252", t = ((_ = this.config) == null ? void 0 : _.brand_color) || "#0071E3", o = ((p = this.config) == null ? void 0 : p.green_color) || "#20A535", a = ((h = this.config) == null ? void 0 : h.red_color) || "#F62A33", s = "#EEEEEE";
    this.styleElement = document.createElement("style"), this.styleElement.textContent = `
      .st-offers {
        background: ${e};
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
        border: 1px solid ${s};
        border-radius: 1rem;
        padding: 1rem 1rem 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        transition: border-color 0.3s ease, opacity 0.3s ease;
      }

      .st-offers__card.is-selected .st-offers__card-inner {
        border-color: ${t};
      }

      .st-offers__card.is-out-of-stock .st-offers__card-inner {
        opacity: 0.5;
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
        color: ${a};
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
        border: 1px solid ${t};
        background: ${t};
        cursor: pointer;
        text-decoration: none;
        transition: opacity 0.3s ease;
      }

      @media (min-width: 1024px) {
        .st-offers__btn { padding: 1rem; }
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

      ${v}
    `, document.head.appendChild(this.styleElement);
  }
  render() {
    if (!this.config)
      return r`<div>Configuration is required</div>`;
    const e = (this.config.variants || []).slice(0, 3), i = this.config.currency || "ر.س", n = Math.min(this.selectedVariant, Math.max(e.length - 1, 0)), t = e[n], o = t ? {
      price: t.price ?? u.price,
      regularPrice: t.regular_price,
      currency: i,
      isOnSale: t.is_on_sale ?? !1,
      isOutOfStock: t.is_out_of_stock ?? !1
    } : u, a = k(o, this.config.cta_label);
    return r`
      <section id="st-offers" class="st-offers">
        <div class="st-offers__container" data-animate="fade-up">
          <!-- Section header: badge above title (matches source SectionHeader) -->
          <div class="st-offers__header">
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
            ${e.map(
      (s, f) => r`
                <div
                  class="${$({
        "st-offers__card": !0,
        "is-selected": f === n,
        "is-out-of-stock": !!s.is_out_of_stock
      })}"
                  data-animate="bounce-in"
                  data-delay="${f * 300}"
                  @click="${() => this.handleSelectVariant(f)}"
                >
                  <div class="st-offers__card-inner">
                    <img
                      src="${s.image}"
                      alt="${s.name}"
                      class="st-offers__card-img"
                      loading="lazy"
                    />
                    <h5 class="st-offers__card-name">${s.name}</h5>
                    <h6 class="st-offers__card-price">
                      ${s.is_out_of_stock ? r`<span class="st-offers__price-out-of-stock">نفذت الكمية</span>` : r`
                            <span class="st-offers__price-after">
                              ${s.price} ${i}
                            </span>
                            ${s.is_on_sale && s.regular_price && s.regular_price > s.price ? r`
                                  <span class="st-offers__price-before">
                                    ${s.regular_price} ${i}
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
            <a
              class="st-offers__btn st-buy-btn ${o.isOutOfStock ? "is-out-of-stock" : ""}"
              href="${this.config.button_link || "#"}"
              aria-disabled="${o.isOutOfStock ? "true" : "false"}"
              @click="${(s) => this.handleBuyClick(s, !!o.isOutOfStock)}"
            >
              <span class="st-offers__btn-label">${a}</span>
              <i class="sicon-caret-left-double"></i>
            </a>
          </div>
        </div>
      </section>
    `;
  }
}
b([
  w({ type: Object })
], c.prototype, "config");
b([
  y()
], c.prototype, "selectedVariant");
typeof c < "u" && c.registerSallaComponent("salla-st-offers");
export {
  c as default
};
