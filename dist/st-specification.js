import { LitElement as u, html as a } from "lit";
import { property as x } from "lit/decorators.js";
import { A as f } from "./animate-on-scroll-CruvFX6N.js";
import "./fonts-CqDo7kag.js";
var b = Object.defineProperty, g = (n, i, t, r) => {
  for (var e = void 0, s = n.length - 1, o; s >= 0; s--)
    (o = n[s]) && (e = o(i, t, e) || e);
  return e && b(i, t, e), e;
};
class l extends u {
  constructor() {
    super(...arguments), this.styleElement = null;
  }
  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles(), f.init();
  }
  disconnectedCallback() {
    var i;
    super.disconnectedCallback(), (i = this.styleElement) == null || i.remove();
  }
  updated(i) {
    super.updated(i), f.refresh();
  }
  injectStyles() {
    this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.textContent = `
      .st-specification {
        display: block;
        width: 100%;
        overflow: hidden;
        background: var(--st-specification-bg, #ffffff);
        padding: 2.5rem 1.5rem;
      }

      @media (min-width: 768px) {
        .st-specification {
          padding: 4rem 1.5rem;
        }
      }

      .st-specification__container {
        max-width: 1050px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 3rem;
      }

      .st-specification__header {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .st-specification__title {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1.35;
        color: var(--st-specification-primary, #050505);
      }

      @media (min-width: 768px) {
        .st-specification__title {
          font-size: 1.875rem;
          line-height: 40px;
        }
      }

      @media (min-width: 1024px) {
        .st-specification__title {
          font-size: 2.25rem;
          line-height: 48px;
        }
      }

      @media (min-width: 1280px) {
        .st-specification__title {
          font-size: 40px;
          line-height: 64px;
        }
      }

      .st-specification__subtitle {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.8;
        max-width: 42rem;
        color: var(--st-specification-secondary, #525252);
      }

      @media (min-width: 768px) {
        .st-specification__subtitle {
          font-size: 1rem;
        }
      }

      .st-specification__table-wrapper {
        width: 100%;
        padding: 0.5rem 0;
        display: flex;
        flex-direction: column;
        overflow-x: auto;
        overflow-y: hidden;
        position: relative;
        scrollbar-width: thin;
        scrollbar-color: var(--st-specification-brand, #0071E3) var(--st-specification-border, #E9E9E9);
      }

      .st-specification__table-wrapper::-webkit-scrollbar {
        height: 6px;
      }

      .st-specification__table-wrapper::-webkit-scrollbar-track {
        background: var(--st-specification-border, #E9E9E9);
        border-radius: 3px;
      }

      .st-specification__table-wrapper::-webkit-scrollbar-thumb {
        background: var(--st-specification-brand, #0071E3);
        border-radius: 3px;
      }

      .st-specification__row {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        width: max-content;
        min-width: 100%;
        position: relative;
        padding: 2rem 0;
        border-bottom: 1px solid var(--st-specification-border, #E9E9E9);
        transition: background-color 0.2s ease;
      }

      .st-specification__row:hover {
        background-color: rgba(0, 0, 0, 0.02);
      }

      .st-specification__row:first-of-type {
        padding-top: 0;
      }

      .st-specification__row:last-of-type {
        padding-bottom: 0;
        border-bottom: 0;
      }

      /* Fixed cell widths matching source: 160px / md 300px / xl 350px */
      .st-specification__row-header {
        position: sticky;
        left: 0;
        z-index: 10;
        width: 160px;
        flex-shrink: 0;
        font-weight: 700;
        font-size: 1rem;
        color: var(--st-specification-primary, #050505);
        background: var(--st-specification-bg, #ffffff);
      }

      [dir="rtl"] .st-specification__row-header {
        left: auto;
        right: 0;
      }

      @media (min-width: 768px) {
        .st-specification__row-header {
          font-size: 1.125rem;
          width: 300px;
        }
      }

      @media (min-width: 1280px) {
        .st-specification__row-header {
          font-size: 1.25rem;
          width: 350px;
        }
      }

      .st-specification__cols {
        display: flex;
        flex-direction: row;
      }

      .st-specification__col {
        width: 160px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      @media (min-width: 768px) {
        .st-specification__col { width: 300px; }
      }

      @media (min-width: 1280px) {
        .st-specification__col { width: 350px; }
      }

      .st-specification__col-title {
        font-size: 0.625rem;
        font-weight: 400;
        color: var(--st-specification-secondary, #525252);
      }

      @media (min-width: 768px) {
        .st-specification__col-title {
          font-size: 0.75rem;
        }
      }

      @media (min-width: 1280px) {
        .st-specification__col-title {
          font-size: 0.875rem;
        }
      }

      .st-specification__col-value {
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--st-specification-primary, #050505);
      }

      @media (min-width: 768px) {
        .st-specification__col-value {
          font-size: 0.875rem;
        }
      }

      @media (min-width: 1280px) {
        .st-specification__col-value {
          font-size: 1rem;
        }
      }

    `, document.head.appendChild(this.styleElement));
  }
  getColumns(i) {
    const t = [];
    return i.col1_title && t.push({ title: i.col1_title, value: i.col1_value }), i.col2_title && t.push({ title: i.col2_title, value: i.col2_value }), i.col3_title && t.push({ title: i.col3_title, value: i.col3_value }), i.col4_title && t.push({ title: i.col4_title, value: i.col4_value }), t;
  }
  render() {
    if (!this.config) return a``;
    const i = this.config.bg_color || "#ffffff", t = this.config.primary_color || "#050505", r = this.config.secondary_color || "#525252", e = this.config.border_color || "#E9E9E9", s = this.config.brand_color || "#0071E3", o = this.config.rows || [];
    return a`
      <section
        id="st-specification"
        class="st-specification"
        style="
          --st-specification-bg: ${i};
          --st-specification-primary: ${t};
          --st-specification-secondary: ${r};
          --st-specification-border: ${e};
          --st-specification-brand: ${s};
        "
        data-animate="slide-up"
      >
        <div class="st-specification__container">
          <div class="st-specification__header">
            <h2
              class="st-specification__title"
              data-animate="fade-up"
              data-delay="0"
            >
              ${this.config.section_title}
            </h2>
            <p
              class="st-specification__subtitle"
              data-animate="fade-up"
              data-delay="150"
            >
              ${this.config.section_subtitle}
            </p>
          </div>

          <div class="st-specification__table-wrapper">
            ${(() => {
      const m = Math.max(
        0,
        ...o.map((c) => this.getColumns(c).length)
      );
      return o.map((c, _) => {
        const p = this.getColumns(c), h = Array(Math.max(0, m - p.length)).fill(null);
        return a`
                  <div
                    class="st-specification__row"
                    data-animate="fade-up"
                    data-delay="${_ * 150}"
                  >
                    <div class="st-specification__row-header">${c.header}</div>
                    <div class="st-specification__cols">
                      ${p.map((d) => a`
                        <div class="st-specification__col">
                          <span class="st-specification__col-title">${d.title}</span>
                          <span class="st-specification__col-value">${d.value}</span>
                        </div>
                      `)}
                      ${h.map(() => a`<div class="st-specification__col"></div>`)}
                    </div>
                  </div>
                `;
      });
    })()}
          </div>
        </div>
      </section>
    `;
  }
}
g([
  x({ type: Object })
], l.prototype, "config");
typeof l < "u" && l.registerSallaComponent("salla-st-specification");
export {
  l as default
};
