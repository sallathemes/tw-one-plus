import { LitElement as m, html as i } from "lit";
import { property as b, state as p } from "lit/decorators.js";
import { S as _ } from "./scroll-scene-DdINwXtt.js";
import "./fonts-ClHg20Ea.js";
import { m as a } from "./mock-product-D0ZJbJ-m.js";
var u = Object.defineProperty, h = (c, t, e, d) => {
  for (var n = void 0, s = c.length - 1, r; s >= 0; s--)
    (r = c[s]) && (n = r(t, e, n) || n);
  return n && u(t, e, n), n;
};
class l extends m {
  constructor() {
    super(...arguments), this.navFixed = !1, this.mobileMenuOpen = !1, this.styleElement = null, this.scene = null, this.navSceneProgress = (t, e) => {
      const d = this.navFixed;
      this.navFixed = e.top < -80, d !== this.navFixed && this.requestUpdate();
    };
  }
  createRenderRoot() {
    return this;
  }
  syncScene() {
    if (this.scene) return;
    const t = this.querySelector(".st-hero");
    t && (this.scene = new _(t, this.navSceneProgress));
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles();
  }
  firstUpdated() {
    this.syncScene();
  }
  disconnectedCallback() {
    var t, e;
    super.disconnectedCallback(), (t = this.scene) == null || t.destroy(), this.scene = null, (e = this.styleElement) == null || e.remove();
  }
  injectStyles() {
    this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.textContent = `
      /* ─── Reset ─────────────────────────────────── */
      st-hero { display: block; }

      /* ─── Section ───────────────────────────────── */
      .st-hero {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        min-height: 90vh;
      }

      @media (min-width: 768px) {
        .st-hero { min-height: 900px; }
      }

      /* ─── Background (video / image) ────────────── */
      .st-hero__bg {
        position: absolute;
        inset: 0;
        z-index: 1;
      }

      .st-hero__bg video,
      .st-hero__bg img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .st-hero__overlay {
        position: absolute;
        inset: 0;
        z-index: 2;
      }

      /* ─── Navbar ─────────────────────────────────── */
      @keyframes st-nav-slide-down {
        from { transform: translateY(-100%); opacity: 0; }
        to   { transform: translateY(0);     opacity: 1; }
      }

      .st-hero__nav {
        position: absolute;
        top: 0;
        inset-inline-start: 0;
        width: 100%;
        z-index: 40;
        padding: 14px 0;
        animation: st-nav-slide-down 0.8s ease forwards;
        transition: padding 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
      }

      .st-hero__nav--fixed {
        position: fixed;
        padding: 8px 0;
        background-color: rgba(0, 0, 0, 0.88);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-shadow: 0 2px 16px rgba(0,0,0,0.4);
      }

      .st-hero__nav-inner {
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }

      @media (min-width: 1280px) {
        .st-hero__nav-inner { padding: 0 5.5rem; }
      }

      /* Logo */
      .st-hero__nav-logo {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        text-decoration: none;
      }

      .st-hero__nav-logo img {
        max-height: 40px;
        width: auto;
        display: block;
      }

      .st-hero__nav-logo span {
        font-size: 1.375rem;
        font-weight: 800;
        letter-spacing: -0.01em;
      }

      /* Links (desktop) */
      .st-hero__nav-links {
        display: none;
        list-style: none;
        margin: 0;
        padding: 0;
        align-items: center;
        gap: 0.25rem;
      }

      @media (min-width: 1024px) {
        .st-hero__nav-links { display: flex; }
      }

      .st-hero__nav-links li a {
        display: block;
        padding: 0.5rem 0.875rem;
        font-size: 0.9375rem;
        font-weight: 500;
        color: inherit;
        text-decoration: none;
        border-radius: 6px;
        transition: background 0.2s ease;
      }

      .st-hero__nav-links li a:hover {
        background: rgba(255,255,255,0.1);
      }

      /* Actions */
      .st-hero__nav-actions {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-shrink: 0;
      }

      /* CTA pill button (navbar) */
      .st-hero__nav-btn {
        display: none;
        position: relative;
        overflow: hidden;
        align-items: center;
        padding: 0.5rem 1.25rem;
        border-radius: 9999px;
        border: 1.5px solid currentColor;
        font-size: 0.875rem;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
        white-space: nowrap;
      }

      @media (min-width: 768px) {
        .st-hero__nav-btn { display: inline-flex; }
      }

      .st-hero__nav-btn:hover .st-buy-btn__swap--a {
        transform: translateY(-150%);
        opacity: 0;
      }

      .st-hero__nav-btn:hover .st-buy-btn__swap--b {
        transform: translateY(0);
        opacity: 1;
      }

      /* Hamburger */
      .st-hero__nav-hamburger {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        width: 36px;
        height: 36px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
      }

      @media (min-width: 1024px) {
        .st-hero__nav-hamburger { display: none; }
      }

      .st-hero__nav-hamburger span {
        display: block;
        width: 22px;
        height: 2px;
        border-radius: 2px;
        transition: transform 0.25s ease, opacity 0.25s ease;
      }

      /* Mobile menu */
      .st-hero__mobile-menu {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 100;
        flex-direction: column;
      }

      .st-hero__mobile-menu.is-open {
        display: flex;
      }

      .st-hero__mobile-menu-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(4px);
      }

      .st-hero__mobile-menu-panel {
        position: relative;
        z-index: 1;
        width: 85%;
        max-width: 320px;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 1.5rem;
        overflow-y: auto;
      }

      [dir="rtl"] .st-hero__mobile-menu-panel { margin-inline-start: auto; }

      .st-hero__mobile-menu-close {
        align-self: flex-end;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.25rem;
        margin-bottom: 1.5rem;
        line-height: 1;
      }

      .st-hero__mobile-menu ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .st-hero__mobile-menu ul a {
        display: block;
        padding: 0.875rem 1rem;
        font-size: 1rem;
        font-weight: 600;
        text-decoration: none;
        border-radius: 8px;
        color: inherit;
        transition: background 0.2s;
      }

      .st-hero__mobile-menu ul a:hover { background: rgba(255,255,255,0.08); }

      /* ─── Content ────────────────────────────────── */
      @keyframes st-hero-slide-up {
        from { transform: translateY(80px); opacity: 0; }
        to   { transform: translateY(0);    opacity: 1; }
      }

      .st-hero__body {
        position: relative;
        z-index: 10;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        padding-bottom: 1.5rem;
      }

      @media (min-width: 768px) {
        .st-hero__body {
          justify-content: center;
          padding-bottom: 0;
          padding-top: 0;
        }
      }

      .st-hero__container {
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }

      @media (min-width: 1280px) {
        .st-hero__container { padding: 0 5.5rem; }
      }

      .st-hero__text-wrap {
        max-width: 48rem;
        padding-bottom: 1.5rem;
      }

      @media (min-width: 768px) {
        .st-hero__text-wrap { padding-bottom: 1.5rem; }
      }

      .st-hero__title {
        font-size: clamp(2.25rem, 5vw, 4rem);
        line-height: 1.25;
        font-weight: 800;
        letter-spacing: -0.02em;
        margin: 0 0 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        animation: st-hero-slide-up 0.7s ease forwards;
      }

      @media (min-width: 768px) {
        .st-hero__title {
          margin-bottom: 1.5rem;
        }
      }

      @media (min-width: 1024px) {
        .st-hero__title {
          margin-bottom: 2rem;
        }
      }

      .st-hero__subtitle {
        font-size: 1rem;
        line-height: 1.75;
        margin: 0 0 1.5rem;
        opacity: 0;
        animation: st-hero-slide-up 1s ease forwards;
        animation-delay: 0.2s;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      @media (min-width: 768px) {
        .st-hero__subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
      }

      .st-hero__cta {
        opacity: 0;
        animation: st-hero-slide-up 1.5s ease forwards;
        animation-delay: 0.4s;
        display: inline-block;
      }

      /* Main CTA button */
      .st-hero__main-btn {
        position: relative;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.875rem 2rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
        border: none;
        white-space: nowrap;
      }

      @media (min-width: 768px) {
        .st-hero__main-btn {
          font-size: 1.125rem;
          padding: 1rem 2.25rem;
        }
      }

      .st-hero__main-btn:hover .st-buy-btn__swap--a {
        transform: translateY(-150%);
        opacity: 0;
      }

      .st-hero__main-btn:hover .st-buy-btn__swap--b {
        transform: translateY(0);
        opacity: 1;
      }
    `, document.head.appendChild(this.styleElement));
  }
  render() {
    if (!this.config) return i``;
    const t = this.config.bg_color || "#050505", e = this.config.text_color || "#ffffff", d = this.config.brand_color || "#0071E3", n = (typeof this.config.overlay_opacity == "number" ? this.config.overlay_opacity : 60) / 100, s = {
      price: this.config.product_price ?? a.price,
      regularPrice: this.config.product_regular_price ?? a.regularPrice,
      currency: this.config.product_currency || a.currency,
      isOnSale: this.config.product_is_on_sale ?? a.isOnSale,
      isOutOfStock: this.config.product_out_of_stock ?? a.isOutOfStock
    }, r = [
      { label: this.config.nav1_label, href: this.config.nav1_href },
      { label: this.config.nav2_label, href: this.config.nav2_href },
      { label: this.config.nav3_label, href: this.config.nav3_href },
      { label: this.config.nav4_label, href: this.config.nav4_href }
    ].filter((o) => o.label);
    return i`
      <section
        class="st-hero"
        style="background-color:${t}; color:${e};"
      >
        <!-- ── Background ───────────────────────── -->
        <div class="st-hero__bg">
          ${this.config.video_url ? i`<video autoplay muted loop playsinline preload="none"
                     src="${this.config.video_url}"></video>` : this.config.bg_image ? i`<img src="${this.config.bg_image}" alt="" loading="eager" />` : ""}
          <div
            class="st-hero__overlay"
            style="background:${t}; opacity:${n};"
          ></div>
        </div>

        <!-- ── Navbar ───────────────────────────── -->
        <nav
          class="st-hero__nav ${this.navFixed ? "st-hero__nav--fixed" : ""}"
          style="color:${e};"
        >
          <div class="st-hero__nav-inner">
            <!-- Logo -->
            <a class="st-hero__nav-logo" href="#" style="color:${e};">
              ${this.config.logo ? i`<img src="${this.config.logo}" alt="${this.config.store_name || ""}" />` : i`<span>${this.config.store_name || ""}</span>`}
            </a>

            <!-- Desktop nav links -->
            <ul class="st-hero__nav-links">
              ${r.map((o) => i`
                <li><a href="${o.href || "#"}">${o.label}</a></li>
              `)}
            </ul>

            <!-- Actions: CTA + hamburger -->
            <div class="st-hero__nav-actions">
              ${this.config.button_label ? i`
                <buy-now-button
                  .product="${s}"
                  label="${this.config.button_label}"
                  link="${this.config.button_link || "#"}"
                  btn-class="st-hero__nav-btn"
                  inline-style="color:${e};"
                  hover-swap
                ></buy-now-button>
              ` : ""}

              ${r.length ? i`
                <button
                  class="st-hero__nav-hamburger"
                  aria-label="فتح القائمة"
                  @click="${() => {
      this.mobileMenuOpen = !0, this.requestUpdate();
    }}"
                >
                  <span style="background:${e};"></span>
                  <span style="background:${e};"></span>
                  <span style="background:${e};"></span>
                </button>
              ` : ""}
            </div>
          </div>
        </nav>

        <!-- ── Mobile Menu ───────────────────────── -->
        <div class="st-hero__mobile-menu ${this.mobileMenuOpen ? "is-open" : ""}">
          <div
            class="st-hero__mobile-menu-backdrop"
            @click="${() => {
      this.mobileMenuOpen = !1, this.requestUpdate();
    }}"
          ></div>
          <div
            class="st-hero__mobile-menu-panel"
            style="background:${t}; color:${e};"
          >
            <button
              class="st-hero__mobile-menu-close"
              aria-label="إغلاق"
              style="color:${e};"
              @click="${() => {
      this.mobileMenuOpen = !1, this.requestUpdate();
    }}"
            >✕</button>
            <ul>
              ${r.map((o) => i`
                <li>
                  <a
                    href="${o.href || "#"}"
                    @click="${() => {
      this.mobileMenuOpen = !1, this.requestUpdate();
    }}"
                  >${o.label}</a>
                </li>
              `)}
            </ul>
          </div>
        </div>

        <!-- ── Hero Content ──────────────────────── -->
        <div class="st-hero__body">
          <div class="st-hero__container">
            <div class="st-hero__text-wrap">
              ${this.config.title ? i`
                <h1 class="st-hero__title">${this.config.title}</h1>
              ` : ""}

              ${this.config.subtitle ? i`
                <p
                  class="st-hero__subtitle"
                  style="color:${e}; opacity:0;"
                >${this.config.subtitle}</p>
              ` : ""}

              ${this.config.button_label ? i`
                <div class="st-hero__cta">
                  <buy-now-button
                    .product="${s}"
                    label="${this.config.button_label}"
                    link="${this.config.button_link || "#"}"
                    btn-class="st-hero__main-btn"
                    inline-style="background:${d}; color:#fff;"
                    hover-swap
                  ></buy-now-button>
                </div>
              ` : ""}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
h([
  b({ type: Object })
], l.prototype, "config");
h([
  p()
], l.prototype, "navFixed");
h([
  p()
], l.prototype, "mobileMenuOpen");
typeof l < "u" && l.registerSallaComponent("salla-st-hero");
export {
  l as default
};
