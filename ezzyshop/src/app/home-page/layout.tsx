// import Navbar from "@/components/home-page-component/navbar";
import "./globals.css";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <Navbar /> */}
      {children}
    </div>
  );
}
export default Layout;
