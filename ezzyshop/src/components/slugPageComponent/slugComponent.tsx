import Image from "next/image";
import StartRating from "../StartRating/startRating";
import info from "@/assets/icon/info.png";
// import { useState } from "react";
import { useLoading } from "@/app/loadingContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { database } from "@/lib/firebase";
import { getAuth } from "firebase/auth";

interface Props {
  products: Product;
}

interface PriceDetails {
  before_price: number;
  current_price: number;
  savings_amount: number;
  savings_percent: number;
}
interface Product {
  asin: string;
  title: string;
  thumbnail: string;
  reviews: {
    rating: number;
  };
  price: PriceDetails;
}

const SlugComponent: React.FC<Props> = ({ products }: Props) => {
  // const [searchID, setSearchID] = useState("");
  const { setLoading } = useLoading();
  const router = useRouter();
  const { asin, title, thumbnail, reviews, price } = products;
  const { before_price, current_price, savings_amount } = price;

  const discountPercentage = before_price
    ? ((before_price - current_price) / before_price) * 100
    : 0;

  const discount =
    isNaN(discountPercentage) || !isFinite(discountPercentage)
      ? 0
      : discountPercentage;

  const fetchProductById = async (productId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/productDetail?searchID=${encodeURIComponent(productId)}`,
      );
      const data = await response.json();

      if (response.ok) {
        // setSearchID(productId);
        // Save fetched product data in local storage and navigate to cart page
        localStorage.setItem("productDetails", JSON.stringify(data));
        router.push("/home-page/product-details-page");
        return data;
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  function handleDetailsPage() {
    fetchProductById(asin);
  }

  async function addToCart(productId: string) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      toast.error("You must be logged in to add items to the cart.");
      return;
    }

    try {
      setLoading(true);
      await setDoc(doc(database, "cart", productId), {
        asin: asin,
        title: title,
        thumbnail: thumbnail,
        reviews: reviews,
        price: price,
        userId: user.uid, // Store user ID for reference
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

  return (
    <div className="flex h-[257px] w-full overflow-hidden border border-gray-400 bg-[#ffdcdc]">
      <div
        className="flex h-[100%] w-[265px] cursor-pointer items-center justify-center bg-[#ffffff] object-cover p-2 sm:h-64 sm:w-72"
        onClick={handleDetailsPage}
      >
        <Image
          src={thumbnail}
          alt={`${title} image`}
          className="productImage rounded-sm"
          width={180}
          height={100}
          priority
        />
      </div>
      <div className="flex flex-col gap-3 p-2 sm:p-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">Sponsored</span>
            <Image src={info} alt="info" className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <span
            className="cursor-pointer text-[12px] font-semibold hover:text-purple-600 sm:text-[18px]"
            onClick={handleDetailsPage}
          >
            {title}
          </span>
          <StartRating defaultRating={reviews.rating} size={20} maxRating={5} />
          <div className="flex flex-col items-start gap-1 sm:flex-row sm:gap-2">
            <span className="text-[12px] font-bold sm:text-3xl">{`Rs ${current_price}`}</span>
            <div className="flex gap-2">
              {before_price !== 0 && (
                <div className="flex items-center justify-center gap-1">
                  <span className="text-[12px] line-through sm:text-xl">{`M.R.P: Rs ${before_price}`}</span>
                </div>
              )}
              <span className="text-[12px] font-semibold sm:text-xl">
                {discount !== 0 && `(${Math.trunc(discount)}% off)`}
              </span>
            </div>
          </div>
          {savings_amount !== 0 && (
            <span className="text-[12px] sm:text-2xl">{`Save Rs ${savings_amount}`}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => addToCart(asin)}
            className="h-8 w-20 rounded-full bg-yellow-400 text-[12px] font-semibold sm:h-8 sm:w-24 sm:text-sm"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlugComponent;
