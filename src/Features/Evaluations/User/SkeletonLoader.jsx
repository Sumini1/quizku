import React from 'react';

const SkeletonLoader = () => {
    return (
      <div className="flex flex-col p-5 min-h-screen overflow-hidden md:justify-start md:items-start md:ml-10 md:py-10">
        {/* Progress Bar Skeleton */}
        <div className="flex flex-col h-4 mb-2 mt-2 w-full">
          <div className="flex w-full h-2">
            <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-full bg-gray-200 rounded-sm max-w-[265px] mx-1 -mt-1 animate-pulse"></div>
          </div>
        </div>

        {/* Navigation buttons skeleton */}
        <div className="flex items-center justify-between mt-5">
          <div className="flex gap-2 items-center bg-gray-200 p-2 w-24 h-10 rounded-xl animate-pulse"></div>
          <div className="flex gap-2 items-center bg-gray-200 p-2 w-24 h-10 rounded-xl animate-pulse"></div>
        </div>

        {/* Question Text Skeleton */}
        <div className="flex flex-col mt-7">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>

        {/* Answer options skeleton */}
        <div className="mt-10 w-full gap-5 grid grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-12 bg-gray-200 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>

        {/* Bottom Action Bar Skeleton */}
        <div className="fixed bottom-0 left-0 right-0 px-5 py-3 shadow-md flex justify-between gap-2 ">
          <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="p-3 w-[370px] h-12 rounded-xl bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    );
};

export default SkeletonLoader;