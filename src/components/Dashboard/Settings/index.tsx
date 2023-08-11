import React from "react";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { api } from "~/utils/api";
import { Skeleton } from "antd";

export default function DashboardSettingsBody() {
  const { data, status } = api.user.getSettingsAccessToken.useQuery();
  const [isCopied, setIsCopied] = React.useState(false);

  return (
    <>
      {status === "loading" && <Skeleton active />}
      {status === "success" && (
        <div className="space-y-5">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            Chrome Extension
          </h2>
          <div className="divide-ylg:col-span-9 rounded-lg border border-gray-200">
            <div className="px-4 py-6 sm:p-6 lg:pb-8">
              <div>
                <h2 className="text-lg font-medium leading-6 text-gray-900">
                  Access Token
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Copy the following code and paste it into the extension.
                </p>
              </div>
              <div className="mt-6 flex flex-col lg:flex-row">
                <div className="flex-grow space-y-6">
                  <div className="flex">
                    <div className="flex-grow">
                      <input
                        type="password"
                        readOnly
                        defaultValue={data || ""}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                    <span className="ml-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCopied(false);
                          navigator.clipboard.writeText(data || "");
                          setIsCopied(true);
                        }}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                      >
                        <ClipboardIcon
                          className="h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="ml-2">
                          {isCopied ? "Copied" : "Copy"}
                        </span>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 border border-gray-200 bg-white sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Download Extension
              </h3>
              <>
                <div className="mt-2 max-w-2xl text-sm text-gray-500">
                  <p>
                    Download the extension from the following link and install
                    it in your browser. Currently, the extension is only
                    available for Chromium-based browsers.
                  </p>
                </div>
                <div className="mt-5">
                  <a
                    href="https://chrome.google.com/webstore/detail/way-to-website/mbibpfdeokaolhaodpbopgfbjonmmhoe?hl=en&authuser=2"
                    target="_blank"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="-ml-0.5 mr-2 h-4 w-4"
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
                    Install Now
                  </a>
                </div>
              </>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
