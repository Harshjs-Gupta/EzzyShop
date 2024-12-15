"use client";
import Image from "next/image";
import iPhone from "../../../public/image/electronicAppliances/iphone.png";
import tv from "../../../public/image/electronicAppliances/tv.png";
import appleAirPods from "../../../public/image/electronicAppliances/appleAirpods.png";
import mouse from "../../../public/image/electronicAppliances/Mouse.png";
import { useState } from "react";
import useFetch from "@/app/hooks/useFetch";

function ElectronicItemsCard() {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  // Call useFetch at the top level with searchTerm
  useFetch(searchTerm);

  // Event handler to update the search term
  const handleItemsClick = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="electronicCard flex h-[28rem] w-72 flex-col space-y-4 bg-[#fefef8d6] p-3">
      <span className="text-xl font-semibold">Gadgets</span>
      <div className="grid h-3/4 w-full grid-cols-2 grid-rows-2 gap-2">
        <div className="flex cursor-pointer flex-col justify-center space-y-2">
          <Image
            src={iPhone}
            alt="iPhone"
            className="h-32 w-32"
            onClick={() => handleItemsClick("Iphone")}
          />
          <span>IPhone</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center space-y-2">
          <Image
            src={tv}
            alt="Apple Monitor"
            className="h-32 w-32"
            onClick={() => handleItemsClick("AppleMonitor")}
          />
          <span>Apple Monitor</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center space-y-2">
          <Image
            src={appleAirPods}
            alt="Apple AirPods"
            className="h-32 w-32"
            onClick={() => handleItemsClick("AirPods")}
          />
          <span>Apple AirPods</span>
        </div>
        <div className="flex cursor-pointer flex-col justify-center space-y-2">
          <Image
            src={mouse}
            alt="Mouse"
            className="h-32 w-32"
            onClick={() => handleItemsClick("mouse")}
          />
          <span>Mouse</span>
        </div>
      </div>
      <p>
        <span
          className="cursor-pointer text-blue-700 underline"
          onClick={() => handleItemsClick("ElectronicsGadgets")}
        >
          Show More
        </span>
      </p>
    </div>
  );
}

export default ElectronicItemsCard;
