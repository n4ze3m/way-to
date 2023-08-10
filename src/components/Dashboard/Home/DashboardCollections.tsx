import {
  ChevronRightIcon,
  UserGroupIcon,
  LinkIcon
} from "@heroicons/react/24/outline";
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
              className="flex cursor-pointer flex-col rounded-md border border-gray-200 bg-white transition-shadow duration-300 ease-in-out"
              key={collection.id}
            >
              <div className="truncat mb-2 flex  flex-1 items-center justify-between">
                <div className="flex-1 truncate px-4 py-4">
                  <h3 className="flex-shrink truncate text-xl font-semibold text-gray-900 hover:text-gray-600">
                    {collection.name}
                  </h3>
                  <div className="w-full">
                    <div className="flex items-end justify-between">
                      <span
                      title={collection?.description || ""}
                      className="text-scale-1000 text-xs lowercase text-gray-600 truncate">
                        {collection.description}
                      </span>
                    </div>
                  </div>
                  {collection.type === "personal" ? (
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                      Personal
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Shared
                    </span>
                  )}
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
              <div className="truncat flex flex-1  items-center justify-between">
                <div className="flex-1 space-x-3 truncate px-4">
                  <span
                    className="inline-flex items-center text-xs font-medium text-gray-500"
                    title={`${collection.url_count} urls`}
                  >
                    <LinkIcon className="mr-1 h-4 w-4" aria-hidden="true" />
                    {collection.url_count}
                  </span>
                  <span 
                    className="inline-flex items-center text-xs font-medium text-gray-500"
                    title={`${collection.user_count} users`}
                  >
                    <UserGroupIcon className="mr-1 h-4 w-4" aria-hidden="true" />
                    {collection.user_count}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
