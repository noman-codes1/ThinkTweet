import React from "react";
import Analytics from "../features/dashboard/Analytics";
import AnalyzeTweet from "../features/dashboard/AnalyzeTweet";
import Guide from "../features/dashboard/Guide";
import History from "../features/dashboard/History";
import { use } from "react";
import { AuthContext } from "../utils/AuthProvider";
import CustomError from "../components/CustomError";

const Dashboard = () => {
  //getting the AuthContext data
  const auth = use(AuthContext);

  return auth.isAuthenticated ? (
    <div className="p-8 bg-[#f8fafc] max-lg:px-5 max-phone:px-3">
      <Analytics />
      <div className="grid grid-cols-3 grid-rows-[auto_2fr] mt-8 gap-5 max-lg:grid-cols-1">
        <AnalyzeTweet />
        <Guide />
        <History />
      </div>
    </div>
  ) : (
    // #tip: Use better structure and user experience
    <CustomError content="401 Unauthorized" />
  );
};

export default Dashboard;
