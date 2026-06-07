import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import Image from "next/image";
import ReduxProvider from "@/redux/provider";
import Link from "next/link";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="h-screen flex-1 overflow-hidden bg-[#1E1F29]">
          <nav className="flex h-18 w-dvw items-center justify-between border-b-2 border-gray-300 px-6 sm:w-full">
            <div className="flex items-center gap-2 sm:hidden">
              <SidebarTrigger />
              <Link href="/admin/dashboard" className="text-2xl text-white sm:hidden">Admin Panel</Link>
            </div>
            {/* Search input for PC view */}
            <div className="hidden w-60 items-center gap-4 rounded-md border-2 border-gray-300 bg-gray-100/20 p-2 sm:flex sm:w-[460px]">
              <Image
                src="/admin_icons/search.svg"
                alt="search"
                width={100}
                height={100}
                className="w-6 cursor-pointer"
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full border-none text-white outline-none placeholder:text-white"
              />
            </div>

            {/* Menu items */}
            <div className="flex items-center gap-6">
              <Image
                src="/admin_icons/notification.svg"
                alt="cart"
                width={100}
                height={100}
                className="w-6"
              />
              <Image
                src="/profile.png"
                alt="profile"
                width={100}
                height={100}
                className="w-10 rounded-full"
              />
            </div>
          </nav>
          {/* mobile view search box */}
          <div className="mx-2 mt-3 flex w-[calc(100vw-1rem)] items-center gap-4 rounded-lg border-2 border-gray-300 bg-gray-100/20 p-2 sm:hidden sm:w-[460px]">
            <Image
              src="/admin_icons/search.svg"
              alt="search"
              width={100}
              height={100}
              className="w-6 cursor-pointer"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full border-none text-white outline-none placeholder:text-white"
            />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </ReduxProvider>
  );
}
