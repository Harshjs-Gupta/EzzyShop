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
      className="flex h-[28rem] w-72 flex-col space-y-4 bg-[#fefef8d6] p-3"
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
          className="cursor-pointer text-blue-700 underline"
          onClick={() => handleItemsClick(`${keyword}`)}
        >
          Show More
        </span>
      </p>
    </div>
  );
}
export default Chards;
