"use client";

import Image from "next/image";
import { useState } from "react";
import cloths from "../../../public/image/cloths/Cloths.png";
import FootWear from "../../../public/image/cloths/FootWares.png";
import Jeans from "../../../public/image/cloths/Jeans.png";
import WomenWear from "../../../public/image/cloths/Women'sWear.png";
import useFetch from "@/app/hooks/useFetch";

function ClothsCard() {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  // Call useFetch at the top level with searchTerm
  useFetch(searchTerm);

  // Event handler to update the search term
  const handleItemsClick = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="flex h-[28rem] w-72 flex-col space-y-4 bg-[#fefef8d6] p-3">
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
          <span>Footwear</span>
        </div>

        <div
          className="flex cursor-pointer flex-col space-y-2"
          onClick={() => handleItemsClick("jeans")}
        >
          <Image src={Jeans} alt="pic" className="h-32 w-32" />
          <span>Jeans</span>
        </div>
        <div
          className="flex cursor-pointer flex-col space-y-2"
          onClick={() => handleItemsClick("women's wear")}
        >
          <Image src={WomenWear} alt="pic" className="h-32 w-32" />
          <span>Women&apos;s Wear</span>
        </div>
      </div>
      <p>
        <span
          className="cursor-pointer text-blue-700 underline"
          onClick={() => handleItemsClick("cloths-and-footwear")}
        >
          Show More
        </span>
      </p>
    </div>
  );
}

export default ClothsCard;
