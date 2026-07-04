import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import AOS from '../../utils/animate-on-scroll';

export default class StDemo extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    text_color: string;
    brand_color: string;
    // Panel 1 (left panel — content only, no button)
    panel1_title: string;
    panel1_body1: string;
    panel1_body2: string;
    panel1_image: string;
    // Panel 2 (right panel — has button)
    panel2_title: string;
    panel2_body1: string;
    panel2_body2: string;
    panel2_image: string;
    panel2_button_label: string;
    panel2_button_link: string;
    // 3D product rotation viewer
    viewer_images: Array<{ image: string; label: string }>;
    viewer_bg_text: string;
  };

  @state()
  private currentViewerIndex: number = 0;

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

    const bgColor = this.config?.bg_color || '#050505';
    const textColor = this.config?.text_color || '#ffffff';
    const brandColor = this.config?.brand_color || '#0071E3';

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .st-demo {
        display: block;
        width: 100%;
        background: ${bgColor};
        color: ${textColor};
        padding: 5rem 1.5rem;
        overflow: hidden;
      }

      .st-demo__container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 6rem;
      }

      .st-demo__panel {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
      }

      @media (max-width: 768px) {
        .st-demo__panel {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
      }

      /* ===== 3D Product Rotation Viewer ===== */
      .st-demo__viewer {
        position: relative;
        min-height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 2rem;
        overflow: hidden;
      }

      .st-demo__viewer-bg-text {
        position: absolute;
        font-size: clamp(4rem, 12vw, 10rem);
        font-weight: 900;
        opacity: 0.05;
        user-select: none;
        pointer-events: none;
        white-space: nowrap;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: ${textColor};
        z-index: 0;
      }

      .st-demo__viewer-stage {
        position: relative;
        width: 100%;
        height: 320px;
        z-index: 1;
      }

      .st-demo__viewer-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        opacity: 0;
        transform: translateX(300px) scale(0.5);
        transition: none;
      }

      .st-demo__viewer-img.is-active {
        opacity: 1;
        transform: translateX(0) scale(1);
        animation: stDemoViewerEnter 0.3s ease forwards;
      }

      @keyframes stDemoViewerEnter {
        from {
          transform: translateX(300px) scale(0.5);
          opacity: 0;
        }
        to {
          transform: translateX(0) scale(1);
          opacity: 1;
        }
      }

      .st-demo__viewer-controls {
        display: flex;
        gap: 0.75rem;
        padding: 1rem;
        overflow-x: auto;
        width: 100%;
        justify-content: center;
        z-index: 1;
        scrollbar-width: thin;
        scrollbar-color: ${brandColor} transparent;
      }

      .st-demo__viewer-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        border-radius: 0.75rem;
        border: 2px solid transparent;
        background: transparent;
        color: ${textColor};
        cursor: pointer;
        transition: border-color 0.2s;
        flex-shrink: 0;
      }

      .st-demo__viewer-btn.is-active {
        border-color: ${brandColor};
      }

      .st-demo__viewer-thumb {
        width: 48px;
        height: 48px;
        object-fit: contain;
        border-radius: 0.5rem;
      }

      .st-demo__viewer-btn span {
        font-size: 0.7rem;
        white-space: nowrap;
      }

      /* ===== Panel content ===== */
      .st-demo__panel-content {
        text-align: start;
      }

      .st-demo__panel-title {
        font-size: clamp(1.5rem, 3vw, 2.5rem);
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: ${textColor};
      }

      .st-demo__panel-body {
        font-size: 1rem;
        line-height: 1.8;
        margin-bottom: 1rem;
        opacity: 0.75;
      }

      .st-demo__panel-image {
        width: 100%;
        border-radius: 1.5rem;
        object-fit: cover;
      }

      /* ===== CTA Button — slide-up text reveal ===== */
      .st-demo__btn-wrap {
        margin-top: 2rem;
      }

      .st-demo__btn {
        position: relative;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        padding: 0.875rem 2rem;
        border-radius: 9999px;
        background: ${brandColor};
        color: #ffffff;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
      }

      .st-demo__btn-text-a,
      .st-demo__btn-text-b {
        transition: transform 0.25s ease, opacity 0.25s ease;
        white-space: nowrap;
      }

      .st-demo__btn-text-b {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(150%);
        opacity: 0;
      }

      .st-demo__btn:hover .st-demo__btn-text-a {
        transform: translateY(-150%);
        opacity: 0;
      }

      .st-demo__btn:hover .st-demo__btn-text-b {
        transform: translateY(0);
        opacity: 1;
      }

      /* ===== RTL support ===== */
      [dir="rtl"] .st-demo__panel-content {
        text-align: right;
      }

      [dir="rtl"] .st-demo__viewer-img {
        transform: translateX(-300px) scale(0.5);
      }

      [dir="rtl"] .st-demo__viewer-img.is-active {
        transform: translateX(0) scale(1);
        animation-name: stDemoViewerEnterRtl;
      }

      @keyframes stDemoViewerEnterRtl {
        from {
          transform: translateX(-300px) scale(0.5);
          opacity: 0;
        }
        to {
          transform: translateX(0) scale(1);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  private selectViewerImage(index: number) {
    this.currentViewerIndex = index;
    this.requestUpdate();
  }

  render() {
    if (!this.config) {
      return html`<div>Configuration is required</div>`;
    }

    const viewerImages = this.config.viewer_images || [];

    return html`
      <div id="st-demo" class="st-demo">
        <div class="st-demo__container">
          <!-- Row 1: viewer + panel 1 content -->
          <div class="st-demo__panel">
            <div class="st-demo__viewer" data-animate="fade-up">
              ${this.config.viewer_bg_text ? html`
                <span class="st-demo__viewer-bg-text">${this.config.viewer_bg_text}</span>
              ` : ''}

              <div class="st-demo__viewer-stage">
                ${viewerImages.map((item, i) => html`
                  <img
                    src="${item.image}"
                    class="st-demo__viewer-img ${i === this.currentViewerIndex ? 'is-active' : ''}"
                    alt="${item.label}"
                    loading="lazy"
                  >
                `)}
                ${!viewerImages.length && this.config.panel1_image ? html`
                  <img
                    src="${this.config.panel1_image}"
                    class="st-demo__viewer-img is-active"
                    alt="${this.config.panel1_title || ''}"
                    loading="lazy"
                  >
                ` : ''}
              </div>

              ${viewerImages.length > 1 ? html`
                <div class="st-demo__viewer-controls">
                  ${viewerImages.map((item, i) => html`
                    <button
                      type="button"
                      class="st-demo__viewer-btn ${i === this.currentViewerIndex ? 'is-active' : ''}"
                      title="${item.label}"
                      @click="${() => this.selectViewerImage(i)}"
                    >
                      <img src="${item.image}" class="st-demo__viewer-thumb" alt="${item.label}" loading="lazy">
                      <span>${item.label}</span>
                    </button>
                  `)}
                </div>
              ` : ''}
            </div>

            <div class="st-demo__panel-content">
              ${this.config.panel1_title ? html`
                <h3 class="st-demo__panel-title" data-animate="fade-up" data-delay="0">
                  ${this.config.panel1_title}
                </h3>
              ` : ''}
              ${this.config.panel1_body1 ? html`
                <p class="st-demo__panel-body" data-animate="fade-up" data-delay="150">
                  ${this.config.panel1_body1}
                </p>
              ` : ''}
              ${this.config.panel1_body2 ? html`
                <p class="st-demo__panel-body" data-animate="fade-up" data-delay="300">
                  ${this.config.panel1_body2}
                </p>
              ` : ''}
            </div>
          </div>

          <!-- Row 2: panel 2 content + image -->
          <div class="st-demo__panel">
            <div class="st-demo__panel-content">
              ${this.config.panel2_title ? html`
                <h3 class="st-demo__panel-title" data-animate="fade-up" data-delay="0">
                  ${this.config.panel2_title}
                </h3>
              ` : ''}
              ${this.config.panel2_body1 ? html`
                <p class="st-demo__panel-body" data-animate="fade-up" data-delay="150">
                  ${this.config.panel2_body1}
                </p>
              ` : ''}
              ${this.config.panel2_body2 ? html`
                <p class="st-demo__panel-body" data-animate="fade-up" data-delay="300">
                  ${this.config.panel2_body2}
                </p>
              ` : ''}
              ${this.config.panel2_button_label ? html`
                <div class="st-demo__btn-wrap" data-animate="fade-up" data-delay="300">
                  <a
                    class="st-demo__btn"
                    href="${this.config.panel2_button_link || '#'}"
                  >
                    <span class="st-demo__btn-text-a">${this.config.panel2_button_label}</span>
                    <span class="st-demo__btn-text-b">${this.config.panel2_button_label}</span>
                  </a>
                </div>
              ` : ''}
            </div>

            ${this.config.panel2_image ? html`
              <div data-animate="zoom-in" data-delay="200">
                <img
                  src="${this.config.panel2_image}"
                  class="st-demo__panel-image"
                  alt="${this.config.panel2_title || ''}"
                  loading="lazy"
                >
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }
}
