import { getClient } from "../../../ApolloClient";
import { SEARCH_QUERY } from "@/lib/queries";
import { Suspense } from "react";

import AllSectionHeader from "@/components/UI/AllSectionHeader";
import GridLayout from "@/components/Layout/GridCardLayout";
import LoadingState from "@/components/UI/LoadingState";
import Pagination from "@/components/UI/Pagination";

export const generateMetadata = async({ searchParams }) => {
  const query = await searchParams?.q;

  if (query) {
    return {
      title: `Search results for "${query}"`,
      description: `Browse anime matching "${query}" on AniMain.`,
    };
  }

  return {
    title: "Search Anime",
    description: "Find your next favorite anime from our massive library.",
  };
}

const page = async ({ searchParams }) => {
  const resolveParams = await searchParams;
  const query = resolveParams?.q || "";
  const page = parseInt(resolveParams?.page || "1", 10);

  return (
    <Suspense fallback={<LoadingState />}>
      <SearchResult query={query} page={page} />
    </Suspense>
  );
};

const SearchResult = async ({ query, page }) => {
  if (!query)
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-50 dark:bg-black transition-colors duration-300">
        <p className="text-black dark:text-white">
          Please enter a <strong>query</strong>.
        </p>
      </div>
    );

  const { data } = await getClient().query({
    query: SEARCH_QUERY,
    variables: { search: query, page: page },
  });

  const animeResults = data?.Page?.media || [];
  const pageInfo = data?.Page?.pageInfo;

  if (animeResults.length === 0)
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-50 dark:bg-black transition-colors duration-300">
        <p className="text-black dark:text-white">No result found.</p>
      </div>
    );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <AllSectionHeader message={`Result for "${query}"`} />
        <GridLayout anime={animeResults} />
        <Pagination pageInfo={pageInfo} />
      </div>
    </main>
  );
};

export default page;
