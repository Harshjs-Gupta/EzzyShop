import GamingItemsCard from "@/components/home-page-component/GamingItemsCard";
import "./global.css";
import ElectronicItemsCard from "@/components/home-page-component/ElectronicItemsCard";
import ClothsCard from "@/components/home-page-component/clothsCard";
import Chards from "@/components/home-page-component/ItemsChards";
import beauty from "../../../public/image/beauty.jpg";
import perfume from "../../../public/image/perfume.jpg";
import sofa from "../../../public/image/sofa.webp";
import ceilingLight from "../../../public/image/ceilingLight.webp";
import WatchCard from "@/components/home-page-component/WatchCard";

function HomePage() {
  return (
    <main className="main-page absolute top-48 flex h-screen w-screen flex-col items-center gap-5 overflow-scroll overflow-x-hidden p-5 pb-60 sm:relative sm:top-0 sm:pb-20">
      <div className="flex flex-col items-center justify-center pt-3 text-4xl font-bold capitalize text-white md:text-5xl">
        <span>Discover & shop</span>
        <span>the trend</span>
      </div>
      <main className="main-container grid grid-flow-row grid-cols-1 gap-5 sm:flex sm:flex-col md:grid md:grid-cols-2 lg:grid-cols-4">
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
    </main>
  );
}
export default HomePage;
