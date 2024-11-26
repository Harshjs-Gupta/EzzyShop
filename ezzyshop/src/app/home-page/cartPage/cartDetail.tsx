"use client";
import Image from "next/image";
import info from "@/assets/icon/info.png";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useState } from "react";
import deleteIcon from "@/assets/icon/deleteIcon.png";
import { database } from "@/lib/firebase";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { Product } from "@/types/productTypes";

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
  console.log(quantity);

  return (
    <div className="flex h-auto w-full items-center gap-2 p-2">
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
      <div className="flex flex-col gap-3 p-3">
        <div className="flex flex-col gap-3 text-left">
          <div className="flex gap-2">
            <span className="text-sm">Sponsored</span>
            <Image src={info} alt="info" className="h-5 w-5" />
          </div>
          <span className="font-semibold">{title}</span>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">
              {quantity === 1 ? ` Rs ${current_price}` : `Rs ${quantityPrice}`}
            </span>
            {before_price !== 0 && (
              <div className="flex items-center justify-center gap-1">
                <span className="line-through">
                  {quantity === 1
                    ? `M.R.P: Rs ${Math.trunc(before_price)}`
                    : `M.R.P Rs ${Math.trunc(quantityBeforePrice)}`}
                </span>
              </div>
            )}
            <span className="font-semibold">
              {savings_percent !== 0 && `(${Math.trunc(savings_percent)}% off)`}
            </span>
          </div>
          {savings_amount !== 0 && (
            <span>
              {quantity === 1
                ? `Save Rs ${savings_amount}`
                : `Save Rs ${quantitySavingPrice}`}
            </span>
          )}
          <div className="z-2 flex items-center gap-72">
            <button className="h-8 w-24 rounded-full bg-yellow-400 text-sm font-semibold">
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
            <div
              className="flex h-8 w-24 cursor-pointer items-center justify-center rounded-full bg-red-400"
              onClick={() => deleteProduct(products.asin)}
            >
              <Image
                src={deleteIcon}
                alt="deleteIcon"
                className="h-5 w-5 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartDetail;
