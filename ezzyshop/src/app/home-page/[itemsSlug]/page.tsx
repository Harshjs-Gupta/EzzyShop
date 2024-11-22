import SlugProduct from "@/components/slugPageComponent/slugProducts";
import style from "./slugPage.module.css";

function SlugPage() {
  return (
    <div
      className={`${style.background} sm: relative top-48 z-0 flex h-screen w-screen flex-col overflow-scroll pb-72 sm:relative sm:top-0 sm:p-2 sm:pb-10`}
    >
      <SlugProduct />
    </div>
  );
}
export default SlugPage;
