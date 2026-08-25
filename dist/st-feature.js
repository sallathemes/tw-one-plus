import { LitElement as p, html as i } from "lit";
import { property as h, state as g } from "lit/decorators.js";
import { A as m } from "./animate-on-scroll-ROUn9sF1.js";
import "./fonts-ClHg20Ea.js";
var b = Object.defineProperty, u = (c, e, r, s) => {
  for (var t = void 0, a = c.length - 1, n; a >= 0; a--)
    (n = c[a]) && (t = n(e, r, t) || t);
  return t && b(e, r, t), t;
};
class l extends p {
  constructor() {
    super(...arguments), this.lightboxOpen = !1, this.styleElement = null;
  }
  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles(), m.init();
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.styleElement) == null || e.remove();
  }
  updated(e) {
    super.updated(e), m.refresh();
  }
  injectStyles() {
    var a, n, d, o;
    if (this.styleElement) return;
    const e = ((a = this.config) == null ? void 0 : a.bg_color) || "#ffffff", r = ((n = this.config) == null ? void 0 : n.shade_color) || "#F7F7F7", s = ((d = this.config) == null ? void 0 : d.primary_color) || "#050505", t = ((o = this.config) == null ? void 0 : o.brand_color) || "#0071E3";
    this.styleElement = document.createElement("style"), this.styleElement.textContent = `
      .st-feature {
        display: block;
        width: 100%;
        background: ${e};
        padding: 2.5rem 0;
        color: ${s};
      }

      @media (min-width: 768px) {
        .st-feature { padding: 4rem 0; }
      }

      .st-feature__container {
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 0.5rem;
      }

      @media (min-width: 768px) {
        .st-feature__container { padding: 0 1rem; }
      }

      @media (min-width: 1024px) {
        .st-feature__container { padding: 0 2.5rem; }
      }

      @media (min-width: 1280px) {
        .st-feature__container { padding: 0 88px; }
      }

      /* Rounded shade card wrapper (matches source rounded-[32px] shade panel) */
      .st-feature__layout {
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-between;
        background: ${r};
        border-radius: 32px;
        padding: 1rem;
        overflow-y: hidden;
      }

      @media (min-width: 768px) {
        .st-feature__layout {
          flex-direction: row;
          padding: 1.75rem;
        }
      }

      @media (min-width: 1024px) {
        .st-feature__layout { padding: 2.5rem; }
      }

      .st-feature__content {
        width: 100%;
        max-width: 528px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        text-align: center;
      }

      @media (min-width: 768px) {
        .st-feature__content {
          margin: 0;
          text-align: start;
          padding-inline-end: 1rem;
        }
      }

      @media (min-width: 1024px) {
        .st-feature__content { width: 50%; }
      }

      .st-feature__icon {
        display: flex;
        width: 100%;
        justify-content: center;
        font-size: 3rem;
        line-height: 1;
      }

      @media (min-width: 768px) {
        .st-feature__icon { justify-content: flex-start; }
      }

      .st-feature__title {
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1.35;
        width: 100%;
        margin: 0;
        color: ${s};
      }

      @media (min-width: 768px) {
        .st-feature__title { font-size: 1.875rem; line-height: 40px; }
      }

      @media (min-width: 1024px) {
        .st-feature__title { font-size: 2.25rem; line-height: 48px; }
      }

      @media (min-width: 1280px) {
        .st-feature__title { font-size: 40px; line-height: 64px; }
      }

      .st-feature__bodies {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .st-feature__body {
        font-size: 0.75rem;
        font-weight: 400;
        line-height: 1.8;
        margin: 0;
        width: 100%;
        color: #525252;
      }

      @media (min-width: 768px) {
        .st-feature__body { font-size: 0.875rem; }
      }

      @media (min-width: 1024px) {
        .st-feature__body { font-size: 1rem; }
      }

      .st-feature__btn-row {
        width: 100%;
        display: flex;
        justify-content: center;
      }

      @media (min-width: 768px) {
        .st-feature__btn-row { justify-content: flex-start; }
      }

      .st-feature__btn {
        position: relative;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.875rem 2rem;
        border-radius: 9999px;
        background: ${t};
        color: #ffffff;
        border: none;
        cursor: pointer;
        text-decoration: none;
        font-weight: 700;
        margin-top: 0.5rem;
      }

      .st-feature__btn-text-a,
      .st-feature__btn-text-b {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: transform 0.25s ease, opacity 0.25s ease;
        white-space: nowrap;
      }

      .st-feature__btn-text-b {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transform: translateY(150%);
        opacity: 0;
      }

      .st-feature__btn:hover .st-feature__btn-text-a {
        transform: translateY(-150%);
        opacity: 0;
      }

      .st-feature__btn:hover .st-feature__btn-text-b {
        transform: translateY(0);
        opacity: 1;
      }

      .st-feature__image-col {
        width: 100%;
        max-width: 528px;
        margin: 0 auto 2rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        cursor: pointer;
        border-radius: 1rem;
        overflow: hidden;
        background: #F1F1F1;
      }

      @media (min-width: 768px) {
        .st-feature__image-col { margin: 0; max-width: none; }
      }

      @media (min-width: 1024px) {
        .st-feature__image-col { width: 50%; }
      }

      .st-feature__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .st-feature__lightbox {
        position: fixed;
        inset: 0;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .st-feature__lightbox-content {
        position: relative;
        max-width: 85vw;
        max-height: 85vh;
      }

      .st-feature__lightbox-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 12px;
      }

      .st-feature__lightbox-close {
        position: absolute;
        top: -2rem;
        right: 0;
        background: transparent;
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
      }
    `, document.head.appendChild(this.styleElement);
  }
  render() {
    if (!this.config)
      return i`<div>Configuration is required</div>`;
    const {
      brand_color: e,
      icon: r,
      title: s,
      body1: t,
      body2: a,
      button_label: n,
      button_link: d,
      button_icon: o,
      side_image: f
    } = this.config;
    return i`
      <section id="st-feature" class="st-feature">
        <div class="st-feature__container">
          <div class="st-feature__layout">
            <!-- Content column -->
            <div class="st-feature__content">
              ${r ? i`
                <span class="st-feature__icon" data-animate="slide-right" data-delay="0">
                  <i class="${r}" style="color: ${e || "#0071E3"}"></i>
                </span>
              ` : ""}

              <h2 class="st-feature__title" data-animate="slide-right" data-delay="200">
                ${s}
              </h2>

              ${t || a ? i`
                <div class="st-feature__bodies" data-animate="slide-right" data-delay="400">
                  ${t ? i`<p class="st-feature__body">${t}</p>` : ""}
                  ${a ? i`<p class="st-feature__body">${a}</p>` : ""}
                </div>
              ` : ""}

              ${n ? i`
                <div class="st-feature__btn-row" data-animate="slide-right" data-delay="600">
                  <a href="${d || "#"}" class="st-feature__btn">
                    <span class="st-feature__btn-text-a">
                      ${n}
                      ${o ? i`<i class="${o}"></i>` : ""}
                    </span>
                    <span class="st-feature__btn-text-b">
                      ${n}
                      ${o ? i`<i class="${o}"></i>` : ""}
                    </span>
                  </a>
                </div>
              ` : ""}
            </div>

            <!-- Image column -->
            <div class="st-feature__image-col" data-animate="slide-up" data-delay="200">
              ${f ? i`
                <img
                  src="${f}"
                  alt="${s || ""}"
                  class="st-feature__image"
                  loading="lazy"
                  @click="${() => this.lightboxOpen = !0}"
                />
              ` : ""}
            </div>
          </div>
        </div>

        <!-- Lightbox -->
        ${this.lightboxOpen ? i`
          <div
            class="st-feature__lightbox"
            @click="${() => this.lightboxOpen = !1}"
          >
            <div
              class="st-feature__lightbox-content"
              @click="${(_) => _.stopPropagation()}"
            >
              <img
                src="${f}"
                alt="${s || ""}"
                class="st-feature__lightbox-img"
              />
              <button
                class="st-feature__lightbox-close"
                aria-label="Close"
                @click="${() => this.lightboxOpen = !1}"
              >
                ✕
              </button>
            </div>
          </div>
        ` : ""}
      </section>
    `;
  }
}
u([
  h({ type: Object })
], l.prototype, "config");
u([
  g()
], l.prototype, "lightboxOpen");
typeof l < "u" && l.registerSallaComponent("salla-st-feature");
export {
  l as default
};
