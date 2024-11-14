import Image from "next/image";
import amazonChoice from "@/assets/logo/amazonchoice.png";

function ChoiceLogo() {
  return (
    <span>
      <Image
        src={amazonChoice}
        alt="amazonPrimeLogo"
        width={200}
        height={50}
        className="h-12 w-20"
      />
    </span>
  );
}
export default ChoiceLogo;
