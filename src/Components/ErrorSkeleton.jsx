import React from "react";

const ErrorSkeleton = () => {
  return (
    <div className="w-3/4 h-3/4 p-4 text-red-100 text-center flex flex-col items-center justify-evenly rounded-2xl bg-red-900/10 backdrop-blur-md border border-red-400/30 shadow-xl">
      {/* Error Heading */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-3xl font-bold text-red-300">
          ⚠️ Error Loading Weather
        </div>
        <p className="text-red-200">
          Something went wrong while fetching the weather data.
        </p>
        <p className="text-red-400 text-sm">
          Please check your city name or try again later.
        </p>
      </div>

      {/* Error Icons/Visual Section */}
      <div className="flex justify-evenly items-center w-full mt-6">
        <div className="h-6 w-48 bg-red-400/30 rounded"></div>
        <div className="size-24 bg-red-400/20 rounded-full border border-red-500/40 flex items-center justify-center text-4xl text-red-300">
          ❌
        </div>
        <div className="font-mono space-y-2">
          <div className="h-4 w-36 bg-red-400/30 rounded"></div>
          <div className="h-4 w-28 bg-red-400/30 rounded"></div>
          <div className="h-4 w-24 bg-red-400/30 rounded"></div>
        </div>
      </div>

      {/* Failed Weather Details Section */}
      <div className="flex w-full items-center gap-4 justify-center mt-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 w-24">
            <div className="h-6 w-6 bg-red-400/30 rounded"></div>
            <div className="h-4 w-20 bg-red-400/30 rounded"></div>
            <div className="h-4 w-16 bg-red-400/30 rounded"></div>
          </div>
        ))}
      </div>

      {/* Forecast Error */}
      <div className="h-1/2 w-full rounded-lg p-4 mt-4">
        <div className="h-2 w-40 bg-red-400/30 rounded mb-4"></div>
        <div className="grid grid-cols-5 gap-2 h-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex gap-2 flex-col items-center justify-center bg-red-900/10 rounded-lg p-2"
            >
              <div className="h-4 w-16 bg-red-400/30 rounded"></div>
              <div className="h-3 w-14 bg-red-400/30 rounded"></div>
              <div className="size-8 bg-red-400/30 rounded-full my-1"></div>
              <div className="h-3 w-16 bg-red-400/30 rounded"></div>
              <div className="space-y-1 text-xs">
                <div className="h-3 w-14 bg-red-400/30 rounded"></div>
                <div className="h-3 w-14 bg-red-400/30 rounded"></div>
              </div>
              <div className="h-3 w-16 bg-red-400/30 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ErrorSkeleton;
