import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import AOS from '../../utils/animate-on-scroll';

type NavItem = { label: string; href: string };

export default class StFooter extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    bottom_bg_color: string;
    text_color: string;
    brand_color: string;
    // Newsletter
    newsletter_title: string;
    newsletter_placeholder: string;
    newsletter_button_label: string;
    // Store info
    store_title: string;
    store_description: string;
    // Nav columns (2 columns)
    nav1_header: string;
    nav1_items: NavItem[];
    nav2_header: string;
    nav2_items: NavItem[];
    // Trust badges
    meta1_image: string;
    meta1_title: string;
    meta1_subtitle: string;
    meta1_link: string;
    meta2_image: string;
    meta2_title: string;
    meta2_subtitle: string;
    meta2_link: string;
    // Bottom bar
    copyright: string;
    social1_icon: string;
    social1_link: string;
    social2_icon: string;
    social2_link: string;
    social3_icon: string;
    social3_link: string;
  };

  @state() private submitted = false;

  createRenderRoot() { return this; }

  private styleElement: HTMLStyleElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
    AOS.init();
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    AOS.refresh();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.styleElement?.remove();
  }

  injectStyles() {
    if (this.styleElement) return;
    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      st-footer { display: block; }

      .st-footer { display: block; width: 100%; }

      /* ── Newsletter ─────────────────────────────── */
      .st-footer__newsletter {
        padding: 3.5rem 1.5rem;
        text-align: center;
        border-bottom: 1px solid rgba(255,255,255,0.08);
      }

      .st-footer__newsletter-inner {
        max-width: 560px;
        margin: 0 auto;
      }

      .st-footer__newsletter-title {
        font-size: clamp(1.25rem, 2.5vw, 1.75rem);
        font-weight: 700;
        margin: 0 0 1.25rem;
        line-height: 1.4;
      }

      .st-footer__newsletter-form {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: #ffffff;
        border-radius: 0.875rem;
        padding: 0.375rem 0.375rem 0.375rem 1rem;
      }

      [dir="rtl"] .st-footer__newsletter-form {
        padding: 0.375rem 1rem 0.375rem 0.375rem;
      }

      .st-footer__newsletter-input {
        flex: 1;
        min-width: 0;
        border: none;
        outline: none;
        background: transparent;
        font-size: 0.9rem;
        font-family: inherit;
        color: #111;
        padding: 0.5rem 0;
      }

      .st-footer__newsletter-input::placeholder { color: #999; }

      .st-footer__newsletter-btn {
        flex-shrink: 0;
        border: none;
        cursor: pointer;
        border-radius: 0.625rem;
        padding: 0.625rem 1.25rem;
        font-size: 0.875rem;
        font-weight: 700;
        font-family: inherit;
        color: #fff;
        white-space: nowrap;
        transition: opacity 0.2s;
      }

      .st-footer__newsletter-btn:hover { opacity: 0.85; }

      .st-footer__newsletter-success {
        font-size: 0.9rem;
        font-weight: 700;
        padding: 1rem 0;
      }

      /* ── Main body ──────────────────────────────── */
      .st-footer__main {
        padding: 3rem 1.5rem;
      }

      .st-footer__container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
      }

      @media (min-width: 768px) {
        .st-footer__container {
          flex-direction: row;
          align-items: flex-start;
          gap: 4rem;
        }
      }

      /* Brand block */
      .st-footer__brand {
        flex: 0 0 auto;
        max-width: 320px;
      }

      @media (min-width: 768px) { .st-footer__brand { flex: 0 0 35%; } }

      .st-footer__brand-title {
        font-size: 1.125rem;
        font-weight: 700;
        margin: 0 0 0.875rem;
        line-height: 1.4;
      }

      .st-footer__brand-desc {
        font-size: 0.9rem;
        line-height: 1.8;
        margin: 0;
        opacity: 0.75;
      }

      /* Nav columns */
      .st-footer__nav {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem 1.5rem;
      }

      .st-footer__nav-header {
        font-size: 0.9375rem;
        font-weight: 700;
        margin: 0 0 1rem;
      }

      .st-footer__nav-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .st-footer__nav-link {
        font-size: 0.875rem;
        font-weight: 400;
        text-decoration: none;
        opacity: 0.75;
        transition: opacity 0.2s;
        display: block;
        word-break: break-word;
      }

      .st-footer__nav-link:hover { opacity: 1; }

      /* ── Trust badges ───────────────────────────── */
      .st-footer__meta {
        padding: 0 1.5rem 2.5rem;
        border-top: 1px solid rgba(255,255,255,0.08);
      }

      .st-footer__meta-inner {
        max-width: 1200px;
        margin: 0 auto;
        padding-top: 2rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem 3rem;
      }

      .st-footer__meta-badge {
        display: flex;
        align-items: center;
        gap: 0.875rem;
        text-decoration: none;
        cursor: pointer;
      }

      .st-footer__meta-img {
        height: 40px;
        width: auto;
        object-fit: contain;
      }

      .st-footer__meta-text { display: flex; flex-direction: column; gap: 0.25rem; }

      .st-footer__meta-sub {
        font-size: 0.6875rem;
        opacity: 0.7;
        margin: 0;
      }

      .st-footer__meta-title {
        font-size: 0.9375rem;
        font-weight: 700;
        margin: 0;
      }

      /* ── Bottom bar ─────────────────────────────── */
      .st-footer__bottom {
        padding: 1rem 1.5rem;
      }

      .st-footer__bottom-inner {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 0.875rem;
      }

      @media (min-width: 768px) {
        .st-footer__bottom-inner { flex-direction: row; }
      }

      .st-footer__copyright {
        font-size: 0.875rem;
        opacity: 0.65;
        margin: 0;
        text-align: center;
      }

      @media (min-width: 768px) {
        .st-footer__copyright { text-align: start; }
        [dir="rtl"] .st-footer__copyright { text-align: end; }
      }

      .st-footer__social {
        display: flex;
        align-items: center;
        gap: 0.625rem;
      }

      .st-footer__social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.25rem;
        height: 2.25rem;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 9999px;
        text-decoration: none;
        transition: border-color 0.2s, transform 0.2s;
        font-size: 1rem;
      }

      .st-footer__social-link:hover {
        border-color: currentColor;
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    const input = (e.currentTarget as HTMLFormElement).querySelector('input') as HTMLInputElement;
    if (input?.value.trim()) this.submitted = true;
  }

  private renderNavCol(header: string, items: NavItem[] | undefined, textColor: string, delay: number) {
    if (!header && !items?.length) return html``;
    return html`
      <div>
        ${header ? html`
          <h5 class="st-footer__nav-header"
              style="color:${textColor};"
              data-animate="fade-up" data-delay="${delay}">${header}</h5>
        ` : ''}
        <ul class="st-footer__nav-list">
          ${(items || []).map((item, i) => html`
            <li data-animate="fade-up" data-delay="${delay + (i + 1) * 60}">
              <a class="st-footer__nav-link"
                 href="${item.href || '#'}"
                 style="color:${textColor};">${item.label}</a>
            </li>
          `)}
        </ul>
      </div>
    `;
  }

  private renderMetaBadge(img: string, title: string, sub: string, link: string, textColor: string) {
    if (!img && !title) return html``;
    return html`
      <a class="st-footer__meta-badge"
         href="${link || '#'}"
         target="${link && link !== '#' ? '_blank' : '_self'}"
         rel="noopener noreferrer">
        ${img ? html`<img class="st-footer__meta-img" src="${img}" alt="${title}" loading="lazy" />` : ''}
        ${title || sub ? html`
          <span class="st-footer__meta-text" style="color:${textColor};">
            ${sub ? html`<span class="st-footer__meta-sub">${sub}</span>` : ''}
            ${title ? html`<span class="st-footer__meta-title">${title}</span>` : ''}
          </span>
        ` : ''}
      </a>
    `;
  }

  render() {
    if (!this.config) return html``;

    const bg      = this.config.bg_color       || '#050505';
    const bottomBg = this.config.bottom_bg_color || '#ffffff';
    const text    = this.config.text_color     || '#ffffff';
    const brand   = this.config.brand_color    || '#0071E3';

    const copyright = (this.config.copyright || '')
      .replace('{{year}}', new Date().getFullYear().toString());

    const socials = [
      { icon: this.config.social1_icon, link: this.config.social1_link },
      { icon: this.config.social2_icon, link: this.config.social2_link },
      { icon: this.config.social3_icon, link: this.config.social3_link },
    ].filter(s => s.icon);

    return html`
      <footer id="st-footer" class="st-footer" style="background:${bg}; color:${text};">

        <!-- Newsletter -->
        ${this.config.newsletter_title ? html`
          <div class="st-footer__newsletter">
            <div class="st-footer__newsletter-inner">
              <h3 class="st-footer__newsletter-title" data-animate="fade-up">${this.config.newsletter_title}</h3>
              ${this.submitted
                ? html`<p class="st-footer__newsletter-success" style="color:${brand};">تم الاشتراك ✓</p>`
                : html`
                  <form class="st-footer__newsletter-form" @submit=${this.handleSubmit} data-animate="fade-up" data-delay="150">
                    <input
                      class="st-footer__newsletter-input"
                      type="email" name="email" required
                      placeholder="${this.config.newsletter_placeholder || 'بريدك الإلكتروني...'}"
                    />
                    <button class="st-footer__newsletter-btn" type="submit" style="background:${brand};">
                      ${this.config.newsletter_button_label || 'اشترك'}
                    </button>
                  </form>
                `}
            </div>
          </div>
        ` : ''}

        <!-- Main: brand + nav -->
        <div class="st-footer__main">
          <div class="st-footer__container">
            <!-- Brand -->
            <div class="st-footer__brand" data-animate="fade-up">
              ${this.config.store_title
                ? html`<h3 class="st-footer__brand-title" style="color:${text};">${this.config.store_title}</h3>`
                : ''}
              ${this.config.store_description
                ? html`<p class="st-footer__brand-desc" style="color:${text};">${this.config.store_description}</p>`
                : ''}
            </div>

            <!-- Nav columns -->
            <nav class="st-footer__nav">
              ${this.renderNavCol(this.config.nav1_header, this.config.nav1_items, text, 0)}
              ${this.renderNavCol(this.config.nav2_header, this.config.nav2_items, text, 100)}
            </nav>
          </div>
        </div>

        <!-- Trust badges -->
        ${(this.config.meta1_image || this.config.meta1_title || this.config.meta2_image || this.config.meta2_title) ? html`
          <div class="st-footer__meta">
            <div class="st-footer__meta-inner">
              ${this.renderMetaBadge(this.config.meta1_image, this.config.meta1_title, this.config.meta1_subtitle, this.config.meta1_link, text)}
              ${this.renderMetaBadge(this.config.meta2_image, this.config.meta2_title, this.config.meta2_subtitle, this.config.meta2_link, text)}
            </div>
          </div>
        ` : ''}

        <!-- Bottom bar -->
        <div class="st-footer__bottom" style="background:${bottomBg};">
          <div class="st-footer__bottom-inner">
            <p class="st-footer__copyright" style="color:#555;">${copyright}</p>
            <div class="st-footer__social">
              ${socials.map(s => html`
                <a class="st-footer__social-link"
                   href="${s.link || '#'}"
                   target="_blank" rel="noopener noreferrer"
                   style="color:#555; border-color:rgba(0,0,0,0.15);">
                  <i class="${s.icon}"></i>
                </a>
              `)}
            </div>
          </div>
        </div>

      </footer>
    `;
  }
}
