import SlugProduct from "@/components/slugPageComponent/slugProducts";
import style from "./slugPage.module.css";

function SlugPage() {
  return (
    <div
      className={`${style.background} h-screen w-screen overflow-scroll p-2 pb-10`}
    >
      <div>
        <SlugProduct />
      </div>
    </div>
  );
}
export default SlugPage;
