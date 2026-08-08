// Dummy product data — this bundle is a static page-builder config (no live Salla
// product/checkout context like a storefront theme has), so buy-now-button.ts is fed
// this shape instead of a real `product` object.
export interface BuyNowProduct {
  price: number;
  regularPrice?: number;
  currency?: string;
  isOnSale?: boolean;
  isOutOfStock?: boolean;
}

export const mockProduct: BuyNowProduct = {
  price: 1990,
  regularPrice: 2500,
  currency: 'ر.س',
  isOnSale: true,
  isOutOfStock: false,
};
