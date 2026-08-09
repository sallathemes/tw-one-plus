import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import AOS from '../../utils/animate-on-scroll';
import '../../utils/fonts';

export default class StScentNotes extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    primary_color: string;
    secondary_color: string;
    brand_color: string;
    border_color: string;
    section_title: string;
    section_subtitle: string;
    footer_note: string;
    notes: Array<{
      icon: string;
      step_label: string;
      title: string;
      description: string;
      ingredients: string;
    }>;
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

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    AOS.refresh();
  }

  injectStyles() {
    if (this.styleElement) return;

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .st-scent-notes {
        display: block;
        width: 100%;
        padding: 3.5rem 0;
        background: var(--st-scent-notes-bg, #ffffff);
        overflow: visible;
      }

      .st-scent-notes__container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 1.25rem;
      }

      @media (min-width: 1024px) {
        .st-scent-notes__container { padding: 0 2.5rem; }
      }

      .st-scent-notes__header {
        text-align: center;
        max-width: 640px;
        margin: 0 auto 3rem;
      }

      .st-scent-notes__header h2 {
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1.35;
        color: var(--st-scent-notes-primary, #1A1613);
        margin: 0 0 0.75rem;
      }

      @media (min-width: 768px) {
        .st-scent-notes__header h2 { font-size: 1.875rem; }
      }

      @media (min-width: 1280px) {
        .st-scent-notes__header h2 { font-size: 2.25rem; }
      }

      .st-scent-notes__header p {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.75;
        color: var(--st-scent-notes-secondary, #6B6259);
      }

      /* Timeline / pyramid list */
      .st-scent-notes__list {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      /* Connecting line runs through the step badges */
      .st-scent-notes__list::before {
        content: '';
        position: absolute;
        top: 28px;
        bottom: 28px;
        inset-inline-start: 27px;
        width: 1px;
        background: var(--st-scent-notes-border, #E6DED4);
      }

      .st-scent-notes__row {
        position: relative;
        display: flex;
        align-items: flex-start;
        gap: 1.25rem;
        padding: 1.5rem 0;
      }

      @media (min-width: 768px) {
        .st-scent-notes__row { gap: 1.75rem; padding: 1.85rem 0; }
      }

      .st-scent-notes__row + .st-scent-notes__row {
        border-top: 1px solid var(--st-scent-notes-border, #E6DED4);
      }

      .st-scent-notes__badge {
        position: relative;
        z-index: 1;
        flex-shrink: 0;
        width: 56px;
        height: 56px;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--st-scent-notes-bg, #ffffff);
        border: 1px solid var(--st-scent-notes-border, #E6DED4);
        font-size: 1.35rem;
        color: var(--st-scent-notes-brand, #B4643C);
      }

      .st-scent-notes__body {
        flex: 1;
        min-width: 0;
      }

      .st-scent-notes__step-label {
        display: block;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        color: var(--st-scent-notes-brand, #B4643C);
        margin: 0 0 0.35rem;
        text-transform: uppercase;
      }

      .st-scent-notes__title {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--st-scent-notes-primary, #1A1613);
        margin: 0 0 0.5rem;
      }

      @media (min-width: 768px) {
        .st-scent-notes__title { font-size: 1.25rem; }
      }

      .st-scent-notes__description {
        margin: 0 0 0.9rem;
        font-size: 0.9rem;
        line-height: 1.75;
        color: var(--st-scent-notes-secondary, #6B6259);
        max-width: 46rem;
      }

      .st-scent-notes__chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .st-scent-notes__chip {
        display: inline-flex;
        align-items: center;
        padding: 0.3rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.8rem;
        font-weight: 600;
        background: var(--st-scent-notes-chip-bg, rgba(180,100,60,0.08));
        color: var(--st-scent-notes-primary, #1A1613);
      }

      .st-scent-notes__footer {
        margin-top: 2rem;
        padding: 1.1rem 1.4rem;
        border-radius: 0.75rem;
        background: var(--st-scent-notes-chip-bg, rgba(180,100,60,0.08));
        font-size: 0.875rem;
        line-height: 1.7;
        color: var(--st-scent-notes-primary, #1A1613);
        display: flex;
        align-items: center;
        gap: 0.6rem;
      }

      .st-scent-notes__footer i {
        color: var(--st-scent-notes-brand, #B4643C);
        font-size: 1.1rem;
        flex-shrink: 0;
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  render() {
    if (!this.config) return html``;

    const bgColor = this.config.bg_color || '#ffffff';
    const primaryColor = this.config.primary_color || '#1A1613';
    const secondaryColor = this.config.secondary_color || '#6B6259';
    const brandColor = this.config.brand_color || '#B4643C';
    const borderColor = this.config.border_color || '#E6DED4';
    const notes = this.config.notes || [];

    return html`
      <section
        id="st-scent-notes"
        class="st-scent-notes"
        style="
          --st-scent-notes-bg: ${bgColor};
          --st-scent-notes-primary: ${primaryColor};
          --st-scent-notes-secondary: ${secondaryColor};
          --st-scent-notes-brand: ${brandColor};
          --st-scent-notes-border: ${borderColor};
        "
      >
        <div class="st-scent-notes__container">
          <div class="st-scent-notes__header">
            <h2 data-animate="fade-up" data-delay="0">
              ${this.config.section_title}
            </h2>
            ${this.config.section_subtitle
              ? html`<p data-animate="fade-up" data-delay="80">
                  ${this.config.section_subtitle}
                </p>`
              : ''}
          </div>

          <div class="st-scent-notes__list">
            ${notes.map((note, i) => {
              const ingredients = (note.ingredients || '')
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean);
              return html`
                <div
                  class="st-scent-notes__row"
                  data-animate="fade-up"
                  data-delay="${i * 100}"
                >
                  <div class="st-scent-notes__badge">
                    ${note.icon
                      ? html`<i class="${note.icon}"></i>`
                      : html`${i + 1}`}
                  </div>
                  <div class="st-scent-notes__body">
                    ${note.step_label
                      ? html`<span class="st-scent-notes__step-label"
                          >${note.step_label}</span
                        >`
                      : ''}
                    ${note.title
                      ? html`<h3 class="st-scent-notes__title">
                          ${note.title}
                        </h3>`
                      : ''}
                    ${note.description
                      ? html`<p class="st-scent-notes__description">
                          ${note.description}
                        </p>`
                      : ''}
                    ${ingredients.length
                      ? html`
                          <div class="st-scent-notes__chips">
                            ${ingredients.map(
                              (ing) =>
                                html`<span class="st-scent-notes__chip"
                                  >${ing}</span
                                >`
                            )}
                          </div>
                        `
                      : ''}
                  </div>
                </div>
              `;
            })}
          </div>

          ${this.config.footer_note
            ? html`
                <div
                  class="st-scent-notes__footer"
                  data-animate="fade-up"
                  data-delay="300"
                >
                  <i class="sicon-fire"></i>
                  <span>${this.config.footer_note}</span>
                </div>
              `
            : ''}
        </div>
      </section>
    `;
  }
}
