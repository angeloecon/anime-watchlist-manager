"use client";
import { useParams } from "next/navigation";
import { useAnimeDetail } from "@/hooks/useAnime";
import { useAuth } from "@/context/authcontext";
import { useState, useEffect } from "react";
import LoadingAnimation from "../../../components/LoadingAnim/loadingIndicator";

import Link from "next/link";
import ReactPlayer from "react-player";

export default function AnimeDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const animeId = params.id;
  const { anime, isLoading, error } = useAnimeDetail(animeId);

  const [addStatus, setAddStatus] = useState(null);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  });

  useEffect(() => {
    if (isClient && user) {
      isAddedAlready();
    }
  }, [animeId, isClient, user]);

  // Too fast to render/cannot find the userId

  const isAddedAlready = async () => {
    try {
      const response = await fetch(
        `/api/watchlist/view?user_id=${user.userId}`
      );

      if (!response.ok) {
        console.error("Failed to fetch watchlist data");
        console.log("Failed to fetch watchlist data", response.status);
        throw new Error("Failed to fetch watchlist data", response.status);
      }

      const data = await response.json();
      for (const item of data) {
        if (item.anime_id == params.id) {
          setAlreadyAdded(true);
          break;
        }
      }
    } catch (err) {
      console.error("Error: Failed to retrieve Data", err.message);
      console.log("Error: Failed to retrieve Data", err.message);
    }
  };

  const handleAddToWatchlist = async () => {
    setAlreadyAdded(true);

    try {
      const response = await fetch("/api/watchlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.userId,
          anime_id: anime.id,
          anime_title: anime.title.english || anime.title.romaji,
          status: "Plan to Watch",
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to add");
      setAddStatus("✅ Added to Watchlist!");
    } catch (err) {
      console.error(err.message);
    }
  };

  if (isLoading && !user)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <LoadingAnimation size={200} />
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        Error: {error}
      </div>
    );
  if (!anime) return null;

  return (
    <div className="min-h-screen dark:bg-black bg-gray-50 text-white pb-20 transition-colors duration-300">
      {/* Banner - Image - Big Image --------------------------------*/}

      <div
        className="h-[40vh] w-full bg-cover bg-center relative mask-gradient"
        style={{
          backgroundImage: `url(${
            anime.bannerImage || anime.coverImage.extraLarge
          })`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/50 dark:from-black dark:via-black/50 to-transparent" />
      </div>

      {/* Content Container/Area ------------------------------------*/}

      <div className="container mx-auto px-6 -mt-32 relative z-10 ">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <img
              src={anime.coverImage?.extraLarge || anime.coverImage?.large}
              alt={anime.title?.english}
              className="w-64 rounded-lg mb-6 shadow-2xl border-4 border-gray-900 dark:border-gray-200"
            />
            <button
              onClick={handleAddToWatchlist}
              disabled={!user || addStatus === "Adding..." || alreadyAdded}
              className="w-full max-w-xs py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {addStatus === "Adding..."
                ? "Adding..."
                : alreadyAdded
                ? "Added to Watchlist"
                : "Add to Watchlist"}
            </button>

            {!user && (
              <p className="text-sm text-red-500 mt-2 text-center">
                You must be{" "}
                <Link href="/login" className="font-semibold hover:underline">
                  logged in
                </Link>{" "}
                to add anime.
              </p>
            )}
          </div>

          <div className="flex-grow pt-8 md:pt-32 ">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white ">
              {anime.title.english || anime.title.romaji}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6">
              <span className="bg-green-600 px-3 py-1 rounded font-bold">
                {anime.averageScore ? `${anime.averageScore}% Score` : "No Score"}
              </span>
              <span className="bg-gray-800 px-3 py-1 rounded capitalize">
                {anime.season} {anime.seasonYear}
              </span>
              <span className="bg-gray-800 px-3 py-1 rounded capitalize">
                {anime.status.replaceAll("_", " ")}
              </span>
            </div>

            <div
              className="text-gray-900 dark:text-gray-100 leading-relaxed mb-8 max-w-3xl"
              dangerouslySetInnerHTML={{ __html: anime.description }}
            />

            <div className="flex flex-wrap gap-2">
              {anime.genres.map((g) => (
                <span
                  key={g}
                  className={`text-sm border dark:border-gray-200 border-gray-700 px-3 py-1 rounded-full text-gray-200`}
                  style={{ backgroundColor: anime.coverImage.color }}
                >
                  {g}
                </span>
              ))}
            </div>


            {/* Trailer Container/Area ------------------*/}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Trailer
              </h3>

              {!anime.trailer?.id || !anime.trailer?.site ? (
                <div className="w-full max-w-lg h-40 bg-gray-100 dark:bg-gray-800/50 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    No Trailer Available
                  </span>
                </div>
              ) : (
                <div className="w-full max-w-2xl">
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 bg-black">
                    <ReactPlayer
                      src={`https://www.youtube.com/watch?v=${anime.trailer.id}`}
                      width="100%"
                      height="100%"
                      controls={true}
                      playing={false}
                      config={{
                        youtube: {
                          playerVars: {
                            showinfo: 1,
                            origin:
                              typeof window !== "undefined"
                                ? window.location.origin
                                : undefined,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
