"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { addToWatchList, searchAnimeWatchlist } from "@/lib/watchlist";

import Link from "next/link";

const WatchListButton = ({ anime }) => {
  const { user, authLoading } = useAuth();
  const [isAdded, setIsAdded] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (user && user.uid) {
      checkStatus(user.uid, anime.id);
    } else {
      setCheckingStatus(false);
      setIsAdded(false);
    }
  }, [user, authLoading, anime.id]);

  const checkStatus = async (uid, animeId) => {
    setCheckingStatus(true);
    try {
      setIsAdded(await searchAnimeWatchlist(uid, animeId));
    } catch (err) {
      console.error("Failed to Check", err);
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleAddToWatchlist = async () => {
    if (!user) return;
    setCheckingStatus(true);
    try {
      await addToWatchList(user.uid, anime);
      setIsAdded(true);
    } catch (err) {
      console.error("Failed to Add", err);
    } finally {
      setCheckingStatus(false);
    }
  };

  const getButtonConfig = () => {
    if (authLoading || checkingStatus) {
      return {
        text: "Checking...",
        style: "bg-gray-600 text-gray-300 animate-pulse",
        disabled: true,
      };
    }
    if (isAdded) {
      return {
        text: "Added to Watchlist",
        style: "bg-gray-400 text-white cursor-not-allowed opacity-80",
        disabled: true,
      };
    }
    return {
      text: "Add to Watchlist",
      style:
        "bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed",
      disabled: !user,
      onClick: () => handleAddToWatchlist(),
    };
  };

  const { text, style, disabled, onClick } = getButtonConfig();

  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`w-full max-w-xs py-2 rounded-lg transition-colors ${style}`}
      >
        {text}
      </button>

      {!user && !authLoading && !checkingStatus && (
        <p className="text-sm text-red-500 mt-2 text-center">
          You must be{" "}
          <Link
            href="/login"
            prefetch={false}
            className="font-semibold hover:underline"
          >
            logged in
          </Link>{" "}
          to add anime.
        </p>
      )}
    </>
  );
};

export default WatchListButton;
