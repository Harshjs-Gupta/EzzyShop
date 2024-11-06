"use client";
import Image from "next/image";
import ps5 from "../../../public/image/gamingAccessories/ps5.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLoading } from "@/app/loadingContext";

function GamingItemsCard() {
  const [searchTerm, setSearchTerm] = useState("");
  const { setLoading } = useLoading();
  const router = useRouter();

  useEffect(() => {
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
            router.push(`/home-page/${searchTerm}`); // Move the navigation here after fetch
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
  }, [searchTerm, router, setLoading]);

  const handleItemsClick = (keyword: string) => {
    setSearchTerm(keyword);
  };

  // if (loading) {
  //   <Loading />;
  // }

  return (
    <div
      className="flex h-[28rem] w-80 flex-col space-y-4 bg-[#fefef8d6] p-3"
      onClick={() => handleItemsClick("ps5")}
    >
      <span className="text-xl font-semibold">Gaming Accessories</span>
      <div className="flex h-3/4 w-full cursor-pointer flex-col gap-3 bg-[#fefef889] p-3">
        <Image src={ps5} alt="Ps5" />
      </div>
      <span>Ps5</span>
      <p>
        <span
          className="cursor-pointer text-blue-700 underline"
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
