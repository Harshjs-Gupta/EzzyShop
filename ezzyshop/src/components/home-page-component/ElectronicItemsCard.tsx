"use client";
import Image from "next/image";
import iPhone from "../../../public/image/electronicAppliances/iphone.png";
import tv from "../../../public/image/electronicAppliances/tv.png";
import appleAirPods from "../../../public/image/electronicAppliances/appleAirpods.png";
import mouse from "../../../public/image/electronicAppliances/Mouse.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLoading } from "@/app/loadingContext";

function ElectronicItemsCard() {
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
