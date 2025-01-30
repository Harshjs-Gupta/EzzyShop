import Image from "next/image";
import appNameLogo from "@/assets/logo/appName.png";
import small_underline from "../../public/image/small-underline.png";
import long_underline from "../../public/image/long-underline.png";
import shopping_bag_image from "../../public/image/shopping_bag_image.png";
import Link from "next/link";
import Shadow from "@/components/home-background/shadow";

export default function Home() {
  return (
    <main className="background relative">
      <Shadow />
      <div className="relative flex h-20 w-full justify-between pl-4 pr-4">
        <Image
          src={appNameLogo}
          alt="background"
          className="mt-2 h-20 w-40 object-cover md:h-28 md:w-52"
        />
        <Link
          href="/sign-up-page"
          className="animation sign-up-button mt-4 flex h-10 w-32 items-center justify-center rounded-full font-bold"
        >
          Sign up
        </Link>
      </div>
      <div className="animation relative mt-5 flex w-full items-center justify-center space-x-2 text-white sm:mt-0">
        <span className="text-3xl font-light">Ezzy</span>
        <div className="relative flex flex-col items-center">
          <span className="text-3xl font-light">Shop</span>
          <Image
            src={small_underline}
            alt="underline"
            className="animation relative w-20"
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
          className="log-in-button mt-4 flex h-10 w-32 items-center justify-center rounded-full font-bold"
        >
          Log in
        </Link>
      </span>
      <div className="animation relative mt-2 flex justify-center space-x-2 text-white">
        <Link
          href="/home-page"
          className="font-semibold text-blue-700 underline"
        >
          Log in
        </Link>
        <p className="font-semibold">when already have an account.</p>
      </div>

      <span className="bag-animation relative sm:absolute sm:bottom-0 sm:right-0">
        <Image
          src={shopping_bag_image}
          alt="shopping-bag"
          className="h-96 w-96 sm:h-56 sm:w-56"
        />
      </span>
    </main>
  );
}
