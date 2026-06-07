"use client";
import Dashboard from "@/components/adminPanel/dashboard";
import Orders from "@/components/adminPanel/orders";
import ProductsPanel from "@/components/adminPanel/productsPanel";
import Setting from "@/components/adminPanel/setting";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

export default function Admin() {
  const adminPanelContent = useSelector(
    (state: RootState) => state.adminPanelContent.value,
  );
  return (
    <main className="flex h-[calc(100vh-72px)] w-full flex-col overflow-y-auto py-4 text-[#A9ACB8]">
      {adminPanelContent === "dashboard" && <Dashboard />}
      {adminPanelContent === "products" && <ProductsPanel />}
      {adminPanelContent === "orders" && <Orders />}
      {adminPanelContent === "setting" && <Setting />}
    </main>
  );
}
