"use client";
import { useEffect, useState } from "react";
import SlugComponent from "./slugComponent";

interface PriceDetails {
  before_price: number;
  current_price: number;
  savings_amount: number;
}

interface Product {
  asin: string;
  title: string;
  thumbnail: string;
  reviews: {
    rating: number;
  };
  price: PriceDetails;
  length: number;
  main_image: string;
}

interface ProductsResponse {
  result: Product[];
}

function SlugProduct() {
  const [products, setProducts] = useState<ProductsResponse | null>(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Safely access `products.result` and default to an empty array if it's undefined
  const items = products?.result || [];

  return (
    <div className="flex flex-col gap-5 p-3">
      {items.map((item) => (
        <SlugComponent products={item} key={item.asin} />
      ))}
    </div>
  );
}

export default SlugProduct;
