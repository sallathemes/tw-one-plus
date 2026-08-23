// Shared "buy now" CTA — a self-registering <buy-now-button> custom element.
// Ported from tw-start-bundle's buy-now-button.ts, adapted for this bundle:
// components here render from static page-builder config (no live Salla
// product/checkout context), so callers pass in a BuyNowProduct (real field
// values or mock-product.ts) instead of a live `product`.
//
// Renders in light DOM (createRenderRoot returns `this`) so Salla/theme
// styles apply directly to the rendered <a> — callers style it by passing a
// btn-class that targets that element, same as any other class on the page.
import { html, LitElement, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import type { BuyNowProduct } from './mock-product';

export const DEFAULT_OUT_OF_STOCK_LABEL = 'نفذت الكمية';

export function formatMoney(value: number, currency = 'ر.س'): string {
  return `${value.toLocaleString('ar-SA')} ${currency}`;
}

export function productHasDiscount(product: BuyNowProduct): boolean {
  return Boolean(
    product.isOnSale && product.regularPrice && product.regularPrice > product.price
  );
}

// Returns the button's inner label content only (text/price/strike-through).
export function renderBuyNowLabel(
  product: BuyNowProduct,
  label: string,
  outOfStockLabel: string = DEFAULT_OUT_OF_STOCK_LABEL
): TemplateResult {
  if (product.isOutOfStock) {
    return html`<span class="st-buy-btn__label">${outOfStockLabel}</span>`;
  }

  const hasDiscount = productHasDiscount(product);

  return html`
    <span class="st-buy-btn__label">
      ${label}
      ${product.price > 0
        ? html` <span class="st-buy-btn__price">${formatMoney(product.price, product.currency)}</span>`
        : ''}
    </span>
    ${hasDiscount
      ? html`<span class="st-buy-btn__original">${formatMoney(product.regularPrice!, product.currency)}</span>`
      : ''}
  `;
}

export const buyNowButtonStyles = `
  buy-now-button {
    display: contents;
  }

  .st-buy-btn__original {
    text-decoration: line-through;
    opacity: 0.6;
    font-weight: 400;
    font-size: 0.8em;
    margin-inline-start: 0.4em;
  }

  .st-buy-btn.is-out-of-stock {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Hover text-swap chrome (hover-swap attribute) — callers add the
     :hover trigger rules that animate --a out / --b in. */
  .st-buy-btn__swap {
    display: inline-flex;
    transition: transform 0.22s ease, opacity 0.22s ease;
    white-space: nowrap;
  }

  .st-buy-btn__swap--b {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(150%);
    opacity: 0;
  }
`;

let stylesInjected = false;
function injectBuyNowButtonStyles() {
  if (stylesInjected) return;
  stylesInjected = true;
  const styleEl = document.createElement('style');
  styleEl.textContent = buyNowButtonStyles;
  document.head.appendChild(styleEl);
}

export default class BuyNowButton extends LitElement {
  @property({ type: Object }) product?: BuyNowProduct;
  @property({ type: String }) label = '';
  @property({ type: String }) link = '#';
  @property({ type: String, attribute: 'btn-class' }) btnClass = '';
  @property({ type: String }) icon = '';
  @property({ type: Boolean, attribute: 'hover-swap' }) hoverSwap = false;
  @property({ type: String, attribute: 'inline-style' }) inlineStyle = '';

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    injectBuyNowButtonStyles();
  }

  // Same behavior as tw-start-bundle's buy-now-button: rather than navigate
  // via `link`, jump straight to the store's fast-checkout block — scroll it
  // into view on desktop, or open it as a side drawer on mobile/when it's
  // configured for that layout (or isn't on the page at all).
  private handleClick(e: Event) {
    if (this.product?.isOutOfStock) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const isMobile = window.innerWidth < 1024;
    const checkoutElement = document.querySelector('.s-block--fast-checkout');
    const layout = checkoutElement?.getAttribute('data-layout');
    if (isMobile || layout === 'side-drawer' || !checkoutElement) {
      window.dispatchEvent(new CustomEvent('open-checkout-drawer'));
      return;
    }
    checkoutElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  render() {
    const product = this.product;
    const isOut = Boolean(product?.isOutOfStock);
    const content = product
      ? renderBuyNowLabel(product, this.label)
      : html`<span class="st-buy-btn__label">${this.label}</span>`;

    return html`
      <a
        class="st-buy-btn ${this.btnClass} ${isOut ? 'is-out-of-stock' : ''}"
        style=${this.inlineStyle}
        href=${this.link || '#'}
        aria-disabled=${isOut ? 'true' : 'false'}
        @click=${(e: Event) => this.handleClick(e)}
      >
        ${this.hoverSwap
          ? html`
              <span class="st-buy-btn__swap st-buy-btn__swap--a">${content}</span>
              <span class="st-buy-btn__swap st-buy-btn__swap--b">${content}</span>
            `
          : content}
        ${this.icon ? html`<i class="${this.icon}"></i>` : ''}
      </a>
    `;
  }
}

if (!customElements.get('buy-now-button')) {
  customElements.define('buy-now-button', BuyNowButton);
}
