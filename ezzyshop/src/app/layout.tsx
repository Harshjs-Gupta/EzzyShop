import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Notification from "@/components/toastifyNotification/notification";
import { LoadingProvider } from "./loadingContext";
import Loading from "./loading";

const arimaSans = localFont({
  src: "./fonts/Arima-Light.ttf",
  variable: "--font-arima-sans",
  weight: "100 900",
});
const arimaMono = localFont({
  src: "./fonts/Arima-Light.ttf",
  variable: "--font-arima-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EzzyShop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${arimaSans.variable} ${arimaMono.variable} antialiased`}
      >
        <LoadingProvider>
          <Notification />
          {children}
          <Loading /> {/* Global Loading component */}
        </LoadingProvider>
      </body>
    </html>
  );
}
