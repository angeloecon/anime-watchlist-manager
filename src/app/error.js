"use client";
import { HomeIcon } from "@/components/Icons";

import LOTTIE_URL from "../../public/animations/manheraresize.json";
import Lottie from "lottie-react";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white px-4">
      
      <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mb-8">
        <Lottie animationData={LOTTIE_URL} loop={true} autoplay={true} />
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-widest text-center text-red-600 dark:text-red-500 mb-2 font-anime">
        SYSTEM ERROR
      </h1>

      <p className="text-lg sm:text-sm text-gray-600 dark:text-gray-400 mb-10 text-center max-w-md">
        Oops! Something went wrong.
      </p>

      <Link 
        href="/" 
        className="
          flex items-center gap-3 
          px-4 py-3 
          rounded-xl 
          font-bold text-white 
          bg-blue-600 hover:bg-blue-700 
          dark:bg-red-600 dark:hover:bg-red-700
          transition-all duration-300
          shadow-md hover:shadow-lg
          hover:-translate-y-1 
        "
      >
        <HomeIcon/>
        <span>Return to Safety</span>
      </Link>

    </div>
  );
};

export default NotFoundPage;