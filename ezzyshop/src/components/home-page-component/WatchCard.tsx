"use client";
import Image from "next/image";
import Link from "next/link";
import watch from "../../../public/image/apple-watch.png";
import { useState } from "react";
import useFetch from "@/app/hooks/useFetch";

function WatchCard() {
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
      onClick={() => handleItemsClick("appleWatch")}
    >
      <span className="text-xl font-semibold">Watch</span>
      <div className="flex h-3/4 w-full cursor-pointer flex-col gap-3 bg-black/40">
        <Image src={watch} alt="dinner_set" />
      </div>
      <span>Apple Watch</span>
      <span>
        <Link
          href="#"
          className="cursor-pointer font-semibold text-[#CFCFCF] underline transition hover:text-[#f7c35b]"
        >
          Show More
        </Link>
      </span>
    </div>
  );
}
export default WatchCard;
