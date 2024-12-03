"use client";
import Image from "next/image";
import info from "@/assets/icon/info.png";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useState } from "react";
import deleteIcon from "@/assets/icon/deleteIcon.png";
import { auth, database } from "@/lib/firebase";
import { toast } from "react-toastify";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { Product } from "@/types/productTypes";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: {
      new (options: {
        key: string;
        amount: number;
        currency: string;
        order_id: string;
        name?: string;
        prefill?: {
          name?: string;
          email?: string;
        };
        handler: (response: RazorpayResponse) => void; // Updated this line
      }): {
        open: () => void;
      };
    };
  }
}

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature?: string;
};

const CartDetail: React.FC<{ products: Product }> = ({ products }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { title, price, thumbnail } = products;
  const { before_price, current_price, savings_amount, savings_percent } =
    price;
  const quantityPrice = current_price * quantity;
  const quantityBeforePrice = before_price * quantity;
  const quantitySavingPrice = savings_amount * quantity;

  function handleAddQuantity() {
    setQuantity((q) => q + 1);
  }

  function handleMinusQuantity() {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  }

  function deleteProduct(asin: string) {
    const productRef = doc(database, "cart", asin); // Correct syntax for modular SDK

    deleteDoc(productRef)
      .then(() => {
        toast.success("Product deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  }
  // console.log(quantityPrice);

  async function createOrder() {
    const user = auth.currentUser;
    const email = user?.email;
    const name = user?.displayName;

    // Include all product details
    const productDetails = {
      title: title,
      price: current_price,
      quantity: quantity,
      thumbnail: thumbnail,
      before_price: before_price,
      savings_amount: savings_amount,
      savings_percent: savings_percent,
      quantityPrice: quantityPrice,
      quantityBeforePrice: quantityBeforePrice,
      quantitySavingPrice: quantitySavingPrice,
    };

    // Send the product details along with the amount to your API
    const response = await fetch("/api/createOrder", {
      method: "POST",
      body: JSON.stringify({
        amount: quantityPrice,
        products: productDetails, // Add product details to the request
      }),
    });

    const data = await response.json();
    console.log(data);

    const paymentData = {
      key: "rzp_test_yfTOicMGQedbRI", // Ensure key is a string
      amount: Number(data.amount), // Ensure amount is a number
      currency: "INR",
      order_id: data.id || "", // Ensure order_id is a string
      name: name || undefined, // Make optional
      prefill: {
        name: name || undefined, // Make optional
        email: email || undefined, // Make optional
      },
      notes: {
        title: productDetails.title,
        price: productDetails.price,
        quantity: productDetails.quantity,
        before_price: productDetails.before_price,
        savings_amount: productDetails.savings_amount,
        savings_percent: productDetails.savings_percent,
        thumbnail: productDetails.thumbnail,
        quantityPrice: productDetails.quantityPrice,
        quantityBeforePrice: productDetails.quantityBeforePrice,
        quantitySavingPrice: productDetails.quantitySavingPrice,
      },
      handler: async function (response: RazorpayResponse) {
        console.log(response);

        if (response.razorpay_payment_id) {
          try {
            // Create an order object
            const orderData = {
              user: {
                name: name,
                email: email,
              },
              products: productDetails,
              payment: {
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                amount: Number(data.amount),
                currency: "INR",
              },
              status: "Completed", // Add status
              createdAt: new Date(),
            };

            // Save the order data in Firestore
            const orderRef = doc(
              database,
              "orders",
              response.razorpay_order_id,
            );
            await setDoc(orderRef, orderData);

            console.log("Order created in Firestore:", orderData);
          } catch (error) {
            console.error("Error creating order in Firestore:", error);
          }
        }
      },
    };

    const payment = new window.Razorpay(paymentData);
    payment.open();
  }

  return (
    <div className="mb-5 flex h-auto w-full flex-col items-center gap-2 p-2 sm:flex-row">
      <div className="flex h-full w-60 items-center justify-center rounded-xl bg-white object-cover p-2">
        <TransformWrapper>
          <TransformComponent>
            <Image
              src={thumbnail}
              alt={`${title} image`}
              className="productImage rounded-sm"
              width={150}
              height={100}
              priority
            />
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div className="flex w-96 flex-col gap-3 p-3 sm:w-full">
        <div className="flex flex-col gap-3 text-left">
          <div className="flex gap-2">
            <span className="text-sm">Sponsored</span>
            <Image src={info} alt="info" className="h-5 w-5" />
          </div>
          <span className="text-[12px] font-semibold sm:text-xl">{title}</span>
          <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2">
            <span className="text-[12px] font-bold sm:text-3xl">
              {quantity === 1 ? ` Rs ${current_price}` : `Rs ${quantityPrice}`}
            </span>
            <div className="flex gap-2">
              {before_price !== 0 && (
                <div className="flex items-center justify-center gap-1">
                  <span className="text-[12px] line-through sm:text-xl">
                    {quantity === 1
                      ? `M.R.P: Rs ${Math.trunc(before_price)}`
                      : `M.R.P Rs ${Math.trunc(quantityBeforePrice)}`}
                  </span>
                </div>
              )}
              <span className="text-[12px] font-semibold sm:text-xl">
                {savings_percent !== 0 &&
                  `(${Math.trunc(savings_percent)}% off)`}
              </span>
            </div>
          </div>
          {savings_amount !== 0 && (
            <span>
              {quantity === 1
                ? `Save Rs ${savings_amount}`
                : `Save Rs ${quantitySavingPrice}`}
            </span>
          )}
          <div className="z-2 flex items-center gap-5 sm:gap-72">
            <Script
              type="text/javascript"
              src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <button
              className="h-8 w-24 rounded-full bg-yellow-400 text-sm font-semibold active:bg-yellow-500"
              onClick={createOrder}
            >
              Buy Now
            </button>
            <div className="flex">
              <button
                className="w-5 rounded-l-lg bg-gray-300"
                onClick={handleMinusQuantity}
              >
                -
              </button>
              <span className="w-20 bg-white text-center">{quantity}</span>
              <button
                className="w-5 rounded-r-lg bg-gray-300"
                onClick={handleAddQuantity}
              >
                +
              </button>
            </div>
            <button
              className="flex h-8 w-24 cursor-pointer items-center justify-center rounded-full bg-red-400"
              onClick={() => deleteProduct(products.asin)}
            >
              <Image
                src={deleteIcon}
                alt="deleteIcon"
                className="h-5 w-5 cursor-pointer"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartDetail;
