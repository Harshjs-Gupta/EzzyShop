"use client";
import Image from "next/image";
import cloths from "../../../public/image/cloths/Cloths.png";
import FootWear from "../../../public/image/cloths/FootWares.png";
import Jeans from "../../../public/image/cloths/Jeans.png";
import WomenWear from "../../../public/image/cloths/Women'sWear.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLoading } from "@/app/loadingContext";

function ClothsCard() {
  const [searchTerm, setSearchTerm] = useState("");
  const { setLoading } = useLoading();
  const router = useRouter();

  useEffect(
    function () {
      const handleSearch = async () => {
        if (searchTerm) {
          setLoading(true);
          try {
            const response = await fetch(
              `/api/amazon?searchTerm=${encodeURIComponent(searchTerm)}`,
            );
            const data = await response.json();

            if (response.ok) {
              localStorage.setItem("products", JSON.stringify(data));
              router.push(`/home-page/${searchTerm}`);
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
        }
      };

      handleSearch();
    },
    [searchTerm, router, setLoading],
  );

  const handleItemsClick = (keyword: string) => {
    setSearchTerm(keyword);
  };

  return (
    <div className="flex h-[28rem] w-80 flex-col space-y-4 bg-[#fefef8d6] p-3">
      <span className="text-xl font-semibold">
        Men&apos;s & Women&apos;s Cloths
      </span>
      <div className="grid h-3/4 w-full grid-cols-2 grid-rows-2 gap-2">
        <div
          className="flex cursor-pointer flex-col space-y-2"
          onClick={() => handleItemsClick("t-shirts")}
        >
          <Image src={cloths} alt="pic" className="h-32 w-32" />
          <span>T-Shirts</span>
        </div>
        <div
          className="flex cursor-pointer flex-col space-y-2"
          onClick={() => handleItemsClick("footwear")}
        >
          <Image src={FootWear} alt="pic" className="h-32 w-32" />
          <span>FootWare</span>
        </div>

        <div
          className="flex cursor-pointer flex-col space-y-2"
          onClick={() => handleItemsClick("Jeans")}
        >
          <Image src={Jeans} alt="pic" className="h-32 w-32" />
          <span>Jeans</span>
        </div>
        <div
          className="flex cursor-pointer flex-col space-y-2"
          onClick={() => handleItemsClick("Women'sWear")}
        >
          <Image src={WomenWear} alt="pic" className="h-32 w-32" />
          <span>Women&apos;s Wear</span>
        </div>
      </div>
      <p>
        <span
          className="cursor-pointer text-blue-700 underline"
          onClick={() => handleItemsClick("ClothsAndFootwear")}
        >
          Show More
        </span>
      </p>
    </div>
  );
}
export default ClothsCard;
