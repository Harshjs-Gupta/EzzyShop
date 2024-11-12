import Image from "next/image";
import StartRating from "../StartRating/startRating";
import info from "@/assets/icon/info.png";

interface Props {
  products: Product; // Single Product, not an array
}

interface PriceDetails {
  before_price: number;
  current_price: number;
  savings_amount: number;
}

interface Product {
  title: string;
  thumbnail: string;
  reviews: {
    rating: number;
  };
  price: PriceDetails;
}

const SlugComponent: React.FC<Props> = ({ products }: Props) => {
  // Directly access `products` without indexing
  const { title, thumbnail, reviews, price } = products;
  const { before_price, current_price, savings_amount } = price;

  const discountPercentage = before_price
    ? ((before_price - current_price) / before_price) * 100
    : 0;

  const discount =
    isNaN(discountPercentage) || !isFinite(discountPercentage)
      ? 0
      : discountPercentage;

  // const productDetail = await amazon.asin({
  //   asin: "B0DGHYPFYB",
  // });

  return (
    <div className="flex w-full border border-gray-400 bg-[#ffdcdc]">
      <div className="flex h-64 w-72 items-center justify-center bg-[#ffffff] object-cover">
        <Image
          src={thumbnail}
          alt={`${title} image`}
          className="productImage rounded-sm"
          width={150}
          height={100}
          priority
        />
      </div>
      <div className="flex flex-col gap-3 p-3">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-sm">Sponsored</span>
            <Image src={info} alt="info" className="h-5 w-5" />
          </div>
          <span className="font-semibold">{title}</span>
          <StartRating defaultRating={reviews.rating} size={20} maxRating={5} />
          <div className="flex items-center gap-1">
            <span className="text-3xl font-bold">{`Rs ${current_price}`}</span>
            {before_price !== 0 && (
              <div className="flex items-center justify-center gap-1">
                <span className="line-through">{`M.R.P: Rs ${before_price}`}</span>
              </div>
            )}
            <span className="font-semibold">
              {discount !== 0 && `(${Math.trunc(discount)}% off)`}
            </span>
          </div>
          {savings_amount !== 0 && <span>{`Save Rs ${savings_amount}`}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <button className="h-8 w-24 rounded-full bg-yellow-400 text-sm font-semibold">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlugComponent;
