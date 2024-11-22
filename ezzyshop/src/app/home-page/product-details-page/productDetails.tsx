"use client";
import info from "@/assets/icon/info.png";
import Image from "next/image";
import PrimeLogo from "@/components/primeLogo/PrimeLogo";
import "react-medium-image-zoom/dist/styles.css";
import Zoom from "react-medium-image-zoom";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { database } from "@/lib/firebase";
import { useLoading } from "@/app/loadingContext";
import { useRouter } from "next/navigation";

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
  asin: string;
  title: string;
  main_image: string;
  reviews: {
    rating: number;
    feature_bullets: [];
  };
  thumbnail: string;
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
    asin,
    title,
    reviews,
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

  const { amazon_prime } = badges;
  const { setLoading } = useLoading();
  const router = useRouter();

  console.log(products);

  async function addToCart(productId: string) {
    try {
      setLoading(true);
      await setDoc(doc(database, "cart", productId), {
        asin: asin, // Assuming each product has a unique `id`
        title: title,
        thumbnail: main_image,
        reviews: reviews,
        price: price,
      });
      router.push("/home-page/cartPage");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  // console.log(images.map((item) => console.log(item)));

  return (
    <div className="flex flex-col items-center justify-center sm:flex sm:flex-row">
      <div className="flex w-full flex-row gap-4 overflow-x-scroll border-black bg-[#ffd7de] p-1 sm:w-40 sm:flex-col sm:border-r sm:bg-transparent">
        {images.map((item: string) => (
          <div
            key={item}
            className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-xl border border-gray-500 object-cover p-1"
          >
            <Zoom>
              <Image
                src={item}
                alt={`${title} image`}
                className="h-full w-full"
                width={100}
                height={100}
                priority
              />
            </Zoom>
          </div>
        ))}
      </div>
      <div className="flex h-screen w-screen flex-col items-center gap-20 p-3 sm:h-full sm:w-full">
        <div className="flex h-auto w-full flex-col gap-2 p-2 sm:flex-row">
          <div className="flex h-[300px] w-full items-center justify-center rounded-xl bg-white object-cover p-2 sm:w-80">
            <Zoom>
              <Image
                src={main_image}
                alt={`${title} image`}
                className="h-[300px] w-full"
                width={200}
                height={200}
                priority
              />
            </Zoom>
          </div>
          <div className="flex flex-col gap-3 p-3">
            <div className="flex flex-col gap-3 text-left">
              <div className="flex gap-2">
                <span className="text-sm">Sponsored</span>
                <Image
                  src={info}
                  alt="info"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                />
              </div>
              <span className="sm:text-md text-sm font-semibold">{title}</span>

              <div className="flex items-start gap-3">
                <span className="text-sm font-bold sm:text-3xl">{`${symbol} ${current_price}`}</span>
                {before_price !== 0 && (
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm line-through sm:text-2xl">{`M.R.P: ${symbol} ${Math.trunc(before_price)}`}</span>
                  </div>
                )}
                <span className="text-sm font-semibold sm:text-2xl">
                  {savings_percent !== 0 &&
                    `(${Math.trunc(savings_percent)}% off)`}
                </span>
              </div>
              {savings_amount !== 0 && (
                <span className="text-sm sm:text-2xl">{`Save ${symbol} ${savings_amount}`}</span>
              )}
              <span className="text-sm font-semibold sm:text-lg">
                {description.length > 0 && `Description`}
              </span>
              {description.length > 0 && (
                <span className="text-sm sm:text-lg">{description}</span>
              )}
              {amazon_prime && <PrimeLogo />}
              <div className="flex flex-col gap-2">
                <button
                  className="h-8 w-24 rounded-full bg-yellow-400 text-sm font-semibold"
                  onClick={() => addToCart(asin)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-2">
          <span className="text-3xl font-semibold underline">
            Feature Bullets
          </span>
          <ul className="flex w-[90%] flex-col gap-3">
            {feature_bullets.map((feature, index) => (
              <div className="flex gap-2" key={index}>
                <li className="text-xl font-semibold text-red-600">{`${index + 1}.`}</li>
                <li className="text-sm">{feature}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
