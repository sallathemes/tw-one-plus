import { LitElement as p, html as e } from "lit";
import { property as g, state as w } from "lit/decorators.js";
import { A as m } from "./animate-on-scroll-CruvFX6N.js";
import "./fonts-CqDo7kag.js";
var u = Object.defineProperty, c = (f, t, i, n) => {
  for (var o = void 0, r = f.length - 1, a; r >= 0; r--)
    (a = f[r]) && (o = a(t, i, o) || o);
  return o && u(t, i, o), o;
};
class l extends p {
  constructor() {
    super(...arguments), this.submitted = !1, this.styleElement = null;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles(), m.init();
  }
  updated(t) {
    super.updated(t), m.refresh();
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this.styleElement) == null || t.remove();
  }
  injectStyles() {
    this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.textContent = `
      st-footer { display: block; }

      .st-footer { display: block; width: 100%; }

      .st-footer__container {
        max-width: 1440px;
        margin: 0 auto;
        padding: 2rem 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
      }

      @media (min-width: 768px) {
        .st-footer__container { padding: 4rem 1rem; gap: 4rem; }
      }

      @media (min-width: 1024px) {
        .st-footer__container { padding: 4rem 2.5rem; }
      }

      @media (min-width: 1280px) {
        .st-footer__container { padding: 4rem 88px; }
      }

      /* ── Newsletter ─────────────────────────────── */
      .st-footer__newsletter {
        max-width: 620px;
        margin: 0 auto;
        width: 100%;
        padding-bottom: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      @media (min-width: 768px) {
        .st-footer__newsletter { padding-bottom: 3rem; }
      }

      @media (min-width: 1024px) {
        .st-footer__newsletter { padding-bottom: 4rem; }
      }

      .st-footer__newsletter-head {
        max-width: 32rem;
        margin: 0 auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .st-footer__newsletter-title {
        font-size: 1.125rem;
        line-height: 1.75rem;
        font-weight: 700;
        margin: 0;
      }

      @media (min-width: 768px) {
        .st-footer__newsletter-title { font-size: 1.25rem; line-height: 2rem; }
      }

      @media (min-width: 1024px) {
        .st-footer__newsletter-title { font-size: 1.5rem; line-height: 2.25rem; }
      }

      .st-footer__newsletter-subtitle {
        font-size: 0.875rem;
        font-weight: 400;
        color: #EEEEEE;
        margin: 0;
      }

      @media (min-width: 768px) {
        .st-footer__newsletter-subtitle { font-size: 1rem; }
      }

      .st-footer__newsletter-form {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: #ffffff;
        border-radius: 0.75rem;
        padding: 0.5rem;
        padding-inline-start: 1rem;
      }

      .st-footer__newsletter-mail-icon {
        font-size: 1.25rem;
        line-height: 1;
        color: #525252;
        flex-shrink: 0;
      }

      .st-footer__newsletter-input {
        flex: 1;
        min-width: 2rem;
        border: none;
        outline: none;
        background: transparent;
        font-size: 0.875rem;
        font-weight: 400;
        font-family: inherit;
        color: #525252;
        padding: 0.5rem 0;
      }

      .st-footer__newsletter-input::placeholder {
        color: #525252;
        font-size: 0.875rem;
      }

      .st-footer__newsletter-btn {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        border: none;
        cursor: pointer;
        border-radius: 0.625rem;
        padding: 0.625rem 1.25rem;
        font-size: 0.875rem;
        font-weight: 800;
        font-family: inherit;
        color: #fff;
        white-space: nowrap;
        transition: opacity 0.2s;
      }

      .st-footer__newsletter-btn:hover { opacity: 0.85; }

      .st-footer__newsletter-btn i { font-size: 1rem; line-height: 1; }

      .st-footer__newsletter-success {
        font-size: 0.9rem;
        font-weight: 700;
        padding: 1rem 0;
        text-align: center;
      }

      /* ── Navigation section (brand + columns) ───── */
      .st-footer__nav-section {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        row-gap: 3rem;
        max-width: 620px;
        margin: 0 auto;
      }

      @media (min-width: 1024px) {
        .st-footer__nav-section { max-width: none; margin: 0; }
      }

      .st-footer__brand {
        width: 100%;
        max-width: 478px;
        margin: 0 auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      @media (min-width: 1024px) {
        .st-footer__brand { margin: 0; text-align: start; }
      }

      .st-footer__brand-title {
        font-size: 1.125rem;
        line-height: 1.75rem;
        font-weight: 700;
        margin: 0;
      }

      @media (min-width: 768px) {
        .st-footer__brand-title { font-size: 1.25rem; line-height: 2rem; }
      }

      @media (min-width: 1024px) {
        .st-footer__brand-title { font-size: 1.5rem; line-height: 2.25rem; }
      }

      .st-footer__brand-desc {
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.8;
        margin: 0;
      }

      @media (min-width: 768px) {
        .st-footer__brand-desc { font-size: 1rem; }
      }

      /* Nav columns — w-1/2 max-w-204, matches source */
      .st-footer__nav-col {
        width: 50%;
        max-width: 204px;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      @media (min-width: 1024px) {
        .st-footer__nav-col { text-align: start; }
      }

      .st-footer__nav-header {
        font-size: 1rem;
        font-weight: 700;
        margin: 0;
      }

      @media (min-width: 768px) {
        .st-footer__nav-header { font-size: 1.125rem; }
      }

      @media (min-width: 1280px) {
        .st-footer__nav-header { font-size: 1.25rem; }
      }

      .st-footer__nav-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .st-footer__nav-link {
        font-size: 0.75rem;
        font-weight: 400;
        text-decoration: none;
        color: #EEEEEE;
        display: block;
        word-break: break-word;
      }

      @media (min-width: 768px) {
        .st-footer__nav-link { font-size: 0.875rem; }
      }

      @media (min-width: 1024px) {
        .st-footer__nav-link { font-size: 1rem; }
      }

      /* ── Trust badges ───────────────────────────── */
      .st-footer__meta-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1.5rem;
      }

      @media (min-width: 768px) {
        .st-footer__meta-inner { column-gap: 2rem; }
      }

      @media (min-width: 1024px) {
        .st-footer__meta-inner { column-gap: 3rem; }
      }

      .st-footer__meta-badge {
        display: flex;
        align-items: center;
        gap: 1rem;
        text-decoration: none;
        cursor: pointer;
      }

      .st-footer__meta-img {
        height: 42px;
        width: auto;
        object-fit: contain;
      }

      .st-footer__meta-text { display: flex; flex-direction: column; gap: 0.5rem; }

      .st-footer__meta-sub {
        font-size: 10px;
        line-height: 0.75rem;
        font-weight: 400;
        color: #EEEEEE;
        margin: 0;
      }

      @media (min-width: 1024px) {
        .st-footer__meta-sub { font-size: 0.75rem; line-height: 1.25rem; }
      }

      .st-footer__meta-title {
        font-size: 1rem;
        line-height: 25.6px;
        font-weight: 700;
        margin: 0;
      }

      /* ── Bottom bar ─────────────────────────────── */
      .st-footer__bottom-inner {
        max-width: 1440px;
        margin: 0 auto;
        padding: 1rem 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }

      @media (min-width: 768px) {
        .st-footer__bottom-inner { padding: 1rem; }
      }

      @media (min-width: 1024px) {
        .st-footer__bottom-inner {
          flex-direction: row;
          padding: 1rem 2.5rem;
        }
      }

      @media (min-width: 1280px) {
        .st-footer__bottom-inner { padding: 1rem 88px; }
      }

      .st-footer__copyright-wrap { width: 100%; }

      @media (min-width: 1024px) {
        .st-footer__copyright-wrap { width: 33.333%; }
      }

      .st-footer__copyright {
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 400;
        color: #525252;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      @media (min-width: 768px) {
        .st-footer__copyright { font-size: 1rem; line-height: 25.6px; }
      }

      @media (min-width: 1024px) {
        .st-footer__copyright { justify-content: flex-start; }
      }

      .st-footer__social {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.75rem;
        width: 100%;
      }

      @media (min-width: 1024px) {
        .st-footer__social { width: 33.333%; }
      }

      .st-footer__social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        padding: 10px;
        border: 1px solid #E9E9E9;
        border-radius: 9999px;
        text-decoration: none;
        color: #525252;
        font-size: 1.125rem;
        line-height: 1;
      }

      .st-footer__side-icons {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        width: 100%;
      }

      @media (min-width: 1024px) {
        .st-footer__side-icons { width: 33.333%; justify-content: flex-end; }
      }

      .st-footer__side-icon {
        object-fit: contain;
        width: 60px;
        height: 40px;
      }
    `, document.head.appendChild(this.styleElement));
  }
  handleSubmit(t) {
    t.preventDefault();
    const i = t.currentTarget.querySelector("input");
    i != null && i.value.trim() && (this.submitted = !0);
  }
  renderNavCol(t, i, n) {
    const o = [
      { label: t.link1_label, href: t.link1_href },
      { label: t.link2_label, href: t.link2_href },
      { label: t.link3_label, href: t.link3_href }
    ].filter((r) => r.label);
    return !t.header && !o.length ? e`` : e`
      <div class="st-footer__nav-col">
        ${t.header ? e`
          <h5 class="st-footer__nav-header"
              style="color:${i};"
              data-animate="fade-up" data-delay="${n}">${t.header}</h5>
        ` : ""}
        <ul class="st-footer__nav-list">
          ${o.map((r, a) => e`
            <li data-animate="fade-up" data-delay="${n + (a + 1) * 60}">
              <a class="st-footer__nav-link"
                 href="${r.href || "#"}">${r.label}</a>
            </li>
          `)}
        </ul>
      </div>
    `;
  }
  renderMetaBadge(t, i, n, o, r) {
    return !t && !i ? e`` : e`
      <a class="st-footer__meta-badge"
         href="${o || "#"}"
         target="${o && o !== "#" ? "_blank" : "_self"}"
         rel="noopener noreferrer">
        ${t ? e`<img class="st-footer__meta-img" src="${t}" alt="${i}" loading="lazy" />` : ""}
        ${i || n ? e`
          <span class="st-footer__meta-text" style="color:${r};">
            ${n ? e`<span class="st-footer__meta-sub">${n}</span>` : ""}
            ${i ? e`<span class="st-footer__meta-title">${i}</span>` : ""}
          </span>
        ` : ""}
      </a>
    `;
  }
  render() {
    if (!this.config) return e``;
    const t = this.config.bg_color || "#050505", i = this.config.bottom_bg_color || "#ffffff", n = this.config.text_color || "#ffffff", o = this.config.brand_color || "#0071E3", r = (this.config.copyright || "").replace("{{year}}", (/* @__PURE__ */ new Date()).getFullYear().toString()), a = [
      { icon: this.config.social1_icon, link: this.config.social1_link },
      { icon: this.config.social2_icon, link: this.config.social2_link },
      { icon: this.config.social3_icon, link: this.config.social3_link }
    ].filter((s) => s.icon), _ = (this.config.nav_columns || []).slice(0, 6), d = (this.config.side_icons || []).filter((s) => s.image);
    return e`
      <footer id="st-footer" class="st-footer">

        <!-- Dark body: newsletter + nav + trust badges -->
        <div style="background:${t}; color:${n};">
          <div class="st-footer__container">

            <!-- Newsletter -->
            ${this.config.newsletter_title || this.config.newsletter_subtitle ? e`
              <div class="st-footer__newsletter">
                <div class="st-footer__newsletter-head">
                  ${this.config.newsletter_title ? e`
                    <h3 class="st-footer__newsletter-title" style="color:${n};" data-animate="fade-up">
                      ${this.config.newsletter_title}
                    </h3>
                  ` : ""}
                  ${this.config.newsletter_subtitle ? e`
                    <p class="st-footer__newsletter-subtitle" data-animate="fade-up" data-delay="80">
                      ${this.config.newsletter_subtitle}
                    </p>
                  ` : ""}
                </div>
                ${this.submitted ? e`<p class="st-footer__newsletter-success" style="color:${o};">تم الاشتراك ✓</p>` : e`
                    <form class="st-footer__newsletter-form" @submit=${this.handleSubmit} data-animate="fade-up" data-delay="150">
                      ${this.config.newsletter_icon ? e`<i class="st-footer__newsletter-mail-icon ${this.config.newsletter_icon}"></i>` : ""}
                      <input
                        class="st-footer__newsletter-input"
                        type="email" name="email" required
                        placeholder="${this.config.newsletter_placeholder || "بريدك الالكتروني"}"
                      />
                      <button class="st-footer__newsletter-btn" type="submit" style="background:${o};">
                        <span>${this.config.newsletter_button_label || "اشترك"}</span>
                        ${this.config.newsletter_button_icon ? e`<i class="${this.config.newsletter_button_icon}"></i>` : ""}
                      </button>
                    </form>
                  `}
              </div>
            ` : ""}

            <!-- Navigation: brand block + up to 6 columns -->
            <div class="st-footer__nav-section">
              <div class="st-footer__brand" data-animate="fade-up">
                ${this.config.store_title ? e`<h3 class="st-footer__brand-title" style="color:${n};">${this.config.store_title}</h3>` : ""}
                ${this.config.store_description ? e`<h4 class="st-footer__brand-desc" style="color:${n};">${this.config.store_description}</h4>` : ""}
              </div>

              ${_.map((s, h) => this.renderNavCol(s, n, h * 100))}
            </div>

            <!-- Trust badges -->
            ${this.config.meta1_image || this.config.meta1_title || this.config.meta2_image || this.config.meta2_title ? e`
              <div class="st-footer__meta-inner">
                ${this.renderMetaBadge(this.config.meta1_image, this.config.meta1_title, this.config.meta1_subtitle, this.config.meta1_link, n)}
                ${this.renderMetaBadge(this.config.meta2_image, this.config.meta2_title, this.config.meta2_subtitle, this.config.meta2_link, n)}
              </div>
            ` : ""}

          </div>
        </div>

        <!-- Bottom bar: copyright / socials / payment icons -->
        <div style="background:${i};">
          <div class="st-footer__bottom-inner">
            <div class="st-footer__copyright-wrap">
              <p class="st-footer__copyright">${r}</p>
            </div>

            ${a.length ? e`
              <div class="st-footer__social">
                ${a.map((s) => e`
                  <a class="st-footer__social-link"
                     href="${s.link || "#"}"
                     target="_blank" rel="noopener noreferrer"
                     title="${s.link || ""}">
                    <i class="${s.icon}"></i>
                  </a>
                `)}
              </div>
            ` : ""}

            ${d.length ? e`
              <div class="st-footer__side-icons">
                ${d.map((s) => e`
                  <img class="st-footer__side-icon" src="${s.image}" alt="" loading="lazy" />
                `)}
              </div>
            ` : ""}
          </div>
        </div>

      </footer>
    `;
  }
}
c([
  g({ type: Object })
], l.prototype, "config");
c([
  w()
], l.prototype, "submitted");
typeof l < "u" && l.registerSallaComponent("salla-st-footer");
export {
  l as default
};
