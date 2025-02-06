"use client";
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
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/home-page-component/navbar";

function HomePage() {
  useEffect(() => {
    // Initial mount animation
    const animation1 = gsap.fromTo(
      ".main-container .cards",
      { x: 1200 }, // Start position
      {
        x: 0, // End position
        duration: 1,
        ease: "ease-in",
        stagger: 0.2,
      },
    );

    // Scroll-triggered animation
    const animation2 = gsap.fromTo(
      ".main-container .cards2",
      { x: 1300 }, // Start position
      {
        x: 0, // End position
        duration: 3,
        ease: "ease-in",
        stagger: 0.5,
        scrollTrigger: {
          trigger: ".main-container .cards2",
          scroller: ".main-page",
          start: "top 55%",
          end: "top 30%",
          scrub: 5,
        },
      },
    );

    // Cleanup on component unmount
    return () => {
      animation1.kill();
      animation2.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []); // Trigger the effect again when the pathname changes

  return (
    <>
      <Navbar />
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
    </>
  );
}

export default HomePage;
