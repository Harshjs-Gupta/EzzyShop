"use client";
import Image from "next/image";
import Link from "next/link";
import small_underline from "../../public/image/small-underline.png";
import long_underline from "../../public/image/long-underline.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");

    if (storedEmail) {
      setIsRedirecting(true);

      setTimeout(() => {
        router.push("/home-page");
      }, 3000);
    }
  }, [router]);

  if (isRedirecting) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 bg-gradient-to-r from-[#3f3f3f] to-[#101010]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#d0a348] border-t-transparent"></div>
        <h1 className="text-2xl font-bold text-[#d0a348]">
          You are logged in.
        </h1>
        <span className="animate-pulse text-3xl font-bold text-white">
          Redirecting to Home page...
        </span>
      </div>
    );
  }

  return (
    <main className="background relative">
      <div className="relative flex h-20 w-full justify-between pl-4 pr-4">
        <Image
          src="/appName.svg"
          loading="lazy"
          alt="product"
          width={200}
          height={600}
          placeholder="blur"
          blurDataURL="/blur.jpg"
          className="mt-2 h-20 w-40 object-cover md:h-28 md:w-52"
        />
        <Link
          href="/sign-up-page"
          prefetch={true}
          className="animation sign-up-button mt-4 flex h-10 w-32 items-center justify-center rounded-full font-bold"
        >
          Sign up
        </Link>
      </div>
      <div className="animation relative mt-5 flex w-full items-center justify-center space-x-2 font-bold text-white sm:mt-0">
        <span className="text-3xl font-light">Ezzy</span>
        <div className="relative flex flex-col items-center">
          <span className="text-3xl font-light">Shop</span>
          <Image
            src={small_underline}
            alt="underline"
            className="animation relative w-20"
            placeholder="blur"
            blurDataURL="/blur.jpg"
          />
        </div>
      </div>
      <div className="animation relative mt-5 flex flex-col items-center justify-center space-y-4 text-white sm:mt-4">
        <h1 className="text-4xl sm:text-7xl">Everything you love</h1>
        <div className="relative flex items-center space-x-4">
          <h1 className="text-4xl font-light sm:text-7xl">in one</h1>
          <div>
            <h1 className="text-4xl font-light sm:text-7xl">place</h1>
            <Image
              src={long_underline}
              alt="underline"
              className="relative ml-10 w-24 sm:w-36"
              placeholder="blur"
              loading="lazy"
              blurDataURL="/blur.jpg"
            />
          </div>
        </div>
      </div>
      <div className="animation relative mt-4 text-center font-mono text-xl text-white sm:mt-3">
        <h3>Watch this space for the ultimate shopping</h3>
        <h3>experience —minus the crowds.</h3>
      </div>
      <span className="animation relative mt-5 flex items-center justify-center sm:mt-0">
        <Link
          href="/log-in-page"
          prefetch={true}
          className="log-in-button mt-4 flex h-10 w-32 items-center justify-center rounded-full font-bold"
        >
          Log in
        </Link>
      </span>
      <div className="animation relative mt-2 flex justify-center space-x-2 text-white">
        <Link
          href="/home-page"
          prefetch={true}
          className="font-semibold text-blue-700 underline"
        >
          Log in
        </Link>
        <p className="font-semibold">when already have an account.</p>
      </div>

      <span className="bag-animation relative sm:absolute sm:bottom-0 sm:left-0">
        <Image
          src="/shopping_bag_image.svg"
          alt="shopping-bag"
          className="h-96 w-96 sm:h-56 sm:w-56"
          height={100}
          width={100}
          loading="lazy"
          placeholder="blur"
          blurDataURL="/images/blur_image.jpg"
        />
      </span>
    </main>
  );
}
