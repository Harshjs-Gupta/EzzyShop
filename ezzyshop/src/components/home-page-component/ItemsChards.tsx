"use client";
import useFetch from "@/app/hooks/useFetch";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface InfoProps {
  productHeading: string;
  image: StaticImageData;
  productName: string;
  keyword: string;
}

function Chards({ productHeading, image, productName, keyword }: InfoProps) {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  // Call useFetch at the top level with searchTerm
  useFetch(searchTerm);

  // Event handler to update the search term
  const handleItemsClick = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div
      className="flex h-112 w-72 flex-col space-y-4 bg-black/50 p-3 text-gold-default backdrop-blur-md"
      onClick={() => handleItemsClick(`${keyword}`)}
    >
      <span className="text-xl font-semibold">{productHeading}</span>
      <div className="flex h-3/4 w-full cursor-pointer flex-col gap-3">
        <Image
          src={image}
          alt="chair"
          className="h-full w-full"
          width={320} // Set this value based on your image dimensions
          height={240}
        />
        <span>{productName}</span>
      </div>
      <p>
        <span
          className="cursor-pointer font-semibold text-[#CFCFCF] underline transition hover:text-gold-default"
          onClick={() => handleItemsClick(`${keyword}`)}
        >
          Show More
        </span>
      </p>
    </div>
  );
}
export default Chards;
