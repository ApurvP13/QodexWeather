import React from "react";

const DashSkeleton = () => {
  return (
    <div className="w-3/4 h-3/4 p-4 text-gray-50 text-center flex flex-col items-center justify-evenly rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl animate-pulse">
      {/* Current Weather Section */}
      <div className="flex justify-evenly items-center w-full">
        <div className="h-6 w-48 bg-gray-400/30 rounded"></div>
        <div className="size-24 bg-gray-400/30 rounded-full"></div>
        <div className="font-mono space-y-2">
          <div className="h-4 w-36 bg-gray-400/30 rounded"></div>
          <div className="h-4 w-28 bg-gray-400/30 rounded"></div>
          <div className="h-4 w-24 bg-gray-400/30 rounded"></div>
        </div>
      </div>

      {/* Current Weather Details */}
      <div className="flex w-full items-center gap-4 justify-center">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 w-24">
            <div className="h-6 w-6 bg-gray-400/30 rounded"></div>
            <div className="h-4 w-20 bg-gray-400/30 rounded"></div>
            <div className="h-4 w-16 bg-gray-400/30 rounded"></div>
          </div>
        ))}
      </div>

      {/* 5-Day Forecast Section */}
      <div className="h-1/2 w-full rounded-lg p-4">
        <div className="h-6 w-40 bg-gray-400/30 rounded mb-4"></div>
        <div className="grid grid-cols-5 gap-2 h-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex gap-2 flex-col items-center justify-center bg-white/5 rounded-lg p-2"
            >
              <div className="h-4 w-16 bg-gray-400/30 rounded"></div>
              <div className="h-3 w-14 bg-gray-400/30 rounded"></div>
              <div className="size-8 bg-gray-400/30 rounded-full my-1"></div>
              <div className="h-3 w-16 bg-gray-400/30 rounded"></div>
              <div className="space-y-1 text-xs">
                <div className="h-3 w-14 bg-gray-400/30 rounded"></div>
                <div className="h-3 w-14 bg-gray-400/30 rounded"></div>
              </div>
              <div className="h-3 w-16 bg-gray-400/30 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashSkeleton;
