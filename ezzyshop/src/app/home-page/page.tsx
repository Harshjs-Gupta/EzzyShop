"use client";
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
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation"; // Import from next/navigation

function HomePage() {
  const pathname = usePathname(); // Use usePathname hook to get the current route path
  const [isMounted, setIsMounted] = useState(false); // To check if the component has mounted

  useEffect(() => {
    setIsMounted(true); // Update when the component is mounted
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Prevent running before component mounts

    gsap.registerPlugin(ScrollTrigger);

    // Define animations
    const animation1 = gsap.from(".main-container .cards", {
      x: 1200,
      duration: 1,
      delay: 0.1,
      ease: "ease-in",
      stagger: 1,
    });

    const animation2 = gsap.from(".main-container .cards2", {
      x: 1300,
      duration: 3,
      delay: 0.5,
      ease: "ease-in",
      stagger: 1,
      scrollTrigger: {
        trigger: ".main-container .cards2",
        scroller: ".main-page",
        start: "top 55%",
        end: "top 30%",
        scrub: 5,
        markers: true,
      },
    });

    // Cleanup animations
    return () => {
      animation1.kill();
      animation2.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMounted, pathname]); // Trigger the effect again when the pathname changes

  return (
    <main className="main-page absolute top-48 flex h-screen w-screen flex-col items-center gap-5 overflow-scroll overflow-x-hidden p-5 pb-60 sm:relative sm:top-0 sm:pb-20">
      <div className="flex flex-col items-center justify-center pt-3 text-4xl font-bold capitalize text-white md:text-5xl">
        <span>Discover & shop</span>
        <span>the trend</span>
      </div>
      <main className="main-container grid grid-flow-row grid-cols-1 gap-5 sm:flex sm:flex-col md:grid md:grid-cols-2 lg:grid-cols-4">
        <div className="cards">
          <ElectronicItemsCard />
        </div>
        <div className="cards">
          <GamingItemsCard />
        </div>
        <div className="cards">
          <WatchCard />
        </div>
        <div className="cards">
          <ClothsCard />
        </div>
        <div className="cards2">
          <Chards
            productHeading="Beauty Product"
            image={beauty}
            productName="EyeShadow"
            keyword="beauty"
          />
        </div>
        <div className="cards2">
          <Chards
            productHeading="Fragrances"
            image={perfume}
            productName="Perfume"
            keyword="fragrances"
          />
        </div>
        <div className="cards2">
          <Chards
            productHeading="Sofa"
            image={sofa}
            productName="Foldable Sofa"
            keyword="sofa"
          />
        </div>
        <div className="cards2">
          <Chards
            productHeading="Lights"
            image={ceilingLight}
            productName="Ceiling Light"
            keyword="CeilingLight"
          />
        </div>
      </main>
    </main>
  );
}

export default HomePage;
