"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/lib/firebase";
import { useLoading } from "@/app/loadingContext";
import OrderDetail from "./orderDetail";

type OrderProduct = {
  amount: number;
  currency: string;
  order_id: string;
  payment_id: string;
  products: {
    before_price: number;
    price: number;
    quantity: number;
    quantityBeforePrice: number;
    quantityPrice: number;
    quantitySavingPrice: number;
    savings_amount: number;
    savings_percent: number;
    thumbnail: string;
    title: string;
  };
  status: string;
  user: {
    email: string;
    name: string;
  };
};

function OrderPage() {
  const [orderItems, setOrderItems] = useState<OrderProduct[]>([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    async function fetchCartProducts() {
      try {
        setLoading(true); // Indicate loading state
        const cartCollection = collection(database, "orders");
        const cartSnapshot = await getDocs(cartCollection);

        const products = cartSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            amount: data.amount || 0,
            currency: data.currency || "INR",
            order_id: data.order_id || "",
            payment_id: data.payment_id || "",
            products: {
              before_price: data.products?.before_price || 0,
              price: data.products?.price || 0,
              quantity: data.products?.quantity || 0,
              quantityBeforePrice: data.products?.quantityBeforePrice || 0,
              quantityPrice: data.products?.quantityPrice || 0,
              quantitySavingPrice: data.products?.quantitySavingPrice || 0,
              savings_amount: data.products?.savings_amount || 0,
              savings_percent: data.products?.savings_percent || 0,
              thumbnail: data.products?.thumbnail || "",
              title: data.products?.title || "",
            },
            status: data.status || "Pending",
            user: {
              email: data.user?.email || "",
              name: data.user?.name || "",
            },
          } as OrderProduct;
        });

        setOrderItems(products);
      } catch (error) {
        console.error("Error fetching Order data:", error);
      } finally {
        setLoading(false); // End loading state
      }
    }

    fetchCartProducts();
  }, [setLoading]);

  //   console.log(orderItems);

  return (
    <div className="relative top-48 flex h-screen w-screen flex-col gap-5 overflow-scroll bg-[#FEE5E9] pb-40 sm:relative sm:top-0 sm:pb-52">
      <div className="p-3">
        <span className="text-xl font-semibold">Order Details</span>
      </div>
      <div className="flex h-screen w-screen flex-col items-center gap-5 bg-[#FEE5E9]">
        {orderItems.map((item) => (
          <OrderDetail order={item} key={item.order_id} />
        ))}
      </div>
    </div>
  );
}

export default OrderPage;
