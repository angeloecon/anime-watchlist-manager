"use client";

import Link from "next/link";
import LoadingAnimation from "../components/LoadingAnim/loadingIndicator";
import Carousel from "../components/Carousel/HeroCarousel/Carousel";
import SwiperCard from "../components/Carousel/SwiperCarousel/SwiperCard";
import { useAniList, useJikan } from "@/hooks/useAnime";

export default function HomePage() {
  const { data: upcomingAnime, loading: upcomingAniLoading } = useJikan(
    "/seasonal-upcoming",
    200
  );
  const { data: seasonalAnime, loading: seasonLoading } = useJikan(
    "/seasonal-anime",
    700
  );

  const { animeList: allTimePopular, isLoading: popularLoading } = useAniList('popular');
  const { animeList: trendingData, isLoading: trendingLoading} = useAniList("trending");
  const { animeList: upcomingList, loading: upcomingLoading } = useAniList("upcoming");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-600 ">
      <Carousel data={allTimePopular} isLoading={popularLoading} />
      {/* -------------------------------- */}

      <div className="min-h-screen bg-gray-50 dark:bg-gray-600 p-8 transition-colors duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {allTimePopular.map((anime) => (
            <div
              key={anime.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform"
            >
              <div className="relative h-64">
                <img
                  src={anime.coverImage.extraLarge}
                  alt={anime.title.romaji}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 text-sm font-bold">
                  {anime.averageScore}%
                </div>
              </div>

              <div className="p-4">
                <h2 className="font-bold text-lg text-white truncate">
                  {anime.title.english || anime.title.romaji}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  {anime.episodes || "?"} Episodes • {anime.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trendingData.map((anime) => (
            <div
              key={anime.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform"
            >
              <div className="relative h-64">
                <img
                  src={anime.coverImage.extraLarge}
                  alt={anime.title.romaji}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 text-sm font-bold">
                  {anime.averageScore}%
                </div>
              </div>
              <div className="p-4">
                <h2 className="font-bold text-lg text-white truncate">
                  {anime.title.english || anime.title.romaji}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  {anime.episodes || "?"} Episodes • {anime.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Upcoming Anime
          </h2>
          {upcomingAniLoading ? (
            <div className="text-center py-20 text-xl text-gray-500 dark:text-gray-400">
              <LoadingAnimation size={200} />
              <p className="mt-4 text-sm text-gray-400 animate-pulse">
                Loading upcoming charts...
              </p>
            </div>
          ) : (
            <div className="mb-16">
              <SwiperCard data={upcomingList} />
              <div className="text-center mt-6">
                <Link
                  href="/browse/upcoming"
                  className="inline-block px-6 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  View Upcoming Anime
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
