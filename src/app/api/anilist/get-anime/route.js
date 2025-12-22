import { NextResponse } from "next/server";
import { fetchAniList } from "@/lib/anilist";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const perPage = parseInt(searchParams.get("perPage")) || 10;
  const type = (searchParams.get("type") || "popular").toLowerCase();

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
  } else if(type === "score") {
    variables.sort = "SCORE_DESC";
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
          bannerImage
          type
          source
          seasonYear
          season
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
