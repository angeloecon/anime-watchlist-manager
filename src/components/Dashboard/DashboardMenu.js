 const DASHBOARD_MENU = [
  "All",
  "Watching",
  "Completed",
  "Plan to Watch",
  "Dropped",
];

const DashboardMenu = ({currentFilter, onFilterChange}) => {

  return (
    <>
      {DASHBOARD_MENU.map((status) => (
        <button
          key={status}
          onClick={() => onFilterChange(status)}
          className={`mt-2 md:mt-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
            currentFilter === status
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-200 hover:bg-gray-100 border border-gray-200 dark:border-gray-900 dark:hover:bg-gray-800"
          }`}
        >
          {status}
        </button>
      ))}
    </>
  );
};

export default DashboardMenu;
