import Navbar from "@/components/home-page-component/navbar";
import Footer from "@/components/home-page-component/Footer";
import "./globals.css";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
      <Footer/>
    </div>
  );
}
export default Layout;
