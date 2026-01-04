import Link from "next/link";

const AllSectionHeader = ({message}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {message}
      </h1>

      <Link
        href="/"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        &larr; Back Home
      </Link>
    </div>
  );
};

export default AllSectionHeader;
