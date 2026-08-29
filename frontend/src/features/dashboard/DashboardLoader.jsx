import React from "react";
import { FaBrain } from "react-icons/fa";
import { BarLoader } from "react-spinners";
import { use } from "react";
import { DashboardContext } from "../../utils/DashboardProvider";

const DashboardLoader = ({ functionToSetLoader }) => {
  //getting the value of the context
  const dashboardValues = use(DashboardContext);

  // THIS WORK IS UN-FINISHED. USE SERVER DATA TO DETERMINE WHEN TO TURN OFF
  // THE LOADER
  return (
    <div className="fixed inset-0 z-200 bg-[#f7f9fc] flex items-center justify-center">
      <div>
        <FaBrain
          className="flex justify-self-center p-2.5 rounded-lg text-white bg-brand-tertionary mb-5 shadow-xl"
          size={45}
        />
        <h1 className="text-center font-bold text-xl text-brand-primary mb-1 tracking-tight">
          ThinkTweet
        </h1>
        <p className="text-center text-brand-secondary text-sm mb-5">
          Preparing your workspace<span>...</span>
        </p>
        <BarLoader width={180} height={2} color="#4f46e5" />
      </div>
    </div>
  );
};

export default DashboardLoader;
