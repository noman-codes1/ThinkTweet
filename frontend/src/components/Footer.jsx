import React from "react";
import { FaBrain, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { MdMailOutline } from "react-icons/md";
import { FaCopy } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

//static variable
const media =
  "text-brand-secondary border p-2 bg-white rounded-lg border-brand-fourth hover:bg-[#eef2ff] hover:text-brand-tertionary hover:border-brand-tertionary";
const catHeader = "uppercase text-brand-primary text-sm font-semibold mb-5";
const links = "text-sm mb-3 text-brand-secondary hover:text-brand-tertionary hover:cursor-pointer";

const Footer = () => {
  return (
    <div className="border bg-[#f8fafc] border-brand-fourth px-8 pt-12 pb-7">
      <div className="grid grid-cols-4 gap-5 border-b border-b-brand-fourth max-lg:grid-cols-3 max-sm:grid-cols-1">
        <div className="col-span-2 max-sm:col-span-1">
          <div className="flex items-center gap-2">
            <FaBrain
              className="p-2 rounded-lg text-white bg-brand-tertionary"
              size={30}
            />
            <h3 className="text-brand-primary font-semibold text-lg">
              ThinkTweet
            </h3>
          </div>
          <p className="w-80 text-sm mt-5 text-brand-secondary max-phone:w-full">
            AI-powered tweet analysis across five core parameters. Currently
            operating exclusively within the Gender Domain.
          </p>
          <div className="flex my-7 gap-3">
            <a href="" target={"_blank"}>
              <FaGithub className={media} size={34} />
            </a>
            <a href="" target={"_blank"}>
              <FaLinkedinIn className={media} size={34} />
            </a>
          </div>
        </div>
        <div className="max-sm:mb-5">
          <h4 className={catHeader}>Product</h4>
          <ul>
            <li className={links}>Home</li>
            <li className={links}>Documentation</li>
            <li className={links}>About</li>
          </ul>
        </div>
        <div className="max-lg:mb-8">
          <h4 className={catHeader}>Legal & Contact</h4>
          <ul>
            <li className={links}>Privacy Policy</li>
            <li className={links}>Disclaimer</li>
            <li className="flex gap-2">
              <a className={twMerge(links, "flex items-center gap-1 ")} href="">
                <MdMailOutline />
                hi@meetnoman.com
              </a>
              {/* We will do this functionality later. It's not that hard but I am running out of time rn. */}
              {/* <FaCopy  className="text-sm text-brand-secondary mt-0.5 hover:text-brand-tertionary hover:cursor-pointer" /> */}
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-6 flex max-sm:flex-col max-sm:gap-4">
        <p className="text-xs tracking-wide text-brand-secondary max-sm:text-center">
          &copy; 2026 ThinkTweet. All rights reserved.
        </p>
        <p className="ml-auto flex items-center gap-1 text-xs tracking-wide text-brand-secondary max-sm:ml-0 max-sm:justify-center">
          Built with <GoHeartFill className="text-[#fa7184]" /> for better
          feminist discourse.
        </p>
      </div>
    </div>
  );
};

export default Footer;
