import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { Loading } from "~/components/Common/Loading";
import { api } from "~/utils/api";
import DashboardEmpty from "./DashboardEmpty";

export const DashboardCollections = () => {
  const { status, data } = api.collection.getCollection.useQuery();
  return (
    <div className="mt-8">
      {status === "loading" && <Loading />}

      {status === "error" && <div>Error</div>}

      {status === "success" && data.length === 0 && <DashboardEmpty />}

      {status === "success" && data.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {data.map((collection) => (
            <Link
              href={`/dashboard/collection/${collection.id}`}
              className="flex cursor-pointer rounded-md transition-shadow duration-300 ease-in-out"
              key={collection.id}
            >
              <div className="flex flex-1 items-center  justify-between truncate rounded-md border border-gray-200 bg-white pb-9">
                <div className="flex-1 truncate px-4 py-4">
                  <h3 className="flex-shrink truncate text-xl font-semibold text-gray-900 hover:text-gray-600">
                    {collection.name}
                  </h3>
                  <div className="w-full">
                    <div className="flex items-end justify-between">
                      <span className="text-scale-1000 text-xs lowercase text-gray-600">
                        {collection.description}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 pr-2">
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Open options</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
