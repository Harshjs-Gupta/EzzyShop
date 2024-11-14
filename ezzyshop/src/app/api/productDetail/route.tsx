import { NextResponse } from "next/server";
import amazon from "amazon-buddy";

// This is your route handler for the API endpoint.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchID = searchParams.get("searchID");

  // Debugging: Log the searchID to ensure it's coming through correctly
  console.log("Search ID:", searchID);

  // Ensure a search term (ASIN) is provided
  if (!searchID) {
    return NextResponse.json(
      { error: "Please provide a search term." },
      { status: 400 },
    );
  }

  try {
    // Fetch product details using the amazon-buddy library
    const productDetails = await amazon.asin({ asin: searchID, country: "IN" });
    return NextResponse.json(productDetails);
  } catch (error) {
    console.error("Error fetching Amazon data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Amazon." },
      { status: 500 },
    );
  }
}
