import {
  setCategories,
  setSortByPrice,
  setStatus,
} from "@/redux/features/productFilters";
import { RootState } from "@/redux/store";
import Image from "next/image";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
  stock: string;
  category: string;
}
const productsData: Product[] = [
  {
    id: 1,
    image: "/image/Jordan1Retro.png",
    name: "Jordan 1 Retro High Dior (Limited Edition)",
    price: "7,49,999",
    stock: "10",
    category: "fashion",
  },
  {
    id: 2,
    image: "/image/apple-watch.png",
    name: "Apple Watch Series 7",
    price: "39,999",
    stock: "75",
    category: "electronics",
  },
  {
    id: 3,
    image: "/image/electronicAppliances/appleAirpods.png",
    name: "Apple AirPods Pro (2nd Generation)",
    price: "26,999",
    stock: "0",
    category: "electronics",
  },
  {
    id: 4,
    image: "/image/beardo.png",
    name: "Beardo Mariner Perfume",
    price: "799",
    stock: "3",
    category: "beauty",
  },
  {
    id: 5,
    image: "/image/electronicAppliances/iphone.png",
    name: "Apple iPhone 14 Pro Max",
    price: "1,24,900",
    stock: "41",
    category: "electronics",
  },
  {
    id: 6,
    image: "/image/electronicAppliances/tv.png",
    name: "Samsung 4K OLED TV",
    price: "79,999",
    stock: "4",
    category: "electronics",
  },
  {
    id: 7,
    image: "/image/electronicAppliances/mouse.png",
    name: "Logitech MX Master 3S",
    price: "8,999",
    stock: "0",
    category: "electronics",
  },
  {
    id: 8,
    image: "/image/ceilingLight.webp",
    name: "LED Ceiling Light",
    price: "1,000",
    stock: "12",
    category: "home",
  },
];

export default function ProductsPanel() {
  const dispatch = useDispatch();
  const { categories, status, sortByPrice } = useSelector(
    (state: RootState) => state.productFilters,
  );

  const resetFilters = () => {
    dispatch(setCategories(""));
    dispatch(setStatus(""));
    dispatch(setSortByPrice(""));
  };

  const filteredProducts = useMemo(() => {
    const filtered = productsData.filter((product) => {
      // Category filter
      const categoryMatch =
        categories === "" || product.category === categories;

      // Status filter
      let statusMatch = true;

      switch (status) {
        case "":
          statusMatch = true;
          break;

        case "in_stock":
          statusMatch = Number(product.stock) > 10;
          break;

        case "out_of_stock":
          statusMatch = Number(product.stock) === 0;
          break;

        case "low_stock":
          statusMatch = Number(product.stock) > 0 && Number(product.stock) < 10;
          break;

        default:
          statusMatch = true;
      }

      return categoryMatch && statusMatch;
    });

    // Sorting
    switch (sortByPrice) {
      case "price_low_high":
        return [...filtered].sort(
          (a, b) =>
            Number(a.price.replace(/,/g, "")) -
            Number(b.price.replace(/,/g, "")),
        );

      case "price_high_low":
        return [...filtered].sort(
          (a, b) =>
            Number(b.price.replace(/,/g, "")) -
            Number(a.price.replace(/,/g, "")),
        );

      default:
        return filtered;
    }
  }, [categories, status, sortByPrice]);

  return (
    <section className="flex h-full w-full flex-col px-4 text-[#A9ACB8] sm:px-6">
      {/* Top section */}
      <div className="mt-3 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Products</h1>
        <div className="flex gap-4">
          <button className="block w-auto cursor-pointer rounded-md border border-gray-500 p-2 transition hover:bg-gray-400/20 active:bg-gray-400/40 md:hidden">
            Reset
          </button>
          <button className="flex cursor-pointer items-center gap-2 rounded-md bg-blue-700 p-2 text-xl text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-500 active:scale-95 active:bg-blue-500/50">
            <Image
              src="/admin_icons/plus.svg"
              alt="Add Product"
              width={50}
              height={50}
              className="w-5"
            />
            <span className="text-sm">Add Product</span>
          </button>
        </div>
      </div>
      {/* Filter section */}
      <div className="mt-5 flex gap-4">
        {/* Categories filter */}
        <select
          value={categories}
          onChange={(e) => dispatch(setCategories(e.target.value))}
          className="w-full rounded-md border border-gray-500 p-2"
        >
          <option value="">Category</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="groceries">Groceries</option>
          <option value="books">Books</option>
          <option value="home">Home</option>
          <option value="beauty">Beauty</option>
          <option value="toys">Toys</option>
          <option value="sports">Sports</option>
          <option value="outdoors">Outdoors</option>
          <option value="other">Other</option>
        </select>

        {/* Status filter */}
        <select
          value={status}
          onChange={(e) => dispatch(setStatus(e.target.value))}
          className="w-full rounded-md border border-gray-500 p-2"
        >
          <option value="">Status</option>
          <option value="in_stock">In Stock</option>
          <option value="out_of_stock">Out of Stock</option>
          <option value="low_stock">Low Stock</option>
        </select>

        {/* Sort by filter */}
        <select
          value={sortByPrice}
          onChange={(e) => dispatch(setSortByPrice(e.target.value))}
          className="w-full rounded-md border border-gray-500 p-2"
        >
          <option value="">Sort by price</option>
          <option value="price_low_high">Price: Low to High</option>
          <option value="price_high_low">Price: High to Low</option>
        </select>

        <button
          onClick={resetFilters}
          className="hidden w-40 cursor-pointer rounded-md border border-gray-500 p-2 transition hover:bg-gray-400/20 active:bg-gray-400/40 md:block"
        >
          Reset
        </button>
      </div>
      {/* Products list table section */}
      <div className="no-scrollbar mt-5 w-full overflow-x-scroll overflow-y-scroll rounded-lg border border-gray-400">
        <table className="w-full md:w-full">
          {/* Head  */}
          <thead className="">
            <tr className="flex items-center justify-between gap-2 rounded-tl-lg rounded-tr-lg bg-[#282834] px-2 py-3 text-base">
              <th className="ml-5 w-80 text-left">Product</th>
              <th className="mr-5 w-32 text-center">Price</th>
              <th className="mr-5 w-32 text-center">Stock</th>
              <th className="mr-5 w-32 text-center">Status</th>
              <th className="mr-5 w-32 text-center">Actions</th>
            </tr>
          </thead>
          {/* All products detail */}
          <tbody>
            {/* Map all products to display */}
            {filteredProducts.map((products, index) => (
              <tr
                key={products.id}
                className={`${index % 2 === 0 ? "" : "bg-[#282834]"} flex items-center justify-between gap-2 border-t border-gray-400 px-2 py-3 text-base`}
              >
                {/* Selection Box */}
                <td>
                  <input
                    type="checkbox"
                    className="h-5 w-5 cursor-pointer appearance-none rounded-xs border border-white/20 bg-[#1d1d35] px-2 transition-all checked:bg-gray-400/40"
                  />
                </td>
                {/* Products Image & Products Name */}
                <td className="w-80 text-left">
                  <div className="flex items-center gap-4">
                    {/* Products Image */}
                    <Image
                      src={products.image}
                      alt="Products Icon"
                      width={50}
                      height={50}
                      className="h-11.5 w-11.5 rounded-md bg-gray-400/30 object-cover p-1 sm:w-10"
                    />
                    {/* Products Name */}
                    <span className="text-sm font-semibold sm:text-base">
                      {products.name}
                    </span>
                  </div>
                </td>
                {/* Products Price */}
                <td className="w-32 text-center">
                  <span className="font-mono text-sm sm:text-base">
                    ₹ {products.price}
                  </span>
                </td>
                {/* Products Stock */}
                <td className="w-32 text-center">
                  <span className="text-sm sm:text-base">{products.stock}</span>
                </td>
                {/* Products Stock Status */}
                <td className="w-32 text-center">
                  <span
                    className={`rounded-sm px-3 py-1 text-sm ${
                      Number(products.stock) === 0
                        ? "bg-gray-500/50 text-gray-300"
                        : Number(products.stock) < 10
                          ? "bg-red-900 text-red-300"
                          : Number(products.stock) >= 10
                            ? "bg-green-900 text-green-300"
                            : ""
                    }`}
                  >
                    {Number(products.stock) === 0
                      ? "Out of Stock"
                      : Number(products.stock) < 10
                        ? "Low Stock"
                        : Number(products.stock) >= 10
                          ? "In Stock"
                          : ""}
                  </span>
                </td>
                {/* Products Actions (Edit & Delete) */}
                <td className="w-48">
                  <div className="flex items-center justify-center gap-2">
                    <button className="flex w-max cursor-pointer gap-2 rounded-sm border border-gray-400 p-2 transition-all hover:bg-white/20">
                      <Image
                        src="/admin_icons/pencil.svg"
                        alt="Edit"
                        width={50}
                        height={50}
                        className="w-4"
                      />
                      <span className="text-sm">Edit</span>
                    </button>
                    <button className="flex w-max cursor-pointer gap-2 rounded-sm border border-gray-400 bg-gray-500/10 p-2 transition-all hover:bg-white/20">
                      <Image
                        src="/admin_icons/delete.svg"
                        alt="Delete"
                        width={50}
                        height={50}
                        className="w-4"
                      />
                      <span className="text-sm text-[#FF4848]">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
