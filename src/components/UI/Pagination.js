"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const Pagination = ({ pageInfo }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  if (!pageInfo) return null;

  const { currentPage, hasNextPage } = pageInfo;

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 pb-8">
      {currentPage - 1 > 0 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
        >
          {currentPage - 1}
        </button>
      )}

          <span className="px-4 py-2 bg-blue-600 border border-gray-300 rounded-md text-white hover:bg-blue-700 font-medium">
        {currentPage}
      </span>

      {hasNextPage && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
        >
          {currentPage + 1}
        </button>
      )}
    </div>
  );
};

export default Pagination;
