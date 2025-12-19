import { NextResponse } from "next/server";
import { fetchAniList } from "@/lib/anilist";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const type = (searchParams.get('type') || "popular").toLowerCase();;
  const perPage = 10;

  let variables = {
    page: page,
    perPage: perPage,
    sort: "POPULARITY_DESC",
    status: undefined,
  };

  if (type === "trending") {
    variables.sort = "TRENDING_DESC";
  } else if (type === "upcoming") {
    variables.status = "NOT_YET_RELEASED";
    variables.sort = "POPULARITY_DESC"; 
  }
   
  const query = `
    query ($page: Int, $perPage: Int, $sort: [MediaSort], $status: MediaStatus){
      Page(page: $page, perPage: $perPage){
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(sort: $sort, status: $status, type: ANIME){
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
            large
            medium
            color
          }
          description
          averageScore
          episodes
          status
          genres
        }
      }
    }
  `;

  try {
    const data = await fetchAniList(query, variables);
    return NextResponse.json(
      { data: data.Page.media, pagination: data.Page.pageInfo },
      { status: 200 }
    );
  } catch (error) {
    console.error("AniList API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
