import React from 'react'
import { FaBrain } from "react-icons/fa";

const CompanyLogoName = () => {
  return (
    <div className="flex items-center gap-2">
      <FaBrain
        className="p-2 rounded-lg text-white bg-brand-tertionary"
        size={34}
      />
      <h3 className="font-semibold text-lg text-brand-primary">ThinkTweet</h3>
    </div>
  );
}

export default CompanyLogoName