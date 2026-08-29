import React from "react";
import Analytics from "../features/dashboard/Analytics";
import AnalyzeTweet from "../features/dashboard/AnalyzeTweet";
import Guide from "../features/dashboard/Guide";
import History from "../features/dashboard/History";
import { use, useState, useEffect } from "react";
import { AuthContext } from "../utils/AuthProvider";
import CustomError from "../components/CustomError";
import { DashboardProvider } from "../utils/DashboardProvider";
import DashboardLoader from "../features/dashboard/DashboardLoader";

const Dashboard = () => {
  //giving the title of the page
  document.title = "Dashboard - ThinkTweet";

  //getting the AuthContext data
  const auth = use(AuthContext);

  //showing the loader when needed
  const [loader, setLoader] = useState(true);

  // Hanlding the condition to demount the loader component
  // #tip: this is not the right way to deal with this. Improve it!!
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return auth.isAuthenticated ? (
    <DashboardProvider>
      {loader && <DashboardLoader functionToSetLoader={setLoader} />}
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
    // #tip: Use better structure and user experience
    <CustomError content="401 Unauthorized" />
  );
};

export default Dashboard;
