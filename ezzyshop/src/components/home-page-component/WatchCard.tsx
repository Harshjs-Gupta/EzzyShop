"use client";
import Image from "next/image";
import Link from "next/link";
import watch from "../../../public/image/apple-watch.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLoading } from "@/app/loadingContext";

function WatchCard() {
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
    <div
      className="flex h-[28rem] w-80 flex-col space-y-4 bg-[#fefef8d6] p-3"
      onClick={() => handleItemsClick("appleWatch")}
    >
      <span className="text-xl font-semibold">Watch</span>
      <div className="flex h-3/4 w-full cursor-pointer flex-col gap-3 bg-[#FEF3F0]">
        <Image src={watch} alt="dinner_set" />
      </div>
      <span>Apple Watch</span>
      <span>
        <Link href="#" className="text-blue-700 underline">
          Show More
        </Link>
      </span>
    </div>
  );
}
export default WatchCard;
