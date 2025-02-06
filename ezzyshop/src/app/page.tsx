"use client";
import HomePage from "@/components/home-page-component/homePage";
import { useEffect, useState } from "react";
import LogInPage from "./log-in-page/page";

export default function Home() {
  const [storedEmail, setStoredEmail] = useState<string | null>(null);

  useEffect(() => {
    setStoredEmail(localStorage.getItem("email"));
  }, []);

  if (storedEmail === null) return null; // Prevent rendering on the server

  return storedEmail ? <HomePage /> : <LogInPage />;
}
