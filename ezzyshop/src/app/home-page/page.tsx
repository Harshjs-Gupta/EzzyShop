import GamingItemsCard from "@/components/home-page-component/GamingItemsCard";
import "./globals.css";
import ElectronicItemsCard from "@/components/home-page-component/ElectronicItemsCard";
import ClothsCard from "@/components/home-page-component/clothsCard";
import Chards from "@/components/home-page-component/ItemsChards";
import beauty from "../../../public/image/beauty.jpg";
import perfume from "../../../public/image/perfume.jpg";
import sofa from "../../../public/image/sofa.webp";
import ceilingLight from "../../../public/image/ceilingLight.webp";
import WatchCard from "@/components/home-page-component/WatchCard";
import Navbar from "@/components/home-page-component/navbar";
// import Footer from "@/components/home-page-component/Footer";

function HomePage() {
  return (
    <main className="">
     <section className="main-page flex min-h-screen w-full flex-col items-center gap-5 p-5 pb-10 pt-48 sm:pt-5">
        <div className="flex flex-col font-sans items-center justify-center pt-3 text-4xl font-bold text-white capitalize md:text-5xl">
          <span className="">Discover & shop</span>
          <span className="">the trend</span>
        </div>
        <main className="w-full h-auto grid grid-flow-row place-items-center grid-cols-1 gap-5 sm:flex sm:flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ElectronicItemsCard />
          <GamingItemsCard />
          <WatchCard />
          <ClothsCard />
          <Chards
            productHeading="Beauty Product"
            image={beauty}
            productName="EyeShadow"
            keyword="beauty"
          />
          <Chards
            productHeading="Fragrances"
            image={perfume}
            productName="Perfume"
            keyword="fragrances"
          />
          <Chards
            productHeading="Sofa"
            image={sofa}
            productName="Foldable Sofa"
            keyword="sofa"
          />
          <Chards
            productHeading="Lights"
            image={ceilingLight}
            productName="Ceiling Light"
            keyword="CeilingLight"
          />
        </main>
      </section>
    </main>
  );
}

export default HomePage;
