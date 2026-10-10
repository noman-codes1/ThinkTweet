import React from "react";
import Analytics from "../features/dashboard/Analytics";
import AnalyzeTweet from "../features/dashboard/AnalyzeTweet";
import Guide from "../features/dashboard/Guide";
import History from "../features/dashboard/History";
import { use, useState, useEffect } from "react";
import { AuthContext } from "../utils/AuthProvider";
import { DashboardProvider } from "../utils/DashboardProvider";
import DashboardLoader from "../features/dashboard/DashboardLoader";
import CustomError from "../components/CustomError";

const Dashboard = () => {
  //giving the title of the page
  document.title = "Dashboard - ThinkTweet";

  //getting the AuthContext data
  const auth = use(AuthContext);

  return auth.isAuthenticated ? (
    <DashboardProvider>
      <DashboardLoader />
      <div className="p-8 bg-[#f8fafc] max-lg:px-5 max-phone:px-3">
        <Analytics />
        <div className="grid grid-cols-3 grid-rows-[auto_2fr] mt-8 gap-5 max-lg:grid-cols-1">
          <AnalyzeTweet />
          <Guide />
          <History />
        </div>
      </div>
    </DashboardProvider>
  ) : (
    <CustomError statusCode="401" errorName="Unauthorized" />
  );
};

export default Dashboard;
