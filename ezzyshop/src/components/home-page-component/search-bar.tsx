"use client";
import { FormEvent, useState } from "react";
import {FaSearch} from "react-icons/fa"

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
    {/* // ! Desktop view 👇 */}
      <div className="hidden h-10 w-lg items-center justify-between rounded-full border border-gold-default bg-transparent p-4 sm:flex sm:w-[18rem] md:w-[24rem] xl:w-136">
        <form
          className="flex w-lg items-center justify-between"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 bg-transparent text-gold-default outline-none placeholder:font-medium placeholder:text-gold-default"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="text-gold-default text-xl cursor-pointer"/>
          </button>
        </form>
      </div>
      {/*  // ! Mobile view 👇 */}
      <div className="flex h-14 w-full items-center justify-between rounded-xl bg-white sm:hidden">
        <form className="p-4 w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 w-full outline-none placeholder:font-medium placeholder:text-black"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
        <div className="flex h-14 w-14 items-center justify-center rounded-r-xl bg-gold-default active:bg-gold-light">
          <button type="submit" form="searchForm">
             <FaSearch className="text-luxury-black text-2xl cursor-pointer"/>
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
