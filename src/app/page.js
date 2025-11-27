"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingAnimation from "./components/LoadingAnim/loadingIndicator";
import ParallaxCard from "./components/Card/ParallaxCard/ParallaxCard";
import Carousel from "./components/Carousel/HeroCarousel/Carousel";
import SwiperCard from "./components/Carousel/SwiperCarousel/SwiperCard"
import { useJikan } from '@/hooks/useAnime'

export default function HomePage() {

  const { data: topAnime, loading, topLoading} = useJikan('/top-anime', 0);
  
  
  // top anime
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // season anime
  const [seasonAnimeList, setSeasonAnimeList] = useState([]);
  const [isSeasonLoading, setIsSeasonLoading] = useState(true);

  const [page, setPage] = useState(1);

  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (err) {
        console.warn(`Fetch failed (attempt ${i + 1}/${retries}): ${err.message}`);
        if (i < retries - 1) {
          await new Promise((r) => setTimeout(r, delay));  
        } else {
          throw err;  
        }
      }
    }
  };

  // --------------------------------------------
  const fetchAnime = async (pageNumber = 1) => {
    setIsLoading(true);
    try {
      const data = await fetchWithRetry(`/api/jikan/top-anime?page=${pageNumber}`);

      if (Array.isArray(data)) {
        setAnimeList(data);
      } else {
        setAnimeList([]);
      }
    } catch (error) {
      console.error("Top Anime Fetch Error:", error);
      setAnimeList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSeasonAnime = async () => {
    setIsSeasonLoading(true); 
    try {

      const data = await fetchWithRetry(`/api/jikan/seasonal-anime`);

      if (Array.isArray(data)) {
        setSeasonAnimeList(data);
      } else {
        setSeasonAnimeList([]);
      }
    } catch (error) {
      console.error("Seasonal Anime Fetch Error:", error);
      setSeasonAnimeList([]);
    } finally {
      setIsSeasonLoading(false);
    }
  };

 
  const handleRetry = () => {
    fetchAnime(page);
    fetchSeasonAnime();
  };

  useEffect(() => {
    fetchAnime(1);
    fetchSeasonAnime();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setPage(newPage);
    fetchAnime(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-gray-50 ">
 
      {!isSeasonLoading && seasonAnimeList.length === 0 ? (
        <div className="text-center py-10 bg-red-50 border-b border-red-100">
          <p className="text-red-500">Failed to Load Seasonal Anime.</p>
          <button
            onClick={fetchSeasonAnime}  
            className="mt-2 px-4 py-1 bg-white border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        page < 2 && (
          <Carousel data={seasonAnimeList} isLoading={isSeasonLoading} />
        )
      )}

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <SwiperCard animeList={seasonAnimeList} />
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900">
            🔥 Top Trending Anime
          </h1>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-xl text-gray-500">
            <LoadingAnimation size={200} />
            <p className="mt-4 text-sm text-gray-400 animate-pulse">Loading anime...</p>
          </div>
        ) : topAnime.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">Oops! Could not load the top anime.</p>
            <button
              onClick={handleRetry} 
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8 justify-items-center">
              {topAnime.map((anime, index) => (
                <Link key={index} href={`/anime-detail?id=${anime.mal_id}`}>
                  <ParallaxCard
                    title={anime.title}
                    content={anime.title_japanese || anime.title_english || ""}
                    image={anime.images.jpg.large_image_url}
                  ></ParallaxCard>
                </Link>
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 pb-8">
              {page - 1 > 0 && (
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {page - 1}
                </button>
              )}

              <span className="px-4 py-2 bg-blue-600 border border-gray-300 rounded-md text-white hover:bg-blue-700 font-medium">
                {page}
              </span>

              {animeList.length === 25 && (
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={animeList.length === 0}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 font-medium"
                >
                  {page + 1}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}