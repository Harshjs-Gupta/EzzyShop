"use client";
import style from "./sign-up.module.css";
import appName from "@/assets/logo/appName.png";
import dummy_profile from "../../../public/image/dummy-profile.jpg";
import ShoesImage from "./sign-up-page-images/shoes-image";
import CartImage from "./sign-up-page-images/cart-image";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import upload from "@/lib/upload";
import { ChangeEvent, FormEvent, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "@/lib/firebase";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface AvatarState {
  file: File | null;
  url: string | StaticImageData;
}

function SignUpPage() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<AvatarState>({
    file: null,
    url: dummy_profile,
  });

  type CombineType = string | number;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<CombineType>("");
  const [password, setPassword] = useState<CombineType>("");

  function handleAvatar(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const newAvatarURL = URL.createObjectURL(file);
      setAvatar({
        file: file,
        url: newAvatarURL,
      });
    }
  }

  async function handleSignIn(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const { username, email, password } = Object.fromEntries(
      formData.entries(),
    ) as {
      username: string;
      email: string;
      password: string;
    };

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);

      let imageUrl: string | null = "";
      if (avatar.file) {
        imageUrl = await upload(avatar.file);
      } else {
        toast.error("Profile picture is required.");
        return;
      }

      await setDoc(doc(database, "users", res.user.uid), {
        username,
        email,
        avatar: imageUrl,
        id: res.user.uid,
      });
      toast.success("Account successfully connected! You can login now!");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
      setAvatar({ file: null, url: dummy_profile });
      setUsername("");
      setEmail("");
      setPassword("");
      router.push("/log-in-page");
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
        <CartImage />
        <form
          className="animation flex h-auto w-72 flex-col items-center justify-center rounded-3xl border border-[#d0a348] bg-[#3f3f3f] px-2 py-4 text-white"
          onSubmit={handleSignIn}
        >
          <label htmlFor="file" className="flex w-full items-center gap-2 px-2">
            <div className="flex flex-col gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-lg">
                <Image
                  src={avatar.url || dummy_profile}
                  alt="dummyProfile"
                  className="cursor-pointer object-cover"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="flex flex-col text-sm">
              <span>Upload an image</span>
              <span className="text-[#cfa041]">Profile pic is required</span>
            </div>
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <div className="mt-2 h-auto space-y-5 p-2">
            <input
              type="text"
              name="username"
              className="w-64 rounded-lg border border-[#d0a348] bg-transparent p-2 outline-none"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              name="email"
              className="w-64 rounded-lg border border-[#d0a348] bg-transparent p-2 outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              className="w-64 rounded-lg border border-[#d0a348] bg-transparent p-2 outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              disabled={!!isLoading}
              className="sign-up-button flex h-10 w-40 items-center justify-center rounded-full border border-black p-2 font-bold text-black"
            >
              {isLoading ? "In Process..." : "Sign Up"}
            </button>
            <p className="flex space-x-2 text-sm">
              <Link
                href="/log-in-page"
                className="cursor-pointer text-[#d0a348] underline"
              >
                Log in
              </Link>
              , when you have an account.
            </p>
          </div>
          <div className="flex flex-col text-center">
            <span className="text-sm">Or</span>
            <Link href="/log-in-page" className="font-semibold text-yellow-500">
              Google Sign in
            </Link>
          </div>
        </form>
        <ShoesImage />
      </div>
    </div>
  );
}
export default SignUpPage;
