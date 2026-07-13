import React from 'react'
import { GoDotFill } from "react-icons/go";

const MiniFooter = () => {
  return (
    <div className="flex items-center gap-1 mt-7 text-xs text-[#b2bccc] max-phone:flex-col">
      <p>Secured by ThinkTweet's enterprise-grade infrastructure</p>
      <GoDotFill className="max-phone:hidden" size={4} />
      <div className="flex gap-1 items-center">
        <a
          className="hover:cursor-pointer hover:text-brand-secondary"
          onClick={(e) => e.preventDefault()}
          href="#"
        >
          Privacy
        </a>
        <GoDotFill size={4} />
        <a
          className="hover:cursor-pointer hover:text-brand-secondary"
          onClick={(e) => e.preventDefault()}
          href="#"
        >
          Terms
        </a>
      </div>
    </div>
  );
}

export default MiniFooter