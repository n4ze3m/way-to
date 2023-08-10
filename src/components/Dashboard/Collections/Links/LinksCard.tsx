import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import {
  EllipsisHorizontalIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Dropdown } from "antd";
import Link from "next/link";

type Props = {
  id: string;
  collection_id: string;
  to_path: string;
  url: string;
  user_id: string;
  created_at: Date | null;
  User: {
    id: string;
    email: string | null;
  };

  onEditClick: () => void;
  onDeleteClick: () => void;
};

export const LinksCard = (props: Props) => {
  return (
    <div className="flex  rounded-md transition-shadow duration-300 ease-in-out">
      <div className="flex flex-1 items-center  justify-between truncate rounded-md border border-gray-200 bg-white pb-9">
        <div className="flex-1 space-y-2 truncate px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
            href={`http://to/${props.to_path}`}
            target="_blank"
            className="flex-shrink truncate text-xl font-semibold text-gray-900 hover:text-gray-600">
              {`to/${props.to_path}`}
            </Link>
            <div className="flex items-center">
              <p className="text-sm text-gray-500">
                {dayjs(props.created_at).fromNow()}
              </p>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 1,
                      label: (
                        <button
                          onClick={props.onEditClick}
                          className="flex w-full items-center justify-between border-b border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <PencilSquareIcon
                            className="mr-3 h-5 w-5"
                            aria-hidden="true"
                          />
                          Edit
                        </button>
                      ),
                    },
                    {
                      key: 2,
                      label: (
                        <button
                          onClick={props.onDeleteClick}
                          className="flex w-full items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <TrashIcon
                            className="mr-3 h-5 w-5"
                            aria-hidden="true"
                          />
                          Delete
                        </button>
                      ),
                    },
                  ],
                }}
              >
                <EllipsisHorizontalIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Dropdown>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-end justify-between">
              <span className="text-scale-1000 text-xs lowercase text-gray-600">
                {props.url}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
