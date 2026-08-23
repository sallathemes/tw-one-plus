import { render } from 'lit';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  formatMoney,
  productHasDiscount,
  renderBuyNowLabel,
} from './buy-now-button';
import type { BuyNowProduct } from './mock-product';
import BuyNowButton from './buy-now-button';

const baseProduct: BuyNowProduct = {
  price: 1990,
  regularPrice: 2500,
  currency: 'ر.س',
  isOnSale: true,
  isOutOfStock: false,
};

describe('formatMoney', () => {
  it('formats a number with the Arabic-Saudi locale and default currency', () => {
    expect(formatMoney(1990)).toBe(`${(1990).toLocaleString('ar-SA')} ر.س`);
  });

  it('accepts a custom currency', () => {
    expect(formatMoney(10, '$')).toBe(`${(10).toLocaleString('ar-SA')} $`);
  });
});

describe('productHasDiscount', () => {
  it('is true when on sale with a higher regular price', () => {
    expect(productHasDiscount(baseProduct)).toBe(true);
  });

  it('is false when not on sale', () => {
    expect(productHasDiscount({ ...baseProduct, isOnSale: false })).toBe(false);
  });

  it('is false when regularPrice is not greater than price', () => {
    expect(productHasDiscount({ ...baseProduct, regularPrice: 1990 })).toBe(false);
  });

  it('is false when regularPrice is missing', () => {
    expect(productHasDiscount({ ...baseProduct, regularPrice: undefined })).toBe(false);
  });
});

describe('renderBuyNowLabel', () => {
  function renderToContainer(product: BuyNowProduct, label: string) {
    const container = document.createElement('div');
    render(renderBuyNowLabel(product, label), container);
    return container;
  }

  it('renders the out-of-stock label when the product is out of stock', () => {
    const container = renderToContainer({ ...baseProduct, isOutOfStock: true }, 'اشتري الآن');
    expect(container.textContent).toContain('نفذت الكمية');
    expect(container.textContent).not.toContain('اشتري الآن');
  });

  it('renders the label and price, plus the struck-through original price on discount', () => {
    const container = renderToContainer(baseProduct, 'اشتري الآن');
    expect(container.querySelector('.st-buy-btn__label')?.textContent).toContain('اشتري الآن');
    expect(container.querySelector('.st-buy-btn__price')?.textContent).toContain(
      formatMoney(baseProduct.price, baseProduct.currency)
    );
    expect(container.querySelector('.st-buy-btn__original')?.textContent).toContain(
      formatMoney(baseProduct.regularPrice!, baseProduct.currency)
    );
  });

  it('omits the original price when there is no discount', () => {
    const container = renderToContainer({ ...baseProduct, isOnSale: false }, 'اشتري الآن');
    expect(container.querySelector('.st-buy-btn__original')).toBeNull();
  });
});

describe('<buy-now-button>', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers as a custom element', () => {
    expect(customElements.get('buy-now-button')).toBe(BuyNowButton);
  });

  it('renders in light DOM (no shadow root) so caller styles apply directly', async () => {
    const el = document.createElement('buy-now-button') as BuyNowButton;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeNull();
    expect(el.querySelector('a')).not.toBeNull();
  });

  it('renders a link with the product price and configured href/classes', async () => {
    const el = document.createElement('buy-now-button') as BuyNowButton;
    el.product = baseProduct;
    el.label = 'اشتري الآن';
    el.link = '/checkout';
    el.btnClass = 'st-offers__btn';
    document.body.appendChild(el);
    await el.updateComplete;

    const anchor = el.querySelector('a')!;
    expect(anchor.getAttribute('href')).toBe('/checkout');
    expect(anchor.classList.contains('st-buy-btn')).toBe(true);
    expect(anchor.classList.contains('st-offers__btn')).toBe(true);
    expect(anchor.classList.contains('is-out-of-stock')).toBe(false);
    expect(anchor.getAttribute('aria-disabled')).toBe('false');
    expect(anchor.textContent).toContain(formatMoney(baseProduct.price, baseProduct.currency));
  });

  it('disables the link and blocks navigation when the product is out of stock', async () => {
    const el = document.createElement('buy-now-button') as BuyNowButton;
    el.product = { ...baseProduct, isOutOfStock: true };
    el.label = 'اشتري الآن';
    document.body.appendChild(el);
    await el.updateComplete;

    const anchor = el.querySelector('a')!;
    expect(anchor.classList.contains('is-out-of-stock')).toBe(true);
    expect(anchor.getAttribute('aria-disabled')).toBe('true');

    const clickEvent = new MouseEvent('click', { cancelable: true, bubbles: true });
    anchor.dispatchEvent(clickEvent);
    expect(clickEvent.defaultPrevented).toBe(true);
  });

  describe('click routes to the store checkout instead of navigating', () => {
    const originalInnerWidth = window.innerWidth;
    let scrollIntoView: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      scrollIntoView = vi.fn();
      Element.prototype.scrollIntoView = scrollIntoView;
    });

    afterEach(() => {
      document.querySelectorAll('.s-block--fast-checkout').forEach((n) => n.remove());
      Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, configurable: true });
    });

    async function clickButton() {
      const el = document.createElement('buy-now-button') as BuyNowButton;
      el.product = baseProduct;
      el.label = 'اشتري الآن';
      document.body.appendChild(el);
      await el.updateComplete;

      const anchor = el.querySelector('a')!;
      const clickEvent = new MouseEvent('click', { cancelable: true, bubbles: true });
      anchor.dispatchEvent(clickEvent);
      return clickEvent;
    }

    it('scrolls the fast-checkout block into view on desktop', async () => {
      Object.defineProperty(window, 'innerWidth', { value: 1280, configurable: true });
      const checkout = document.createElement('div');
      checkout.className = 's-block--fast-checkout';
      document.body.appendChild(checkout);
      const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

      const clickEvent = await clickButton();

      expect(clickEvent.defaultPrevented).toBe(true);
      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
      expect(dispatchSpy).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'open-checkout-drawer' }));
      dispatchSpy.mockRestore();
    });

    it('opens the checkout drawer on mobile even if the block is scrollable', async () => {
      Object.defineProperty(window, 'innerWidth', { value: 375, configurable: true });
      const checkout = document.createElement('div');
      checkout.className = 's-block--fast-checkout';
      document.body.appendChild(checkout);
      const openDrawer = vi.fn();
      window.addEventListener('open-checkout-drawer', openDrawer);

      await clickButton();

      expect(openDrawer).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).not.toHaveBeenCalled();
      window.removeEventListener('open-checkout-drawer', openDrawer);
    });

    it('opens the checkout drawer when the block is configured for side-drawer layout', async () => {
      Object.defineProperty(window, 'innerWidth', { value: 1280, configurable: true });
      const checkout = document.createElement('div');
      checkout.className = 's-block--fast-checkout';
      checkout.setAttribute('data-layout', 'side-drawer');
      document.body.appendChild(checkout);
      const openDrawer = vi.fn();
      window.addEventListener('open-checkout-drawer', openDrawer);

      await clickButton();

      expect(openDrawer).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).not.toHaveBeenCalled();
      window.removeEventListener('open-checkout-drawer', openDrawer);
    });

    it('opens the checkout drawer when no fast-checkout block exists on the page', async () => {
      Object.defineProperty(window, 'innerWidth', { value: 1280, configurable: true });
      const openDrawer = vi.fn();
      window.addEventListener('open-checkout-drawer', openDrawer);

      await clickButton();

      expect(openDrawer).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).not.toHaveBeenCalled();
      window.removeEventListener('open-checkout-drawer', openDrawer);
    });
  });

  it('renders duplicated hover-swap spans when hover-swap is set', async () => {
    const el = document.createElement('buy-now-button') as BuyNowButton;
    el.product = baseProduct;
    el.label = 'اشتري الآن';
    el.hoverSwap = true;
    document.body.appendChild(el);
    await el.updateComplete;

    const swaps = el.querySelectorAll('.st-buy-btn__swap');
    expect(swaps.length).toBe(2);
    expect(el.querySelector('.st-buy-btn__swap--a')).not.toBeNull();
    expect(el.querySelector('.st-buy-btn__swap--b')).not.toBeNull();
  });

  it('renders an icon element when an icon class is provided', async () => {
    const el = document.createElement('buy-now-button') as BuyNowButton;
    el.product = baseProduct;
    el.icon = 'sicon-caret-left-double';
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.querySelector('i.sicon-caret-left-double')).not.toBeNull();
  });

  it('injects its base styles into <head> exactly once, even with multiple instances', async () => {
    const first = document.createElement('buy-now-button') as BuyNowButton;
    const second = document.createElement('buy-now-button') as BuyNowButton;
    document.body.appendChild(first);
    document.body.appendChild(second);
    await first.updateComplete;
    await second.updateComplete;

    const injected = Array.from(document.head.querySelectorAll('style')).filter((s) =>
      s.textContent?.includes('.st-buy-btn__original')
    );
    expect(injected.length).toBe(1);
  });
});
