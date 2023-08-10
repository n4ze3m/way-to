import React from "react";
import LinkHeading from "./LinksHeading";
import { LinkList } from "./LinksList";

export const LinksBody = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <LinkHeading />
      <LinkList />
    </div>
  );
};
