import info from "@/assets/icon/info.png";
import ChoiceLogo from "@/components/primeLogo/choiceLogo";
import PrimeLogo from "@/components/primeLogo/PrimeLogo";
import Image from "next/image";
import "react-medium-image-zoom/dist/styles.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ProductsItemType {
  products: Product; // Single Product, not an array
}

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
  title: string;
  main_image: string;
  reviews: {
    rating: number;
    feature_bullets: [];
  };
  price: PriceDetails;
  badges: PrimeDetail;
  feature_bullets: [];
  images: [];
  description: string;
}

const ProductDetails: React.FC<ProductsItemType> = ({
  products,
}: ProductsItemType) => {
  const {
    title,
    main_image,
    price,
    badges,
    images,
    feature_bullets,
    description,
  } = products;
  const {
    before_price,
    current_price,
    savings_amount,
    symbol,
    savings_percent,
  } = price;

  const { amazon_prime, amazon_choice } = badges;

  console.log(products);

  // console.log(images.map((item) => console.log(item)));

  return (
    <div className="flex gap-5">
      <div className="flex w-40 flex-col gap-4 border-r border-black p-3">
        {images.map((item: string) => (
          <div
            key={item}
            className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-xl border border-gray-500 object-cover p-1"
          >
            <TransformWrapper
              alignmentAnimation={{ sizeX: 800, sizeY: 600 }}
              centerZoomedOut={true}
            >
              <TransformComponent>
                <Image
                  src={item}
                  alt={item}
                  width={100}
                  height={100}
                  className="productImage h-auto w-auto rounded-xl object-cover"
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        ))}
      </div>
      <div className="flex h-full w-full flex-col gap-20 p-3">
        <div className="flex h-auto w-full gap-5 p-2">
          <div className="flex h-full w-80 items-center justify-center rounded-xl object-cover p-2">
            <TransformWrapper>
              <TransformComponent>
                <Image
                  src={main_image}
                  alt={`${title} image`}
                  className="productImage rounded-sm"
                  width={250}
                  height={200}
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
                <span className="text-3xl font-bold">{`${symbol} ${current_price}`}</span>
                {before_price !== 0 && (
                  <div className="flex items-center justify-center gap-1">
                    <span className="line-through">{`M.R.P: ${symbol} ${Math.trunc(before_price)}`}</span>
                  </div>
                )}
                <span className="font-semibold">
                  {savings_percent !== 0 &&
                    `(${Math.trunc(savings_percent)}% off)`}
                </span>
              </div>
              {savings_amount !== 0 && (
                <span>{`Save ${symbol} ${savings_amount}`}</span>
              )}
              <span className="text-lg font-semibold">
                {description.length > 0 && `Description`}
              </span>
              {description.length > 0 && <span>{description}</span>}
              {amazon_prime && <PrimeLogo />}
              {amazon_choice && <ChoiceLogo />}
              <div className="flex flex-col gap-2">
                <button className="h-8 w-24 rounded-full bg-yellow-400 text-sm font-semibold">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-3xl font-semibold underline">
            Feature Bullets
          </span>
          <div className="flex flex-col gap-3">
            {feature_bullets.map((feature, index) => (
              <div className="flex gap-2" key={index}>
                <span className="text-xl font-semibold text-red-600">{`${index + 1}.`}</span>
                <span className="">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
