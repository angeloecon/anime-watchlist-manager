"use client";
import { useState, useEffect } from "react";

import TopTrendingCards from "../Cards/TopTrendingCards";
import Link from "next/link";

const topTrending = ({ topTrending }) => {
  const [bannerImage, setBannerImage] = useState(null);

  useEffect(() => {
    if (topTrending.length > 0) {
      setBannerImage(
        `url(${
          topTrending[0].bannerImage
            ? topTrending[0].bannerImage
            : topTrending[0].coverImage.large
        })`
      );
    }
  }, [topTrending]);
  
  return (
    <section className="relative w-full py-24 overflow-hidden">
      <div
        className="absolute inset-0 z-0 transition-all duration-700 ease-in-out transform scale-105"
        style={{
          backgroundImage: bannerImage,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
        }}
      />

      <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 dark:from-gray-900 to-transparent z-10" />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent z-10" />

      {/* // TRENDING - CONTENT LAYER --- */}

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10 border-b border-white/20 pb-4">
          <div>
            <h2 className="text-4xl font-extrabold text-white drop-shadow-md">
              Trending Now
            </h2>
            <p className="text-gray-200 text-sm mt-1">
              Buzzing in the community
            </p>
          </div>

          <Link
            href="/browse/trending"
            prefetch={false}
            className="px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-sm font-bold transition-all hover:scale-105"
          >
            Explore Trending
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-5">
          {topTrending.map((anime) => (
            <Link
              key={anime.id}
              href={`/anime-detail/${anime.id}`}
              className="group relative block"
              onMouseEnter={() =>
                setBannerImage(
                  `url(${
                    anime.bannerImage
                      ? anime.bannerImage
                      : anime.coverImage.extraLarge
                  })`
                )
              }
            >
              <TopTrendingCards
                image={anime.coverImage?.extraLarge || anime.coverImage?.large}
                title={
                  anime.title.english ||
                  anime.title.romaji ||
                  anime.title.native
                }
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default topTrending;
