import React from "react";
import { FaBrain } from "react-icons/fa";
import { BarLoader } from "react-spinners";
import { use, useState } from "react";
import { DashboardContext } from "../../utils/DashboardProvider";
import { sleep } from "../../utils/sleep";

const DashboardLoader =  ({ functionToSetLoader }) => {
  //using state
  const [isDataServedByServer, setIsDataServedByServer] = useState(false)

  //defensive coding - context is broadcasting data multiple time, 
  //we don't wanna waste re-running the script when not needed
  if (isDataServedByServer) {
    console.log("Program is terminated here...")
    return
  }

  //getting the value of the context
  const dashboardValues = use(DashboardContext);

  // making sure the code sleeps if the value is true to avoid quick vanishing
  const testFunc = async () => {
    if (dashboardValues.dataSuccess) {
      await sleep(1000) //#tip: this is not a promise, this shoudn't work
      setIsDataServedByServer(dashboardValues.dataSuccess) //will not cause infinite render, because we are controlling the rate of react HMR or whatever the name is 
    }
  }
  testFunc() //running the function to work

  return !isDataServedByServer ? (
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
  ) : (
    // Returning null because we don't need this component and we cannot demount by itself
    null
  )
};

export default DashboardLoader;
