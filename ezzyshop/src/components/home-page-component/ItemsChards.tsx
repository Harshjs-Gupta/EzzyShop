"use client";
import { useLoading } from "@/app/loadingContext";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface InfoProps {
  productHeading: string;
  image: StaticImageData;
  productName: string;
  keyword: string;
}

function Chards({ productHeading, image, productName, keyword }: InfoProps) {
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
