import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

if (
  !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
  !process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET
) {
  throw new Error("Razorpay key_id and key_secret are required");
}

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET as string,
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
