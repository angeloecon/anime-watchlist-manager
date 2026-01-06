import AllSectionCard from "../Cards/AllTimePopularCard";
import Link from "next/link";

const AllTimePopular = ({allTimePopular}) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-wide uppercase">
            All Time Popular
          </h2>
          <div className="h-1 w-20 bg-blue-500 rounded mt-1"></div>
        </div>
        <Link
          href="/browse/score"
          prefetch={false}
          className="text-sm font-semibold text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
        >
          View All Collection &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {allTimePopular.map((anime) => (
          <AllSectionCard
            key={anime.id}
            animeId={anime.id}
            animeImage={
              anime.coverImage?.extraLarge ||
              anime.coverImage?.large ||
              anime.coverImage?.medium
            }
            animeTitle={
              anime.title.english || anime.title.romaji || anime.title.native
            }
            animeScore={anime.averageScore}
            animeSeason={anime.season}
            animeYear={anime.seasonYear}
          />
        ))}
      </div>
    </section>
  );
};

export default AllTimePopular;
