"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { setValue } from "@/redux/features/panelContent";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const adminSidebarData = [
  { id: 1, title: "dashboard", icon: "/admin_icons/dashboard.svg" },
  { id: 2, title: "products", icon: "/admin_icons/products1.svg" },
  { id: 3, title: "orders", icon: "/admin_icons/orders.svg" },
  { id: 4, title: "setting", icon: "/admin_icons/settings.svg" },
  // { id: 4, title: "analytics", icon: "/admin_icons/graph.svg" },
];
export function AppSidebar() {
  const router = useRouter();
  const params = useParams();
  const adminPanelContent = useSelector(
    (state: RootState) => state.adminPanelContent.value,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.section) {
      dispatch(setValue(params.section as string));
    }
  }, [params.section, dispatch]);
  return (
    <Sidebar>
      <SidebarHeader className="text-gray-400">
        <div className="flex items-center justify-start gap-3">
          <div className="w-12 rounded-md border-2 border-gray-500 p-2">
            <Image
              src="/admin_icons/admin.svg"
              alt="Logo"
              width={100}
              height={100}
            />
            {/* <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="w-28"
            /> */}
          </div>
          <Link href="/admin/dashboard" className="text-2xl font-bold">Admin Panel</Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="text-gray-400">
        <SidebarGroup>
          <ul className="flex w-full flex-col gap-2">
            {adminSidebarData.map((item) => (
              <li
                key={item.id}
                className={` ${adminPanelContent === item.title ? "bg-[#383848]" : ""} flex cursor-pointer items-center justify-start gap-4 rounded-md p-2`}
                onClick={() => {
                  dispatch(setValue(item.title));
                  router.push(`/admin/${item.title}`);
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="w-6"
                />
                <span className="ca text-xl font-semibold capitalize">
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-gray-400">
        <div className="bg-[#21212b]">
          <div className="flex items-center justify-between gap-2 px-3 py-4">
            <Image
              src="/profile.png"
              alt="profile"
              width={100}
              height={100}
              className="w-10 rounded-full"
            />
            <div className="flex flex-col items-start justify-start">
              <h2 className="font-semibold text-white">Harsh Gupta</h2>
              <span className="text-xs font-light text-white">
                harshgupta88911@gmail.com
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between px-3 py-4">
            <div className="flex items-center gap-3">
              <Image
                src="/admin_icons/logout.svg"
                alt="Logout"
                width={100}
                height={100}
                className="w-5"
              />
              <button className="flex w-full items-center justify-center gap-2 rounded-md">
                Logout
              </button>
            </div>
            <div className="cursor-pointer rounded-md bg-[#383848] p-2">
              <Image
                src="/admin_icons/right_arrow.svg"
                alt="Logout"
                width={100}
                height={100}
                className="w-6"
              />
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
