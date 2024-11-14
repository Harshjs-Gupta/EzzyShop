// "use client";
// // import { useEffect, useState } from "react";
// // import { useLoading } from "@/app/loadingContext";
// // import { toast } from "react-toastify";
// // import { database } from "@/lib/firebase";
// // import { collection, getDocs } from "firebase/firestore";
// import CartProducts from "./cartProducts";

// interface PriceDetails {
//   before_price: number;
//   current_price: number;
//   savings_amount: number;
// }

// interface Product {
//   asin: string;
//   title: string;
//   thumbnail: string;
//   reviews: {
//     rating: number;
//   };
//   price: PriceDetails;
//   length: number;
// }

// interface ProductsResponse {
//   result: Product[];
// }

// function CartPage() {
//   // useEffect(() => {
//   //   const storedProducts = localStorage.getItem("productDetails");
//   //   if (storedProducts) {
//   //     setCartItems(JSON.parse(storedProducts));
//   //   }
//   // }, []);

//   // const items = cartItems.result || [];

//   return (
//     <div className="h-screen w-screen bg-[#FEE5E9] p-2">
//       <div className="p-3">
//         <span className="text-xl font-semibold">Shopping Cart</span>
//       </div>
//       <div className="flex h-screen w-screen flex-col items-center bg-[#FEE5E9]">
//         <div className="flex h-[75%] w-[95%] flex-col items-center gap-24 overflow-scroll overflow-x-hidden bg-white p-4">
//           {items.map((item) => (
//             <CartProducts products={item} key={item.asin} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default CartPage;
