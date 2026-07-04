import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import AOS from '../../utils/animate-on-scroll';

export default class StFeature extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    shade_color: string;
    primary_color: string;
    brand_color: string;
    icon: string;
    title: string;
    body1: string;
    body2: string;
    button_label: string;
    button_link: string;
    button_icon: string;
    side_image: string;
  };

  @state()
  private lightboxOpen: boolean = false;

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

    const bgColor = this.config?.bg_color || '#ffffff';
    const shadeColor = this.config?.shade_color || '#F7F7F7';
    const primaryColor = this.config?.primary_color || '#050505';
    const brandColor = this.config?.brand_color || '#0071E3';

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .st-feature {
        display: block;
        width: 100%;
        background: ${bgColor};
        padding: 5rem 1.5rem;
        color: ${primaryColor};
      }

      .st-feature__container {
        max-width: 1200px;
        margin: 0 auto;
      }

      .st-feature__layout {
        display: flex;
        flex-direction: column-reverse;
        gap: 4rem;
      }

      @media (min-width: 768px) {
        .st-feature__layout {
          flex-direction: row;
          align-items: center;
        }

        [dir="rtl"] .st-feature__layout {
          flex-direction: row-reverse;
        }
      }

      .st-feature__content {
        flex: 1;
        max-width: 36rem;
      }

      .st-feature__icon {
        display: block;
        font-size: 2.5rem;
        line-height: 1;
        margin-bottom: 1.5rem;
        padding: 0.75rem;
        background: ${shadeColor};
        border-radius: 50%;
        width: fit-content;
      }

      .st-feature__title {
        font-size: clamp(1.5rem, 3vw, 3rem);
        font-weight: 700;
        line-height: 1.3;
        margin-bottom: 1.5rem;
        color: ${primaryColor};
      }

      .st-feature__body {
        font-size: 1rem;
        line-height: 1.8;
        margin-bottom: 1rem;
        color: #525252;
      }

      .st-feature__btn {
        position: relative;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.875rem 2rem;
        border-radius: 9999px;
        background: ${brandColor};
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
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .st-feature__image {
        width: 100%;
        max-width: 500px;
        border-radius: 1.5rem;
        cursor: pointer;
        transition: transform 0.3s ease;
      }

      .st-feature__image:hover {
        transform: scale(1.02);
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
    `;
    document.head.appendChild(this.styleElement);
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const {
      brand_color,
      icon,
      title,
      body1,
      body2,
      button_label,
      button_link,
      button_icon,
      side_image,
    } = this.config;

    const brandColor = brand_color || '#0071E3';

    return html`
      <section id="st-feature" class="st-feature">
        <div class="st-feature__container">
          <div class="st-feature__layout">
            <!-- Content column -->
            <div class="st-feature__content">
              ${icon ? html`
                <span class="st-feature__icon" data-animate="slide-right" data-delay="0">
                  <i class="${icon}" style="color: ${brandColor}"></i>
                </span>
              ` : ''}

              <h2 class="st-feature__title" data-animate="slide-right" data-delay="200">
                ${title}
              </h2>

              ${body1 ? html`
                <p class="st-feature__body" data-animate="slide-right" data-delay="400">
                  ${body1}
                </p>
              ` : ''}

              ${body2 ? html`
                <p class="st-feature__body" data-animate="slide-right" data-delay="500">
                  ${body2}
                </p>
              ` : ''}

              ${button_label ? html`
                <div data-animate="slide-right" data-delay="600">
                  <a href="${button_link || '#'}" class="st-feature__btn">
                    <span class="st-feature__btn-text-a">
                      ${button_label}
                      ${button_icon ? html`<i class="${button_icon}"></i>` : ''}
                    </span>
                    <span class="st-feature__btn-text-b">
                      ${button_label}
                      ${button_icon ? html`<i class="${button_icon}"></i>` : ''}
                    </span>
                  </a>
                </div>
              ` : ''}
            </div>

            <!-- Image column -->
            <div class="st-feature__image-col" data-animate="slide-up" data-delay="200">
              ${side_image ? html`
                <img
                  src="${side_image}"
                  alt="${title || ''}"
                  class="st-feature__image"
                  loading="lazy"
                  @click="${() => (this.lightboxOpen = true)}"
                />
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Lightbox -->
        ${this.lightboxOpen ? html`
          <div
            class="st-feature__lightbox"
            @click="${() => (this.lightboxOpen = false)}"
          >
            <div
              class="st-feature__lightbox-content"
              @click="${(e: Event) => e.stopPropagation()}"
            >
              <img
                src="${side_image}"
                alt="${title || ''}"
                class="st-feature__lightbox-img"
              />
              <button
                class="st-feature__lightbox-close"
                aria-label="Close"
                @click="${() => (this.lightboxOpen = false)}"
              >
                ✕
              </button>
            </div>
          </div>
        ` : ''}
      </section>
    `;
  }
}
