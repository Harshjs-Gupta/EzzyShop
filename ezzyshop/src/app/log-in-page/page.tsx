"use client";
import Image from "next/image";
import style from "./log-in.module.css";
import appName from "@/assets/logo/appName.png";
import tShirt from "../../../public/image/tshirt.png";
import cart from "../../../public/image/cart-with-shopping-bag.png";
import { FormEvent, useEffect, useState } from "react";
import GoogleLogo from "@/assets/logo/google_logo.png";
import { toast } from "react-toastify";
import { auth, provider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

function LogInPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useRouter();

  const handleGoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        console.log(data);
        const email = data.user.email;
        if (email) {
          setEmail(email);
          localStorage.setItem("email", email); // Store user email in localStorage
        } else {
          toast.error("No email associated with this account.");
        } // Store user email in localStorage
        navigate.push("/home-page");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      navigate.push("/home-page");
    }
  }, [email, navigate]);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    const { email, password } = Object.fromEntries(formData.entries()) as {
      username: string;
      email: string;
      password: string;
    };

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("You log in Successfully!");
      navigate.push("/home-page");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className={`${style.background} animation relative h-screen w-screen`}>
      <Image
        src={appName}
        alt="appName"
        className="sm:h-30 h-18 w-32 sm:w-52"
      />
      <div className="flex h-full w-full flex-col items-center justify-between gap-5 sm:flex sm:h-96 sm:flex-row sm:items-center sm:justify-between">
        <Image
          src={cart}
          alt="cart"
          className={`${style.cart_animation} h-40 w-40 sm:h-80 sm:w-80`}
        />
        <div className="animation flex h-80 w-72 flex-col items-center justify-center rounded-3xl border border-black bg-[#FFE8E8] p-5">
          <button
            className={`${style.google_log_in} h-10 w-full`}
            onClick={handleGoogleAuth}
          >
            <Image src={GoogleLogo} alt="GoogleLogo" className="w-6" />
            <span>Sign Up with Google</span>
          </button>
          <span className="p-2">Or</span>
          <form className="flex flex-col space-y-5" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 w-64 rounded-lg border border-black p-2 placeholder:text-black focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 w-64 rounded-lg border border-black p-2 placeholder:text-black focus:outline-none"
            />
            <div className="animation flex flex-col items-center justify-center gap-4">
              <button
                disabled={!!isLoading}
                className="log-in-button flex h-10 w-40 items-center justify-center rounded-full border border-black p-2 font-bold"
              >
                {isLoading ? "In Process..." : "Login"}
              </button>
            </div>
          </form>
        </div>
        <div>
          <Image
            src={tShirt}
            alt="tShirtImage"
            className={`${style.tShirt} relative bottom-16 sm:relative sm:bottom-36`}
          />
        </div>
      </div>
    </div>
  );
}
export default LogInPage;
