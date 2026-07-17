import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import AOS from '../../utils/animate-on-scroll';
import '../../utils/fonts';

type SpecificationRow = {
  header: string;
  col1_title: string;
  col1_value: string;
  col2_title: string;
  col2_value: string;
  col3_title: string;
  col3_value: string;
  col4_title: string;
  col4_value: string;
};

export default class StSpecification extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    primary_color: string;
    secondary_color: string;
    border_color: string;
    brand_color: string;
    section_title: string;
    section_subtitle: string;
    rows: SpecificationRow[];
  };

  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }

  private styleElement: HTMLStyleElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
    AOS.init();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.styleElement?.remove();
  }

  updated(changedProperties: any) {
    super.updated(changedProperties);
    AOS.refresh();
  }

  injectStyles() {
    if (this.styleElement) return;

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
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

    `;
    document.head.appendChild(this.styleElement);
  }

  private getColumns(row: SpecificationRow): Array<{ title: string; value: string }> {
    const columns: Array<{ title: string; value: string }> = [];
    if (row.col1_title) columns.push({ title: row.col1_title, value: row.col1_value });
    if (row.col2_title) columns.push({ title: row.col2_title, value: row.col2_value });
    if (row.col3_title) columns.push({ title: row.col3_title, value: row.col3_value });
    if (row.col4_title) columns.push({ title: row.col4_title, value: row.col4_value });
    return columns;
  }

  render() {
    if (!this.config) return html``;

    const bgColor = this.config.bg_color || '#ffffff';
    const primaryColor = this.config.primary_color || '#050505';
    const secondaryColor = this.config.secondary_color || '#525252';
    const borderColor = this.config.border_color || '#E9E9E9';
    const brandColor = this.config.brand_color || '#0071E3';
    const rows = this.config.rows || [];

    return html`
      <section
        id="st-specification"
        class="st-specification"
        style="
          --st-specification-bg: ${bgColor};
          --st-specification-primary: ${primaryColor};
          --st-specification-secondary: ${secondaryColor};
          --st-specification-border: ${borderColor};
          --st-specification-brand: ${brandColor};
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
              const maxColumns = Math.max(
                0,
                ...rows.map((row) => this.getColumns(row).length)
              );
              return rows.map((row, i) => {
                const columns = this.getColumns(row);
                const fillers = Array(Math.max(0, maxColumns - columns.length)).fill(null);
                return html`
                  <div
                    class="st-specification__row"
                    data-animate="fade-up"
                    data-delay="${i * 150}"
                  >
                    <div class="st-specification__row-header">${row.header}</div>
                    <div class="st-specification__cols">
                      ${columns.map((col) => html`
                        <div class="st-specification__col">
                          <span class="st-specification__col-title">${col.title}</span>
                          <span class="st-specification__col-value">${col.value}</span>
                        </div>
                      `)}
                      ${fillers.map(() => html`<div class="st-specification__col"></div>`)}
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
