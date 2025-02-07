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

  function handleOrderPage() {
    setLoading(true);
    router.push("/home-page/order-page");
    setLoading(false);
  }

  return (
    <>
      <nav className="nav-background hidden h-14 w-full items-center justify-between px-2 sm:flex">
        <Image
          src={appName}
          alt="appName"
          className="hidden h-10 w-24 sm:block sm:h-14 sm:w-32"
        />
        <SearchBar onItemsSearch={handleItemsClick} />
        <div className="flex max-w-fit items-center justify-center space-x-5">
          <div className="flex items-center justify-center space-x-5">
            <Link
              href="/home-page"
              className="font-semibold hover:text-[#ff63f2] hover:text-shadow-glow sm:text-[10px] md:text-lg"
            >
              Home Page
            </Link>
            <span
              className="cursor-pointer font-semibold hover:text-[#ff63f2] hover:text-shadow-glow sm:text-[10px] md:text-lg"
              onClick={() => handleItemsClick("smartPhones")}
            >
              Mobiles
            </span>
            <span
              className="cursor-pointer font-semibold hover:text-[#ff63f2] hover:text-shadow-glow sm:text-[10px] md:text-lg"
              onClick={() => handleItemsClick("kitchen products")}
            >
              Home & Kitchen
            </span>
            <span
              className="cursor-pointer font-semibold hover:text-[#ff63f2] hover:text-shadow-glow sm:text-[10px] md:text-lg"
              onClick={handleOrderPage}
            >
              Order
            </span>
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
              className="text-md font-semibold hover:text-[#ff63f2] hover:text-shadow-glow"
            >
              Home
            </Link>
            <Link
              href={"/home-page/${searchTerm}"}
              className="cursor-pointer text-lg font-semibold hover:text-[#ff63f2] hover:text-shadow-glow"
              onClick={() => handleItemsClick("smartPhones")}
            >
              Mobiles
            </Link>
            <Link
              href={"/home-page/${searchTerm}"}
              className="cursor-pointer text-lg font-semibold hover:text-[#ff63f2] hover:text-shadow-glow"
              onClick={() => handleItemsClick("home and kitchen products")}
            >
              Home & Kitchen
            </Link>
            <Link
              href="/home-page/order-page"
              className="text-md font-semibold hover:text-[#ff63f2] hover:text-shadow-glow"
              onClick={handleOrderPage}
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
