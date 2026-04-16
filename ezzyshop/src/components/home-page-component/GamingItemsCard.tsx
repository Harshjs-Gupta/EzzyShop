"use client";
import Image from "next/image";
import ps5 from "../../../public/image/gamingAccessories/ps5.png";
import { useState } from "react";
import useFetch from "@/app/hooks/useFetch";

function GamingItemsCard() {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  // Call useFetch at the top level with searchTerm
  useFetch(searchTerm);

  // Event handler to update the search term
  const handleItemsClick = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div
      className="flex h-[28rem] w-72 flex-col space-y-4 bg-black/30 p-3 text-[#f7c35b] backdrop-blur-md"
      onClick={() => handleItemsClick("ps5")}
    >
      <span className="text-xl font-semibold">Gaming Accessories</span>
      <div className="flex h-3/4 w-full cursor-pointer flex-col gap-3 bg-black/40 p-3">
        <Image src={ps5} alt="Ps5" />
      </div>
      <span>Ps5</span>
      <p>
        <span
          className="cursor-pointer font-semibold text-[#CFCFCF] underline transition hover:text-[#f7c35b]"
          onClick={(e) => {
            e.stopPropagation();
            handleItemsClick("gamingConsole");
          }}
        >
          Show More
        </span>
      </p>
      {/* {loading && <Loading />} */}
    </div>
  );
}

export default GamingItemsCard;
