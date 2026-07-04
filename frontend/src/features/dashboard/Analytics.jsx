import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { VscGraphLine } from "react-icons/vsc";

//static variable
const cardContainer = "border p-4 rounded-lg bg-white hover:shadow-lg";

const Analytics = () => {
  //test variable
  const username = "Rohani";
  const credits = 45;
  const totalVariable = 0

  return (
    <div className="bg-[#f8fafc] p-8 w-full">
      {/* Welcoming */}
      <div className="border-2 flex mb-8">
        <div className="">
          <h1 className="text-3xl font-bold text-brand-primary">
            Hi, {username} 👋
          </h1>
          <p className="text-[0.9rem] tracking-wider text-brand-secondary">
            {true
              ? `Welcome to ThinkTweet! You're all set to start analyzing tweetsfor logical quality.`
              : `Welcome back! You have ${credits} credits available — keepanalyzing and sharpening your critical thinking.`}
          </p>
        </div>
        {true && (
          <p className="border border-brand-tertionary text-brand-secondary bg-[#eef2ff] rounded-lg p-2 text-xs ml-auto self-center flex gap-1">
            <FaInfoCircle
              className="self-center text-brand-tertionary"
              size={13}
            />
            You have{" "}
            <span className="text-brand-tertionary">
              {credits} free credits
            </span>{" "}
            to get started
          </p>
        )}
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-3 gap-4">
        {/* Total number of analysis */}
        <div className={cardContainer}>
          <div>
            <div className="flex mb-4">
              <VscGraphLine className="border rounded-lg p-2" size={30}/>
              <p className="self-center ml-auto text-sm border px-3 p-0.5 rounded-xl">All time</p>
            </div>
            <h1 className="text-5xl mb-2">{totalVariable}</h1>
            <p className="text-[0.9rem]">Total Analyses Run</p>
          </div>
          <div className="border-t">
            <p>Start your first analysis below</p>
          </div>
        </div>

        {/* Number of credits */}
        <div className="border-2">
          <div>
            <div>
              <></>
              <p>Active</p>
            </div>
            <div>
              <h1>{}</h1>
              <p>Available Credits</p>
            </div>
          </div>
          <div>
            <a href="">Buy Credits</a>
          </div>
        </div>

        {/* Last purchase history */}
        <div className="border-2">
          <div>
            <div>
              <></>
              <p>Billing</p>
            </div>
            {true ? <p>No purchase yet</p> : <p>{}</p>}
            <p>Last Credit Purchase</p>
          </div>
          <div>
            <p>Purchase history will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
