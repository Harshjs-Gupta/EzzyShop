import Image from "next/image";
import prime from "@/assets/logo/AmazonPrime.png";

function PrimeLogo() {
  return (
    <span>
      <Image
        src={prime}
        alt="amazonPrimeLogo"
        width={200}
        height={50}
        className="h-10 w-14 sm:h-12 sm:w-20"
      />
    </span>
  );
}
export default PrimeLogo;
