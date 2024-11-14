// import info from "@/assets/icon/info.png";
// import StarRating from "@/components/StartRating/startRating";
// import Image from "next/image";

// interface ProductsItemType {
//   products: Product; // Single Product, not an array
// }

// interface PriceDetails {
//   before_price: number;
//   current_price: number;
//   savings_amount: number;
// }

// interface Product {
//   title: string;
//   main_image: string;
//   reviews: {
//     rating: number;
//   };
//   price: PriceDetails;
// }

// const CartProducts: React.FC<ProductsItemType> = ({
//   products,
// }: ProductsItemType) => {
//   const { title, main_image, reviews, price } = products;
//   const { before_price, current_price, savings_amount } = price;

//   const discountPercentage = before_price
//     ? ((before_price - current_price) / before_price) * 100
//     : 0;

//   const discount =
//     isNaN(discountPercentage) || !isFinite(discountPercentage)
//       ? 0
//       : discountPercentage;
//   console.log(products);

//   return (
//     <div className="flex h-52 w-full gap-5">
//       <div className="flex h-52 w-52 items-center justify-center bg-[#ffffff] object-cover">
//         <Image
//           src={main_image}
//           alt={`${title} image`}
//           className="productImage"
//           width={150}
//           height={100}
//           priority
//         />
//       </div>
//       <div className="flex flex-col gap-3 p-3">
//         <div className="flex flex-col gap-2">
//           <div className="flex gap-2">
//             <span className="text-sm">Sponsored</span>
//             <Image src={info} alt="info" className="h-5 w-5" />
//           </div>
//           <span className="font-semibold">{title}</span>
//           <StarRating defaultRating={reviews.rating} size={20} maxRating={5} />
//           <div className="flex items-center gap-3">
//             <span className="text-3xl font-bold">{`Rs ${current_price}`}</span>
//             {before_price !== 0 && (
//               <div className="flex items-center justify-center gap-1">
//                 <span className="line-through">{`M.R.P: Rs ${before_price}`}</span>
//               </div>
//             )}
//             <span className="font-semibold">
//               {discount !== 0 && `(${Math.trunc(discount)}% off)`}
//             </span>
//           </div>
//           {savings_amount !== 0 && <span>{`Save Rs ${savings_amount}`}</span>}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CartProducts;
