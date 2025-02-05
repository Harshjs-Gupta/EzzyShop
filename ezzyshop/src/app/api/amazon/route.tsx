// // app/api/amazon/route.js
import { NextResponse } from "next/server";
import amazon from "amazon-buddy";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("searchTerm");

  // Ensure a search term is provided
  if (!searchTerm) {
    return NextResponse.json(
      { error: "Please provide a search term." },
      { status: 400 },
    );
  }

  try {
    // Perform the Amazon search with amazon-buddy
    const result = await amazon.products({
      keyword: searchTerm,
      number: 50,
      country: "IN",
    });

    // Send the search result as a JSON response
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching Amazon data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Amazon." },
      { status: 500 },
    );
  }
}
