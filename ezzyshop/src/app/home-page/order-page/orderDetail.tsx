import Image from "next/image";
import { TransformComponent } from "react-zoom-pan-pinch";
import React from "react";
import { TransformWrapper } from "react-zoom-pan-pinch";

export type OrderProduct = {
  order: {
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
};

const OrderDetail: React.FC<OrderProduct> = ({ order }) => {
  const { products, status } = order;
  const {
    thumbnail,
    title,
    before_price,
    price,
    quantity,
    quantityBeforePrice,
    quantitySavingPrice,
    savings_amount,
    savings_percent,
  } = products;

  return (
    <div className="mb-5 flex h-auto w-full items-center gap-2 p-2">
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
          <span className="font-semibold">{title}</span>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">
              {quantity === 1 && ` Rs ${price}`}
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
        </div>
        <div>{`✅ Order ${status}`}</div>
      </div>
    </div>
  );
};

export default OrderDetail;
