import { getClient } from "../../../../ApolloClient";
import { BROWSE_ANIME } from "@/lib/queries";

import AllSectionHeader from "@/components/UI/AllSectionHeader";
import GridLayout from "@/components/Layout/GridCardLayout";
import Pagination from "@/components/UI/Pagination";
import getNextSeason from "@/utils/getNextSeason";


const CATEGORY_MAP = {
  score: {
    title: "All Time Popular",
    variables: {
      sort: "POPULARITY_DESC",
      status: undefined,
    },
  },
  trending: {
    title: "Trending",
    variables: {
      sort: "TRENDING_DESC",
      status: undefined,
    },
  },
  upcoming: {
    title: "Upcoming",
    variables: {
      sort: "POPULARITY_DESC",
      status: "NOT_YET_RELEASED",
    },
  },
};

const page = async ({ params, searchParams }) => {
  const {season, seasonYear} = getNextSeason();
  const { type } = await params;
  const category = CATEGORY_MAP[type];

  const resolveParams = await searchParams;
  const page = parseInt(resolveParams?.page);

  const { data } = await getClient().query({
    query: BROWSE_ANIME,
    variables: {
      page: page,
      ...category.variables,
      ...(type === 'upcoming' && {
        season: season, 
        seasonYear: seasonYear}
      )
    },
  });

  const animeResults = data?.Page?.media || [];
  const pageInfo = data?.Page?.pageInfo;

  return(
    <main className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <AllSectionHeader message={`${category.title} Anime`}/>
        <GridLayout anime={animeResults}/>
        <Pagination pageInfo={pageInfo}/>
      </div>
    </main>
  );
};

export default page;
