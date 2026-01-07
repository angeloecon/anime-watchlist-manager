import { AllTimeTopAnime, AllTimePopular, TopTrending, UpcomingAnime } from '@/components/Home'
import { GET_ANIME_QUERY } from "../lib/queries";
import { getClient } from "../../ApolloClient";
import getNextSeason from "@/utils/getNextSeason";



export default async function Home() {
  const {season, seasonYear} = getNextSeason();
  const { data } = await getClient().query({
    query: GET_ANIME_QUERY,
    variables: {
      season: season,
      seasonYear: seasonYear
    },
    context: {
        fetchOptions: { next: { revalidate: 3600 } }
      }
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <AllTimeTopAnime data={data.allTimeTopAnime.media} />
      <AllTimePopular allTimePopular={data.allTimePopular.media}/>
      <TopTrending topTrending={data.topTrending.media}/>
      <UpcomingAnime upcomingAnime={data.upcomingAnime.media} />
    </main>
  );
}
