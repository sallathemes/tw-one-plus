import { LitElement as g, html as r } from "lit";
import { property as m, state as h } from "lit/decorators.js";
import { S as c } from "./scroll-scene-DdINwXtt.js";
import "./fonts-CqDo7kag.js";
var p = Object.defineProperty, o = (n, i, e, s) => {
  for (var t = void 0, a = n.length - 1, d; a >= 0; a--)
    (d = n[a]) && (t = d(i, e, t) || t);
  return t && p(i, e, t), t;
};
class l extends g {
  constructor() {
    super(...arguments), this.lightboxOpen = !1, this.lightboxIndex = 0, this.styleElement = null, this.scene = null, this.updateParallax = (i, e, s) => {
      const t = this.querySelector(".st-images-slider__parallax");
      if (!t) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        t.style.transform = "none";
        return;
      }
      const a = e.height > 0 ? Math.min(1, Math.max(0, (s - e.top) / e.height)) : 0;
      t.style.transform = `translateX(${(1 - a) * -100}%)`;
    }, this.keyHandler = (i) => {
      this.lightboxOpen && (i.key === "Escape" && this.closeLightbox(), i.key === "ArrowLeft" && this.lightboxStep(1), i.key === "ArrowRight" && this.lightboxStep(-1));
    };
  }
  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles(), window.addEventListener("keydown", this.keyHandler);
  }
  disconnectedCallback() {
    var i, e;
    super.disconnectedCallback(), window.removeEventListener("keydown", this.keyHandler), (i = this.scene) == null || i.destroy(), this.scene = null, (e = this.styleElement) == null || e.remove();
  }
  firstUpdated() {
    this.syncScene();
  }
  // Self-driving rAF loop (not a 'scroll' listener) so the parallax still
  // animates inside editor-preview shells that scroll via a transformed
  // wrapper or a non-composed shadow-DOM scroller.
  syncScene() {
    if (this.scene) return;
    const i = this.querySelector(".st-images-slider__parallax");
    i && (this.scene = new c(i, this.updateParallax));
  }
  openLightbox(i) {
    this.lightboxIndex = i, this.lightboxOpen = !0, this.requestUpdate();
  }
  closeLightbox() {
    this.lightboxOpen = !1, this.requestUpdate();
  }
  lightboxStep(i) {
    var s, t;
    const e = ((t = (s = this.config) == null ? void 0 : s.images) == null ? void 0 : t.length) || 0;
    e && (this.lightboxIndex = (this.lightboxIndex + i + e) % e, this.requestUpdate());
  }
  injectStyles() {
    var s, t;
    if (this.styleElement) return;
    const i = ((s = this.config) == null ? void 0 : s.primary_color) || "#050505", e = ((t = this.config) == null ? void 0 : t.brand_color) || "#0071E3";
    this.styleElement = document.createElement("style"), this.styleElement.textContent = `
      .st-images-slider {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 2.5rem 0;
        overflow: hidden;
      }

      @media (min-width: 768px) {
        .st-images-slider { padding: 4rem 0; }
      }

      .st-images-slider__header-wrap {
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 0.5rem;
      }

      @media (min-width: 768px) {
        .st-images-slider__header-wrap { padding: 0 1rem; }
      }

      @media (min-width: 1024px) {
        .st-images-slider__header-wrap { padding: 0 2.5rem; }
      }

      @media (min-width: 1280px) {
        .st-images-slider__header-wrap { padding: 0 88px; }
      }

      .st-images-slider__title {
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1.35;
        max-width: 727px;
        margin: 0;
        text-align: start;
        color: ${i};
      }

      @media (min-width: 768px) {
        .st-images-slider__title { font-size: 1.875rem; line-height: 40px; }
      }

      @media (min-width: 1024px) {
        .st-images-slider__title { font-size: 2.25rem; line-height: 48px; }
      }

      @media (min-width: 1280px) {
        .st-images-slider__title { font-size: 40px; line-height: 64px; }
      }

      /* Parallax wrapper — slides in from -100% as you scroll (source Framer x transform) */
      .st-images-slider__parallax {
        width: 100%;
        padding-inline-start: calc((100vw - 1440px) / 2 + 88px);
        will-change: transform;
      }

      /* Scrollable track */
      .st-images-slider__track {
        display: flex;
        gap: 1.5rem;
        padding: 1rem 0.5rem;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
        scrollbar-color: ${e} #F1F1F1;
      }

      @media (min-width: 768px) {
        .st-images-slider__track { padding: 1.5rem 1rem; }
      }

      @media (min-width: 1024px) {
        .st-images-slider__track { padding: 1.5rem 2.5rem; }
      }

      @media (min-width: 1280px) {
        .st-images-slider__track { padding: 2rem 0; }
      }

      .st-images-slider__track::-webkit-scrollbar { height: 8px; }

      .st-images-slider__track::-webkit-scrollbar-track {
        background: #F1F1F1;
        border-radius: 4px;
      }

      .st-images-slider__track::-webkit-scrollbar-thumb {
        background: ${e};
        border-radius: 4px;
      }

      /* Cards — matches source: min-w min(90%, 565px), h 364px / md 464px */
      .st-images-slider__item {
        position: relative;
        flex-shrink: 0;
        min-width: min(90%, 565px);
        height: 364px;
        cursor: pointer;
        transition: opacity 0.2s ease;
      }

      @media (min-width: 768px) {
        .st-images-slider__item { height: 464px; }
      }

      .st-images-slider__item:hover { opacity: 0.8; }

      .st-images-slider__item:last-of-type { margin-inline-end: 0.5rem; }

      .st-images-slider__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 1rem;
        display: block;
      }

      /* Lightbox (source ImageDialog equivalent) */
      .st-images-slider__lightbox {
        position: fixed;
        inset: 0;
        z-index: 50;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(34, 34, 34, 0.5);
      }

      .st-images-slider__lightbox-content {
        max-width: 85%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }

      @media (min-width: 1024px) {
        .st-images-slider__lightbox-content { max-width: 75%; }
      }

      .st-images-slider__lightbox-main {
        position: relative;
        display: flex;
        align-items: center;
      }

      .st-images-slider__lightbox-img {
        max-height: calc(100vh - 200px);
        width: 100%;
        max-width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
        object-fit: contain;
      }

      .st-images-slider__lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        border: none;
        cursor: pointer;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .st-images-slider__lightbox-nav--prev { inset-inline-start: 0.5rem; }
      .st-images-slider__lightbox-nav--next { inset-inline-end: 0.5rem; }

      .st-images-slider__lightbox-thumbs {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 8px;
        flex-wrap: wrap;
      }

      .st-images-slider__lightbox-thumb {
        height: 100px;
        width: 100px;
        overflow: hidden;
        padding: 0;
        border: 2px solid transparent;
        background: none;
        cursor: pointer;
      }

      .st-images-slider__lightbox-thumb.is-active { border-color: ${e}; }

      .st-images-slider__lightbox-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    `, document.head.appendChild(this.styleElement);
  }
  render() {
    if (!this.config)
      return r`<div>Configuration is required</div>`;
    const i = this.config.bg_color || "#ffffff", e = this.config.images || [];
    return r`
      <section id="st-images-slider" class="st-images-slider" style="background: ${i};">
        <!-- Section header (start-aligned, matches source SectionHeader) -->
        <div class="st-images-slider__header-wrap">
          <h3 class="st-images-slider__title">${this.config.section_title}</h3>
        </div>

        <!-- Parallax wrapper + scrollable track -->
        <div class="st-images-slider__parallax">
          <div class="st-images-slider__track">
            ${e.map(
      (s, t) => r`
                <div
                  class="st-images-slider__item"
                  @click=${() => this.openLightbox(t)}
                >
                  <img
                    src="${s.src}"
                    alt="${s.title || ""}"
                    class="st-images-slider__img"
                    loading="lazy"
                  />
                </div>
              `
    )}
          </div>
        </div>

        <!-- Lightbox -->
        ${this.lightboxOpen && e.length ? r`
              <div
                class="st-images-slider__lightbox"
                @click=${(s) => {
      s.target === s.currentTarget && this.closeLightbox();
    }}
              >
                <div class="st-images-slider__lightbox-content">
                  <div class="st-images-slider__lightbox-main">
                    <img
                      class="st-images-slider__lightbox-img"
                      src="${e[this.lightboxIndex].src}"
                      alt="${e[this.lightboxIndex].title || ""}"
                    />
                    ${e.length > 1 ? r`
                          <button
                            class="st-images-slider__lightbox-nav st-images-slider__lightbox-nav--prev"
                            aria-label="السابق"
                            @click=${() => this.lightboxStep(-1)}
                          >&#8250;</button>
                          <button
                            class="st-images-slider__lightbox-nav st-images-slider__lightbox-nav--next"
                            aria-label="التالي"
                            @click=${() => this.lightboxStep(1)}
                          >&#8249;</button>
                        ` : ""}
                  </div>
                  ${e.length > 1 ? r`
                        <div class="st-images-slider__lightbox-thumbs">
                          ${e.map(
      (s, t) => r`
                              <button
                                class="st-images-slider__lightbox-thumb ${t === this.lightboxIndex ? "is-active" : ""}"
                                @click=${() => {
        this.lightboxIndex = t, this.requestUpdate();
      }}
                              >
                                <img src="${s.src}" alt="${s.title || ""}" loading="lazy" />
                              </button>
                            `
    )}
                        </div>
                      ` : ""}
                </div>
              </div>
            ` : ""}
      </section>
    `;
  }
}
o([
  m({ type: Object })
], l.prototype, "config");
o([
  h()
], l.prototype, "lightboxOpen");
o([
  h()
], l.prototype, "lightboxIndex");
typeof l < "u" && l.registerSallaComponent("salla-st-images-slider");
export {
  l as default
};
