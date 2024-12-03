import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.amazon.in", "m.media-amazon.com"],
  },
  env: {
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  },
};

export default nextConfig;
