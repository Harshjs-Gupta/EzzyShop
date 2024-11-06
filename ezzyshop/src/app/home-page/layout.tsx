import Navbar from "@/components/home-page-component/navbar";
import "./global.css";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
export default Layout;
