import React from "react";

export const Loading = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          className="flex h-28 animate-pulse cursor-pointer rounded-md bg-gray-400 px-3 py-4 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg"
          key={item}
        ></div>
      ))}
    </div>
  );
};
