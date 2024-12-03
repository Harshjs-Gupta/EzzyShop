"use client";

import { useEffect, useState } from "react";
import CartDetail from "./cartDetail";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/lib/firebase";
import { useLoading } from "@/app/loadingContext";
import { Product } from "@/types/productTypes";
// Define Product type

// interface CartDetailProps {
//   products: Product;
// }

function CartPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { setLoading } = useLoading(); // Ensure the `useLoading` hook is correctly implemented.

  useEffect(() => {
    async function fetchCartProducts() {
      try {
        setLoading(true); // Indicate loading state
        const cartCollection = collection(database, "cart");
        const cartSnapshot = await getDocs(cartCollection);

        const products = cartSnapshot.docs.map((doc) => {
          const data = doc.data(); // Ensure `data` matches the Firebase schema.
          return {
            asin: data.asin || "", // Required field
            title: data.title || "Unknown Product",
            thumbnail: data.thumbnail || "",
            reviews: {
              rating: data.reviews?.rating || 0, // Provide a default rating
            },
            price: {
              before_price: data.price?.before_price || 0,
              current_price: data.price?.current_price || 0,
              savings_amount: data.price?.savings_amount || 0,
              savings_percent: data.price?.savings_percent || 0,
            },
            badges: data.badges || [], // Default to empty array
            feature_bullets: data.feature_bullets || [], // Default to empty array
            images: data.images || [], // Default to empty array
            description: data.description || "", // Default to empty string
          } as Product;
        });

        setCartItems(products);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false); // End loading state
      }
    }

    fetchCartProducts();
  }, [setLoading]);

  return (
    <div className="relative top-48 flex h-screen w-screen flex-col gap-5 overflow-scroll bg-[#FEE5E9] pb-96 sm:relative sm:top-0 sm:pb-20">
      <div className="p-3">
        <span className="text-xl font-semibold">Cart Details</span>
      </div>
      <div className="flex h-screen w-screen flex-col items-center gap-5 bg-[#FEE5E9]">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartDetail products={item} key={item.asin} />
          ))
        ) : (
          <span>Your cart is empty.</span>
        )}
      </div>
    </div>
  );
}

export default CartPage;
