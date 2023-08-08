import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

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
};

export const LinksCard = (props: Props) => {
  return (
    <div className="flex  rounded-md transition-shadow duration-300 ease-in-out">
      <div className="flex flex-1 items-center  justify-between truncate rounded-md border border-gray-200 bg-white pb-9">
        <div className="flex-1 space-y-2 truncate px-4 py-4">
          <div className="flex items-center justify-between">
            <h3 className="flex-shrink truncate text-xl font-semibold text-gray-900 hover:text-gray-600">
              {`to/${props.to_path}`}
            </h3>
            <p className="text-sm text-gray-500">
              {dayjs(props.created_at).fromNow()}
            </p>
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
