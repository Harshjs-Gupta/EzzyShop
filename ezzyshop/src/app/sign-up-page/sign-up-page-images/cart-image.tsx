import Image from "next/image";
import cart_with_bag from "../../../../public/image/cart-with-shopping-bag.png";
import style from "../sign-up.module.css";

function CartImage() {
  return (
    <div className="overflow-hidden">
      <Image
        src={cart_with_bag}
        alt="cart-with-bag"
        className={`${style.cart_with_bag} relative bottom-5 h-40 w-40 sm:h-80 sm:w-80`}
      />
    </div>
  );
}
export default CartImage;
