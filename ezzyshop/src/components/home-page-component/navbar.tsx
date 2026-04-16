"use client";
import Image from "next/image";
import appName from "@/assets/logo/appName.png";
import SearchBar from "./search-bar";
import Link from "next/link";
import cart from "@/assets/logo/cart.png";
import dummy_profile from "../../../public/image/dummy-profile.jpg";
import menuIcon from "@/assets/icon/menu.png";
import { useRouter } from "next/navigation";
import { useLoading } from "@/app/loadingContext";
import useFetch from "@/app/hooks/useFetch";
import { useState } from "react";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const router = useRouter();
  const { setLoading } = useLoading();

  // Call useFetch at the top level with searchTerm
  useFetch(searchTerm);

  // Event handler to update the search term
  const handleItemsClick = (term: string) => {
    setSearchTerm(term);
  };

  function handleLogOut() {
    localStorage.clear();
    router.push("/log-in-page");
  }

  function handleCartPage() {
    setLoading(true);
    router.push("/home-page/cartPage");
    setLoading(false);
  }

  return (
    <>
      <nav className="nav-background hidden h-14 w-full items-center justify-between px-2 sm:flex">
        <Link href="/home-page">
          <Image
            src={appName}
            alt="appName"
            className="mt-2 hidden h-10 w-24 object-cover sm:block sm:h-14 sm:w-32 md:h-10 md:w-24 xl:h-14 xl:w-32"
          />
        </Link>
        <SearchBar onItemsSearch={handleItemsClick} />
        <div className="flex max-w-fit items-center justify-center space-x-5 text-gray-300">
          <div className="flex items-center justify-center space-x-5 text-base sm:text-[10px] md:text-sm xl:text-lg">
            <Link
              href="/home-page"
              prefetch={true}
              className="font-semibold transition hover:scale-105 hover:text-[#d0a348] active:scale-95"
            >
              Home
            </Link>
            <Link
              href={"/home-page/${searchTerm}"}
              prefetch={true}
              className="cursor-pointer font-semibold transition hover:scale-105 hover:text-[#d0a348] active:scale-95"
              onClick={() => handleItemsClick("smartPhones")}
            >
              Mobiles
            </Link>
            <Link
              href={"/home-page/${searchTerm}"}
              prefetch={true}
              className="cursor-pointer font-semibold transition hover:scale-105 hover:text-[#d0a348] active:scale-95"
              onClick={() => handleItemsClick("kitchen products")}
            >
              Kitchen
            </Link>
            <Link
              href="/home-page/order-page"
              prefetch={true}
              className="cursor-pointer font-semibold transition hover:scale-105 hover:text-[#d0a348] active:scale-95"
            >
              Order
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-5">
            <Image
              src={cart}
              alt="cart"
              className="h-8 w-8 cursor-pointer"
              onClick={handleCartPage}
            />
            <div className="h-10 w-10 cursor-pointer" onClick={handleLogOut}>
              <Image
                src={dummy_profile}
                alt="dummy_profile"
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </nav>
      {/* ! Mobile view 👇 */}
      <nav className="nav-background fixed z-20 flex h-48 w-screen flex-col gap-5 px-2 sm:hidden">
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center justify-center gap-5">
            <Image src={menuIcon} alt="menuIcon" className="h-12 w-10" />
            <Image src={appName} alt="appName" className="h-13 w-28" />
          </div>
          <div className="flex items-center justify-center gap-5">
            <div onClick={handleLogOut}>
              <Image
                src={dummy_profile}
                alt="dummy_profile"
                className="h-8 w-8 cursor-pointer rounded-full object-cover"
              />
            </div>
            <Image
              src={cart}
              alt="cart"
              className="h-8 w-8 cursor-pointer"
              onClick={handleCartPage}
            />
          </div>
        </div>
        <SearchBar onItemsSearch={handleItemsClick} />
        <div className="flex w-screen items-center justify-center space-x-5">
          <div className="flex items-center justify-center space-x-5">
            <Link
              href="/home-page"
              prefetch={true}
              className="text-md font-semibold transition hover:scale-105 hover:text-[#d0a348] active:scale-95"
            >
              Home
            </Link>
            <Link
              href={"/home-page/${searchTerm}"}
              prefetch={true}
              className="cursor-pointer text-lg font-semibold transition hover:scale-105 hover:text-[#d0a348] active:scale-95"
              onClick={() => handleItemsClick("smartPhones")}
            >
              Mobiles
            </Link>
            <Link
              href={"/home-page/${searchTerm}"}
              prefetch={true}
              className="cursor-pointer text-lg font-semibold transition hover:scale-105 hover:text-[#d0a348] active:scale-95"
              onClick={() => handleItemsClick("home and kitchen products")}
            >
              Home & Kitchen
            </Link>
            <Link
              href="/home-page/order-page"
              prefetch={true}
              className="text-md font-semibold transition hover:scale-105 hover:text-[#d0a348] active:scale-95"
            >
              Order
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
