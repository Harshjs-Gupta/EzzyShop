"use client";

import { useEffect, useState } from "react";
import ProductDetails from "./productDetails";

interface PriceDetails {
  before_price: number;
  current_price: number;
  savings_amount: number;
  symbol: string;
  savings_percent: number;
}

interface PrimeDetail {
  amazon_prime: boolean;
  amazon_choice: boolean;
}

interface Product {
  asin: string;
  title: string;
  main_image: string;
  reviews: {
    rating: number;
    feature_bullets: [];
  };
  thumbnail: string;
  price: PriceDetails;
  badges: PrimeDetail;
  feature_bullets: [];
  images: [];
  description: string;
}

interface ProductDetailsResponse {
  result: Product[];
}

function DetailPage() {
  // Specify the type for productDetails
  const [productDetails, setProductDetails] =
    useState<ProductDetailsResponse | null>(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem("productDetails");
    if (storedProducts) {
      setProductDetails(JSON.parse(storedProducts));
    }
  }, []);

  // Check if productDetails is null before trying to access result
  const items = productDetails?.result || [];

  return (
    <div className="h-screen w-screen overflow-hidden overflow-y-scroll bg-[#FEE5E9] p-2">
      <div className="p-3">
        <span className="text-xl font-semibold">Product Detail</span>
      </div>
      <div className="relative top-48 flex h-screen w-screen flex-col items-center bg-[#FEE5E9] sm:relative sm:top-0">
        {items.map((item: Product) => (
          <ProductDetails products={item} key={item.asin} />
        ))}
      </div>
    </div>
  );
}
export default DetailPage;
