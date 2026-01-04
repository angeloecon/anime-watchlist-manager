"use client";
import LOTTIE_URL from "../../../public/animations/loadingAnimation.json";
import Lottie from "lottie-react";

const LoadingState = ({ message = "Loading...", className="" }) => {
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-600 flex justify-center flex-col items-center ${className}`}>
      <Lottie
        animationData={LOTTIE_URL}
        loop={true}
        autoplay={true}
        style={{ width: 150, height: 150 }}
      />
      <p className="mt-1 text-sm text-gray-400 animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingState;
