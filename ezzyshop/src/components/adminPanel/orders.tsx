import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomerName,
  setOrderDate,
  setSortByFreshness,
  setStatus,
} from "@/redux/features/orderFilter";
import { RootState } from "@/redux/store";

interface Orders {
  orderId: number;
  customerName: string;
  productName: string;
  orderedDate: number | string;
  orderStatus: string;
}

const ordersData: Orders[] = [
  {
    orderId: 1256,
    customerName: "Harsh Gupta",
    productName: "Jordan 1 Retro High",
    orderedDate: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    orderStatus: "processing",
  },
  {
    orderId: 1284,
    customerName: "John Doe",
    productName: "Apple Watch Series 7",
    orderedDate: "May 10, 2026",
    orderStatus: "completed",
  },
  {
    orderId: 1247,
    customerName: "Emily Brown",
    productName: "AirPods Pro",
    orderedDate: "May 08, 2026",
    orderStatus: "shipped",
  },
  {
    orderId: 1204,
    customerName: "David Smith",
    productName: "Beardo Mariner Perfume",
    orderedDate: "Apr 27, 2026",
    orderStatus: "completed",
  },
  {
    orderId: 1298,
    customerName: "Sarah Lee",
    productName: "iPhone 14 Pro Max",
    orderedDate: "Apr 14, 2026",
    orderStatus: "pending",
  },
  {
    orderId: 1223,
    customerName: "Michael De Santa",
    productName: "Samsung 4K OLED TV",
    orderedDate: "Mar 26, 2026",
    orderStatus: "cancelled",
  },
  {
    orderId: 1209,
    customerName: "Travor Philips",
    productName: "Logitech MX Master 3S",
    orderedDate: "Mar 10, 2026",
    orderStatus: "processing",
  },
  {
    orderId: 1292,
    customerName: "Franklin Clinton",
    productName: "LED Ceiling Light",
    orderedDate: "Feb 05, 2026",
    orderStatus: "completed",
  },
];

export default function Orders() {
  const dispatch = useDispatch();
  const [customerNameInput, setCustomerNameInput] = useState("");
  const { filterByCustomerName, status, filteredDate, sortByFreshness } =
    useSelector((state: RootState) => state.orderFilters);

  // INFO: Customer name filter function with debounce
  useEffect(() => {
    function nameInput() {
      dispatch(setCustomerName(customerNameInput));
    }
    const timeoutId = setTimeout(nameInput, 300);
    // console.log(customerName);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [customerNameInput, dispatch]);

  // INFO: Filter orders based on customer name, status, date, and freshness
  const filteredOrders = useMemo(() => {
    return ordersData.filter((order) => {
      //!  Filter by customer name
      const customerMatch = order.customerName
        .toLowerCase()
        .includes(filterByCustomerName.toLowerCase());

      // ! Filter by status
      const statusMatch = status === "" || order.orderStatus === status;
      // ! Filter by date
      let filteredOrderedDate = true;

      switch (filteredDate) {
        case "":
          filteredOrderedDate = true;
          break;
        case "7":
          filteredOrderedDate =
            new Date(order.orderedDate).getTime() >=
            new Date().setDate(new Date().getDate() - 7);
          break;
        case "30":
          filteredOrderedDate =
            new Date(order.orderedDate).getTime() >=
            new Date().setDate(new Date().getDate() - 30);
          break;
        case "60":
          filteredOrderedDate =
            new Date(order.orderedDate).getTime() >=
            new Date().setDate(new Date().getDate() - 60);
          break;
        case "90":
          filteredOrderedDate =
            new Date(order.orderedDate).getTime() >=
            new Date().setDate(new Date().getDate() - 90);
          break;
        case "120":
          filteredOrderedDate =
            new Date(order.orderedDate).getTime() >=
            new Date().setDate(new Date().getDate() - 120);
          break;
      }

      // ! Sorted by newest and oldest
      let sortedByFreshnessMatch = true;

      switch (sortByFreshness) {
        case "":
          sortedByFreshnessMatch = true;
          break;
        case "newest":
          sortedByFreshnessMatch =
            new Date(order.orderedDate).getTime() >=
            new Date().setDate(new Date().getDate() - 14);
          break;
        case "oldest":
          const orderTime = new Date(order.orderedDate).getTime();

          const twoWeeksAgo = new Date().setDate(new Date().getDate() - 14);

          const fourMonthsAgo = new Date().setDate(new Date().getDate() - 120);

          sortedByFreshnessMatch =
            orderTime >= fourMonthsAgo && orderTime < twoWeeksAgo;
          break;
        default:
          sortedByFreshnessMatch = true;
      }

      return (
        customerMatch &&
        statusMatch &&
        filteredOrderedDate &&
        sortedByFreshnessMatch
      );
    });
  }, [filterByCustomerName, status, filteredDate, sortByFreshness]);

  // INFO: Reset all filters
  function resetAllFilters() {
    dispatch(setCustomerName(""));
    dispatch(setOrderDate(""));
    dispatch(setStatus(""));
    dispatch(setSortByFreshness(""));
  }

  return (
    <section className="flex h-full w-full flex-col px-4 text-[#A9ACB8] md:px-6">
      {/* INFO: Top section  */}
      <div className="mt-3 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold md:text-4xl">Orders</h1>
        <button
          onClick={resetAllFilters}
          className="w-30 cursor-pointer rounded-md border border-gray-500 p-2 transition hover:bg-gray-400/20 active:bg-gray-400/40"
        >
          Reset
        </button>
      </div>
      {/* INFO: Filter section */}
      <div className="mt-5 flex gap-4">
        {/* Filter by customer name */}
        <div className="flex w-full items-center gap-2 rounded-md border border-gray-500 p-2">
          <Image
            src="/admin_icons/search.svg"
            alt="Search"
            width={24}
            height={24}
            className="size-5"
          />
          <input
            value={customerNameInput}
            onChange={(e) => setCustomerNameInput(e.target.value)}
            type="text"
            placeholder="Search customer name..."
            className="outline-none"
          />
        </div>

        {/* INFO: Filter by date */}
        <select
          value={filteredDate}
          onChange={(e) => dispatch(setOrderDate(e.target.value))}
          className="w-full rounded-md border border-gray-500 p-2"
        >
          <option value="">Date</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="60">Last 60 days</option>
          <option value="90">Last 90 days</option>
          <option value="120">Last 120 days</option>
        </select>

        {/* INFO: Filter by status */}
        <select
          value={status}
          onChange={(e) => dispatch(setStatus(e.target.value))}
          className="w-full rounded-md border border-gray-500 p-2"
        >
          <option value="">Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* INFO: Filter by order freshness */}
        <select
          value={sortByFreshness}
          onChange={(e) => dispatch(setSortByFreshness(e.target.value))}
          className="w-full rounded-md border border-gray-500 p-2"
        >
          <option value="">Sort by</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      {/* INFO: Orders detail list table */}
      {/*  Main section */}
      <div className="no-scrollbar mt-5 w-full overflow-x-scroll overflow-y-scroll rounded-lg border border-gray-400 md:overflow-x-hidden">
        <table className="w-full md:w-full">
          {/* Head  */}
          <thead>
            <tr className="flex items-center justify-between gap-2 rounded-tl-lg rounded-tr-lg bg-[#282834] px-2 py-3 text-base">
              <th className="w-30 text-center md:w-full">OrderID</th>
              <th className="w-30 text-center md:w-full">Customer</th>
              <th className="w-30 text-center md:w-full">Product Name</th>
              <th className="w-30 text-center md:w-full">Date</th>
              <th className="w-30 text-center md:w-full">Status</th>
              <th className="w-30 text-center md:w-full">Action</th>
            </tr>
          </thead>
          {/* All products detail */}
          <tbody className="">
            {/* Map all products to display */}
            {filteredOrders.map((order, index) => (
              <tr
                key={order.orderId}
                className={`${index % 2 === 0 ? "" : "bg-[#282834]"} flex items-center justify-between gap-2 border-t border-gray-400 px-2 py-3 text-base`}
              >
                {/* Order Id */}
                <td className="w-full text-center">
                  <span className="text-sm font-semibold md:text-base">
                    # {order.orderId}
                  </span>
                </td>
                {/* Customer Name */}
                <td className="w-full text-center">
                  <span className="text-sm font-semibold md:text-base">
                    {order.customerName}
                  </span>
                </td>
                {/* Products Name */}
                <td className="w-full text-center">
                  <span className="text-sm font-semibold capitalize md:text-base">
                    {order.productName}
                  </span>
                </td>
                {/* Products Date */}
                <td className="w-full text-center">
                  <span className="text-sm md:text-base">
                    {order.orderedDate}
                  </span>
                </td>
                {/* Products Status */}
                <td className="w-full text-center">
                  <span
                    className={`rounded-sm px-3 py-1 text-sm capitalize ${
                      order.orderStatus === "completed"
                        ? "bg-green-900 text-green-300"
                        : order.orderStatus === "cancelled"
                          ? "bg-red-900 text-red-300"
                          : order.orderStatus === "pending"
                            ? "bg-gray-700 text-gray-300"
                            : order.orderStatus === "processing"
                              ? "bg-yellow-700 text-yellow-300"
                              : order.orderStatus === "shipped"
                                ? "bg-blue-900 text-blue-300"
                                : ""
                    }`}
                  >
                    {order.orderStatus === "completed"
                      ? "completed"
                      : order.orderStatus === "cancelled"
                        ? "cancelled"
                        : order.orderStatus === "pending"
                          ? "pending"
                          : order.orderStatus === "processing"
                            ? "processing"
                            : order.orderStatus === "shipped"
                              ? "shipped"
                              : ""}
                  </span>
                </td>
                {/* Order Actions (Edit & Delete) */}
                <td className="flex w-full items-center gap-3 text-center">
                  <button className="flex w-max cursor-pointer gap-2 rounded-sm border border-gray-400 p-2 transition-all hover:bg-white/20">
                    <Image
                      src="/admin_icons/pencil.svg"
                      alt="Edit"
                      width={50}
                      height={50}
                      className="w-3 md:w-4"
                    />
                    <span className="text-xs md:text-sm">Edit</span>
                  </button>
                  <button className="flex w-max cursor-pointer gap-2 rounded-sm border border-gray-400 p-2 transition-all hover:bg-white/20">
                    <Image
                      src="/admin_icons/eye.svg"
                      alt="View"
                      width={50}
                      height={50}
                      className="w-3 md:w-4"
                    />
                    <span className="text-xs md:text-sm">View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
