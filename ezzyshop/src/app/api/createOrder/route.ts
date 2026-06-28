// import dotenv from "dotenv";
// dotenv.config();
import { NextRequest, NextResponse } from "next/server";

import Razorpay from "razorpay";

// if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//   throw new Error("Razorpay key_id and key_secret are required");
// }

const razorpay = new Razorpay({
  key_id: "rzp_test_SeYgID9twpQxbq",
  key_secret: "PK9Dqb0ixp8XcWY6EdiW0gjl",
});

export async function POST(req: NextRequest) {
  const { amount } = await req.json();
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "order_receipt",
  });
  return NextResponse.json(order);
}
