import Link from "next/link";
import { useState } from "react";
import { CalendarIcon, CheckIcon, DeleteIcon, EditIcon } from "../Icons";
import { deleteAnimeProgress, updateAnimeProgress } from "@/lib/watchlist";

const DashboardCard = ({ userId, item }) => {
  const [isDeleting, setIsDeleting] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [saving, setSaving ] = useState(false)
  
  const handleDeleteClick = async () => {
    if (!confirm("Are you sure to remove this anime?")) return;
      setIsDeleting(true);
    try {
      await deleteAnimeProgress(userId, item.id);
    } catch (err) {
      console.error(err)
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateClick = async () => {
    setSaving(true)
    try {
      await updateAnimeProgress(userId, item.id,  { status: newStatus })
    } catch (err) {
      console.error(err)
    } finally {
      setEditingId(null);
      setSaving(false)
    }
  }

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setNewStatus(item.status || "Plan to Watch");
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setNewStatus("");
  };

  return (
    <li className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
      <div
        className="absolute inset-0 opacity-50 dark:opacity-40 transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url(${item.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
        }}
      />

      <div className="relative z-10 p-4 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex-grow min-w-0">
          <Link href={`/anime-detail/${item.id}`}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
              {item.title}
            </h3>
          </Link>

          {editingId === item.id ? (
            <div className="mt-2 animate-fadeIn">
              <div className="relative w-full sm:w-auto">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full sm:w-auto px-4 py-1.5 pr-8 border border-blue-500 bg-blue-50 dark:bg-black/20 text-blue-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-medium cursor-pointer"
                >
                  <option value="Plan to Watch">Plan to Watch</option>
                  <option value="Watching">Watching</option>
                  <option value="Completed">Completed</option>
                  <option value="Dropped">Dropped</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  item.status === "Completed"
                    ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
                    : item.status === "Watching"
                    ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                    : item.status === "Dropped"
                    ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
                    : "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                }`}
              >
                {item.status || "Not Set"}
              </span>
            </div>
          )}
          <div className="mt-2 flex items-center gap-1.5 text-xs text-black dark:text-white font-medium">
            <CalendarIcon className="w-3.5 h-3.5 opacity-70" />
            <span>
              Added{" "}
              {item.addedAt
                ? new Date(item.addedAt.seconds * 1000).toLocaleDateString()
                : "Unknown Date"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-end sm:justify-start">
          {editingId === item.id ? (
            <>
              <button
                onClick={() => handleUpdateClick()}
                disabled={saving}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white rounded-lg shadow hover:shadow-md transition-all active:scale-95 
                  ${saving? "disabled:bg-gray-400 text-gray-300 animate-pulse disabled:cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
              >
                <CheckIcon />
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 transition-all active:scale-95"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleEditClick(item)}
                className="p-2 text-black dark:text-white hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors"
                title="Edit Status"
              >
                <EditIcon />
              </button>
              <button
                onClick={() => handleDeleteClick()}
                disabled={isDeleting === item.tracking_id}
                className="p-2 text-black dark:text-white hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors disabled:opacity-30"
                title="Delete Entry"
              >
                <DeleteIcon />
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default DashboardCard;
