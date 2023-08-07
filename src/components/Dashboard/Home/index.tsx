import React from "react";
import DashboardHeading from "./DashboardHeading";
import { DashboardCollections } from "./DashboardCollections";

export const DashboardHome: React.FC = () => {
  return <div>
    <DashboardHeading />

<DashboardCollections />
  </div>;
};
