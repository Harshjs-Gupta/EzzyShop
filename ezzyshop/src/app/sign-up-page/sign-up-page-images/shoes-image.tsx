import Image from "next/image";
import shoes from "../../../../public/image/shoes.png";
import style from "../sign-up.module.css"

function ShoesImage() {
  return (
    <div className="sm:overflow-hidden sm:relative sm:right-20 sm:bottom-20 relative bottom-28 right-5">
    <Image src={shoes} alt="shoes" className={`${style.shoes_1} z-0 relative sm:top-28 top-24 sm:w-64 w-40`} />
    <Image src={shoes} alt="shoes" className={`${style.shoes_2} relative sm:bottom-10 sm:left-5  sm:w-64 w-40`} />
  </div>
  );
}
export default ShoesImage;