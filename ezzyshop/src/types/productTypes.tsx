// types/ProductTypes.ts
export interface PriceDetails {
  before_price: number;
  current_price: number;
  savings_amount: number;
  savings_percent: number;
}

export interface Product {
  asin: string;
  title: string;
  thumbnail: string;
  reviews: {
    rating: number;
  };
  price: PriceDetails;
  badges?: string[]; // Optional
  feature_bullets?: string[]; // Optional
  images?: string[]; // Optional
  description?: string; // Optional
  url: string;
}
