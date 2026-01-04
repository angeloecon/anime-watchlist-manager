const DashboardPagination = ({pagination}) => {
  return (
    <>
      {pagination.hasData && (
        <div className="mt-4 px-4 py-3 border-t border-gray-200 dark:border-gray-400 bg-gray-50 flex items-center justify-between dark:bg-gray-600">
          <button
            onClick={pagination.prevPage}
            disabled={pagination.currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700  bg-white  dark:bg-gray-300 dark:hover:bg-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="text-sm text-gray-700 dark:text-gray-200">
            Page <span className="font-bold">{pagination.currentPage}</span> of{" "}
            {pagination.totalPages}
          </span>

          <button
            onClick={pagination.nextPage}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white dark:bg-gray-300 hover:bg-gray-50 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default DashboardPagination;
