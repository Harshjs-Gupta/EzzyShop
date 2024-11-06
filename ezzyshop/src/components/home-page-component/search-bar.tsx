"use client";
import Image from "next/image";
import search_icon from "@/assets/icon/search_icon.png";
import { FormEvent, useState } from "react";

interface Props {
  onItemsSearch: (searchTerm: string) => void; // Specify the type
}

function SearchBar({ onItemsSearch }: Props) {
  const [searchValue, setSearchValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the default form submission behavior
    onItemsSearch(searchValue);
    setSearchValue("");
  }

  return (
    <>
      <div className="hidden h-10 w-[32rem] items-center justify-between rounded-full bg-white p-4 sm:flex">
        <form
          className="flex w-[32rem] items-center justify-between"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 outline-none placeholder:font-medium placeholder:text-black"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit">
            <Image
              src={search_icon}
              alt="Search" // Updated alt text for better accessibility
              className="h-6 w-6 cursor-pointer"
            />
          </button>
        </form>
      </div>
      {/* ! Mobile view 👇 */}
      <div className="flex h-14 w-full items-center justify-between rounded-xl bg-white sm:hidden">
        <form className="p-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 outline-none placeholder:font-medium placeholder:text-black"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
        <div className="flex h-14 w-14 items-center justify-center rounded-r-xl bg-[#ffaaf8] active:bg-[#fd8af3]">
          <button type="submit" form="searchForm">
            {" "}
            {/* Added button and form ID for submit */}
            <Image
              src={search_icon}
              alt="Search" // Updated alt text for better accessibility
              className="h-10 w-10 cursor-pointer"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
