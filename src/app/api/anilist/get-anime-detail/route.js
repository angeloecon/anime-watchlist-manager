import { NextResponse } from "next/server";
import { fetchAniList } from "@/lib/anilist";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Id must be provided" },
      { status: 400 }
    );
  }

  const query = `
    query($id: Int){
      Media(id: $id, type: ANIME) {
        id
        title{
          english
          romaji
          native
        }

        coverImage{
          extraLarge
          large
          color
        }

        studios (isMain: true){
          nodes {
            name
          }
        }
        characters(sort: ROLE, perPage: 6) {
          edges{ 
            role
            node {
              name { full }
              image { medium }
            }
          }
        }

        trailer { id, site }

        startDate { year month day }

        description
        bannerImage
        averageScore
        episodes
        status
        genres
        season
        seasonYear
        type
        source
      }
    }
  `;

  try {
    const variables = { 
      id: parseInt(id) 
    };
    const data = await fetchAniList(query, variables);
    return NextResponse.json({data: data.Media}, {status: 200});

  } catch (err) {
    console.error("Failed to fetch anime details", err);
    return NextResponse.json({ err: err.message}, {status:500 })
  }
}
