import DashboardCard from "../Cards/DashboardCard";

const DashboardItems = ({items, userId, filteredStatus}) => {
  if (!items || items.length === 0) {
    return (
      <p className="p-8 text-center text-gray-500 dark:text-gray-200">
        {filteredStatus === "All"
          ? "Your list is empty."
          : `No '${filteredStatus}' anime found.`}
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <DashboardCard key={item.id} item={item} userId={userId} />
      ))}
    </ul>
  );
};

export default DashboardItems;
