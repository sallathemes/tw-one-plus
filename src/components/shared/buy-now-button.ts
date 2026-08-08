// Shared "buy now" button content — mirrors the price/discount/out-of-stock logic
// from the theme's components/shared/buy-now-button.tsx, adapted for this bundle:
// components here render from static page-builder config, so callers pass in a
// BuyNowProduct (real field values or mock-product.ts) instead of a live `product`.
import { html, type TemplateResult } from 'lit';
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

// Returns the button's inner content only — the host component owns the outer
// <a>/<button> chrome (each CTA in this bundle already has its own styling).
export function renderBuyNowLabel(
  product: BuyNowProduct,
  label: string,
  outOfStockLabel: string = DEFAULT_OUT_OF_STOCK_LABEL
): TemplateResult {
  if (product.isOutOfStock) {
    return html`<span>${outOfStockLabel}</span>`;
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
`;
