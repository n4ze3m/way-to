import { useRouter } from "next/router";
import React from "react";

export default function DashboardEmpty() {
  const router = useRouter();
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className=" px-4 py-8 sm:px-10">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No Collections Found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Create a collection to get started with the Way To Website.
          </p>
          <div className="mt-6">
            <button
              onClick={() => {
                router.push(
                  "https://chrome.google.com/webstore/detail/page-assist/ehkjdalbpmmaddcfdilplgknkgepeakd?hl=en&authuser=2"
                );
              }}
              type="button"
              className="inline-flex items-center rounded-md border border-black border-transparent bg-black px-5 py-2 text-sm  font-medium text-white transition-all duration-75 hover:bg-white focus:outline-none  active:scale-95 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M21.17 8L12 8"></path>
                <path d="M3.95 6.06L8.54 14"></path>
                <path d="M10.88 21.94L15.46 14"></path>
              </svg>
              Install Extension
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
