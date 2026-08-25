import { LitElement as f, html as o } from "lit";
import { property as g, state as b } from "lit/decorators.js";
import { repeat as u } from "lit/directives/repeat.js";
import { A as m } from "./animate-on-scroll-ROUn9sF1.js";
import "./fonts-ClHg20Ea.js";
var x = Object.defineProperty, _ = (c, t, n, l) => {
  for (var a = void 0, i = c.length - 1, r; i >= 0; i--)
    (r = c[i]) && (a = r(t, n, a) || a);
  return a && x(t, n, a), a;
};
class p extends f {
  constructor() {
    super(...arguments), this.activeIndex = 0, this.styleElement = null;
  }
  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles(), m.init();
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this.styleElement) == null || t.remove();
  }
  updated(t) {
    super.updated(t), m.refresh();
  }
  selectHotspot(t) {
    t !== this.activeIndex && (this.activeIndex = t);
  }
  injectStyles() {
    this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.textContent = `
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
        object-fit: contain;
        object-position: center;
        background: rgba(0, 0, 0, 0.03);
        border-radius: 0.85rem;
        padding: 0.75rem;
        box-sizing: border-box;
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
    `, document.head.appendChild(this.styleElement));
  }
  render() {
    if (!this.config) return o``;
    const t = this.config.bg_color || "#F5F5F5", n = this.config.primary_color || "#111111", l = this.config.secondary_color || "#666666", a = this.config.brand_color || "#1F3A5F", i = this.config.card_bg_color || "#ffffff", r = this.config.hotspots || [], d = Math.min(this.activeIndex, Math.max(r.length - 1, 0)), h = r[d];
    return o`
      <section
        id="st-hotspots"
        class="st-hotspots"
        style="
          --st-hotspots-bg: ${t};
          --st-hotspots-primary: ${n};
          --st-hotspots-secondary: ${l};
          --st-hotspots-brand: ${a};
          --st-hotspots-card-bg: ${i};
        "
      >
        <div class="st-hotspots__container">
          <div class="st-hotspots__header" data-animate="fade-up">
            <span class="st-hotspots__title-bar"></span>
            <h2>${this.config.section_title}</h2>
            ${this.config.section_subtitle ? o`<p>${this.config.section_subtitle}</p>` : ""}
          </div>

          <div class="st-hotspots__layout">
            <div class="st-hotspots__card" data-animate="fade-up" data-delay="80">
              ${h ? u(
      [h],
      () => d,
      (s) => o`
                      <div class="st-hotspots__card-inner">
                        ${s.image ? o`<img
                              class="st-hotspots__card-img"
                              loading="lazy"
                              src="${s.image}"
                              alt="${s.title || ""}"
                            />` : ""}
                        ${s.title ? o`<h3 class="st-hotspots__card-title">
                              ${s.title}
                            </h3>` : ""}
                        ${s.description ? o`<p class="st-hotspots__card-desc">
                              ${s.description}
                            </p>` : ""}
                      </div>
                    `
    ) : ""}

              ${r.length > 1 ? o`
                    <div class="st-hotspots__nav">
                      ${r.map(
      (s, e) => o`
                          <button
                            type="button"
                            class="st-hotspots__nav-btn ${e === d ? "is-active" : ""}"
                            aria-label="${e + 1}"
                            @click="${() => this.selectHotspot(e)}"
                          >
                            ${e + 1}
                          </button>
                        `
    )}
                    </div>
                  ` : ""}
            </div>

            <div class="st-hotspots__media" data-animate="fade-up" data-delay="0">
              <div class="st-hotspots__image-frame">
                <img
                  class="st-hotspots__product-img"
                  loading="lazy"
                  src="${this.config.product_image}"
                  alt="${this.config.product_image_alt || this.config.section_title || ""}"
                />
                ${r.map(
      (s, e) => o`
                    <button
                      type="button"
                      class="st-hotspots__marker ${e === d ? "is-active" : ""}"
                      style="left: ${s.x_percent}%; top: ${s.y_percent}%;"
                      aria-label="${s.title || e + 1}"
                      @click="${() => this.selectHotspot(e)}"
                    >
                      ${e + 1}
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
_([
  g({ type: Object })
], p.prototype, "config");
_([
  b()
], p.prototype, "activeIndex");
typeof p < "u" && p.registerSallaComponent("salla-st-hotspots");
export {
  p as default
};
