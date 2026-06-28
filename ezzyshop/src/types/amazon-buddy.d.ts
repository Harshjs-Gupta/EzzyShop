/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
declare module "@webdeb/amazon-buddy" {
  interface Product {
    title: string;
    thumbnail: string;
    price: {
      current_price: number;
      before_price?: number;
    };
    asin: string;
  }

  interface ProductResponse {
    result: Product[];
  }

  function products(options: {
    keyword: string;
    number?: number;
    country?: string;
  }): Promise<ProductResponse>;

  const amazonBuddy: {
    products: typeof products;
  };

  export default amazonBuddy;
}