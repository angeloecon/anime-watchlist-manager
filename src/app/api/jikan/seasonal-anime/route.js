import { NextResponse } from "next/server";

export async function GET(request) {
  const {searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  const JIKAN_URL = `https://api.jikan.moe/v4/seasons/now?page=${page}`;

  try {
    const response = await fetch(JIKAN_URL, {
      cache: "no-store",
    });

    if(!response.ok) {
      throw new Error("Failed to fetch data from Jikan API");
    }

    const data = await response.json();
    return NextResponse.json(data.data, { status: 200 });
  } catch (error) {
    console.error("Jikan API Error:", error);
    return NextResponse.json({ message: "External API Error" }, { status: 500 });
  }
}