import { LitElement as m, html as r } from "lit";
import { property as l } from "lit/decorators.js";
import { A as c } from "./animate-on-scroll-ROUn9sF1.js";
import "./fonts-CqDo7kag.js";
var p = Object.defineProperty, h = (d, e, i, o) => {
  for (var a = void 0, t = d.length - 1, s; t >= 0; t--)
    (s = d[t]) && (a = s(e, i, a) || a);
  return a && p(e, i, a), a;
};
class n extends m {
  constructor() {
    super(...arguments), this.styleElement = null;
  }
  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles(), c.init();
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.styleElement) == null || e.remove();
  }
  updated(e) {
    super.updated(e), c.refresh();
  }
  injectStyles() {
    this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.textContent = `
      .st-cards {
        display: block;
        width: 100%;
        padding: 3.5rem 0;
        background: var(--st-cards-bg, #ffffff);
        overflow: visible;
      }

      .st-cards__container {
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 0.5rem;
      }

      @media (min-width: 768px) {
        .st-cards__container { padding: 0 1rem; }
      }

      @media (min-width: 1024px) {
        .st-cards__container { padding: 0 2.5rem; }
      }

      @media (min-width: 1280px) {
        .st-cards__container { padding: 0 88px; }
      }

      .st-cards__header {
        text-align: center;
        max-width: 619px;
        margin: 0 auto 2rem;
      }

      .st-cards__header h2 {
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1.35;
        color: var(--st-cards-primary, #050505);
        margin: 0;
      }

      @media (min-width: 768px) {
        .st-cards__header h2 { font-size: 1.875rem; line-height: 40px; }
      }

      @media (min-width: 1024px) {
        .st-cards__header h2 { font-size: 2.25rem; line-height: 48px; }
      }

      @media (min-width: 1280px) {
        .st-cards__header h2 { font-size: 40px; line-height: 64px; }
      }

      /* Cards grid: 2 cols mobile, 3 cols desktop */
      .st-cards__grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-top: 1.5rem;
      }

      @media (min-width: 768px) {
        .st-cards__grid {
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }
      }

      .st-cards__card {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem 1rem;
        cursor: default;
        text-align: center;
        transition: transform 0.2s ease;
      }

      @media (min-width: 768px) {
        .st-cards__card { padding: 1.5rem 2rem; }
      }

      @media (min-width: 1024px) {
        .st-cards__card { padding: 1.5rem 2.5rem; }
      }

      .st-cards__card:hover {
        transform: translateY(-10px);
      }

      .st-cards__card-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 56px;
        border-radius: 9999px;
        background: #F7F7F7;
        margin-bottom: 1.25rem;
        font-size: 1.5rem;
        line-height: 1;
        flex-shrink: 0;
      }

      .st-cards__card-title {
        font-size: 1.125rem;
        font-weight: 700;
        margin: 0 0 0.75rem;
        color: var(--st-cards-primary, #050505);
        max-width: 20rem;
      }

      .st-cards__card-body {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.75;
        color: var(--st-cards-primary, #050505);
        opacity: 0.6;
        max-width: 20rem;
      }

      /* Featured image */
      .st-cards__image-wrap {
        margin-top: 2rem;
        width: 100%;
        height: max(50vh, 325px);
        border-radius: 0.75rem;
        overflow: hidden;
        background: #F7F7F7;
      }

      @media (min-width: 1024px) {
        .st-cards__image-wrap {
          height: max(50vh, 576px);
        }
      }

      .st-cards__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      /* Footer button */
      .st-cards__footer {
        margin-top: 2.5rem;
        display: flex;
        justify-content: center;
        text-align: center;
      }

      .st-cards__footer-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.75rem;
        border-radius: 9999px;
        font-size: 0.9375rem;
        font-weight: 700;
        border: none;
        cursor: pointer;
        text-decoration: none;
        transition: opacity 0.2s, transform 0.2s;
      }

      .st-cards__footer-btn:hover {
        opacity: 0.88;
        transform: translateY(-1px);
      }

      /* Custom dramatic pop-in animation (scale 0.1 -> 1 with bounce) */
      [data-animate="pop-in"] {
        transform: scale(0.1);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      [data-animate="pop-in"].aos-animate {
        transform: scale(1);
        opacity: 1;
        transition: transform 0.2s ease, box-shadow 0.2s ease; /* reset to hover-ready */
      }
    `, document.head.appendChild(this.styleElement));
  }
  render() {
    if (!this.config) return r``;
    const e = this.config.bg_color || "#ffffff", i = this.config.primary_color || "#050505", o = this.config.brand_color || "#0071E3", a = this.config.cards || [];
    return r`
      <section
        id="st-cards"
        class="st-cards"
        style="--st-cards-bg: ${e}; --st-cards-primary: ${i};"
      >
        <div class="st-cards__container">
          <!-- Section header -->
          <div class="st-cards__header">
            <h2 data-animate="fade-up" data-delay="0">
              ${this.config.section_title}
            </h2>
          </div>

          <!-- Featured image (above cards, matching React layout) -->
          ${this.config.section_image ? r`
                <div
                  class="st-cards__image-wrap"
                  data-animate="fade-up"
                  data-delay="100"
                >
                  <img
                    src="${this.config.section_image}"
                    alt="${this.config.section_title || ""}"
                    class="st-cards__image"
                  />
                </div>
              ` : ""}

          <!-- Cards grid (2 cols mobile, 3 cols desktop) -->
          <div class="st-cards__grid" data-animate="slide-up">
            ${a.map(
      (t, s) => r`
                <div
                  class="st-cards__card"
                  data-animate="pop-in"
                  data-delay="${s * 100}"
                >
                  ${t.icon ? r`
                        <div class="st-cards__card-icon">
                          <i class="${t.icon}" style="color: ${o}"></i>
                        </div>
                      ` : ""}
                  ${t.title ? r`<h3 class="st-cards__card-title">${t.title}</h3>` : ""}
                  ${t.body ? r`<p class="st-cards__card-body">${t.body}</p>` : ""}
                </div>
              `
    )}
          </div>

          <!-- Footer button -->
          ${this.config.footer_button_label ? r`
                <div
                  class="st-cards__footer"
                  data-animate="fade-up"
                  data-delay="400"
                >
                  <a
                    href="${this.config.footer_button_href || "#"}"
                    class="st-cards__footer-btn"
                    style="background: var(--st-cards-primary, #050505); color: var(--st-cards-bg, #ffffff);"
                  >
                    ${this.config.footer_button_label}
                  </a>
                </div>
              ` : ""}
        </div>
      </section>
    `;
  }
}
h([
  l({ type: Object })
], n.prototype, "config");
typeof n < "u" && n.registerSallaComponent("salla-st-cards");
export {
  n as default
};
