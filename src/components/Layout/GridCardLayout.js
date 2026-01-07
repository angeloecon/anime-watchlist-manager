import ParallaxCard from "../Cards/ParallaxCard/ParallaxCard";
import Link from "next/link";

const SeachGrid = ({ anime }) => {
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center mb-6">
      {anime.map((q) => (
        <Link key={q.id} href={`/anime-detail/${q.id}`} className="w-full">
          <div className="w-full aspect-[2/3]">
            <ParallaxCard
              title={q.title?.english || q.title?.romaji || "Unknown Title"}
              content={
                q.season && q.seasonYear
                  ? q.season + " - " + q.seasonYear
                  : "TBA"
              }
              image={
                q.coverImage?.extraLarge ||
                q.coverImage?.large ||
                q.coverImage?.medium
              }
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SeachGrid;
