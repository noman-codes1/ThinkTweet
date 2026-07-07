import React from "react";
import { IoBook } from "react-icons/io5";
import { FaShieldAlt } from "react-icons/fa";
import { GiBrainLeak } from "react-icons/gi";
import { BiSolidError } from "react-icons/bi";
import { PiAlienFill } from "react-icons/pi";
import { RiStackFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import ProTip from "./ProTip";

//static variable
const container =
  "flex gap-3 mb-4 hover:cursor-default p-2 rounded-lg hover:bg-[#eef2ff]";
const icon = "p-1.5 rounded-lg h-max mt-1";
const heading = "text-sm text-brand-primary";
const text = "text-xs tracking-wide text-brand-secondary";

const Guide = () => {
  return (
    <div className="row-span-2 max-lg:row-auto">
      <div className="border border-brand-fourth rounded-xl h-max">
        <div className="flex gap-4 items-center border-b border-b-brand-fourth rounded-t-xl py-4 px-6 bg-linear-135 from-[#eef2ff] to-[#fbfcff]">
          <IoBook
            className="text-white bg-brand-tertionary p-1.5 rounded-lg"
            size={30}
          />
          <div>
            <h3 className="text-[0.9rem] text-brand-primary font-semibold">
              Analysis Guide
            </h3>
            <p className="text-sm text-brand-secondary">5 scoring parameters</p>
          </div>
        </div>

        {/* Guide Parameter #tip: break this also into components*/}
        <div className="px-6 py-4">
          {/* Evidence Strength */}
          <div className={container}>
            <FaShieldAlt
              className={twMerge(icon, "p-2 text-[#059669] bg-[#d1fae5]")}
              size={38}
            />
            <div>
              <h5 className={heading}>Evidence Strength</h5>
              <p className={text}>
                How well the claim is backed by verifiable data, sources, or
                facts.
              </p>
            </div>
          </div>

          {/* Logical Consistency */}
          <div className={container}>
            <GiBrainLeak
              className={twMerge(icon, "text-[#2563eb] bg-[#dbeafe]")}
              size={38}
            />
            <div>
              <h5 className={heading}>Logical Consistency</h5>
              <p className={text}>
                Whether the argument flows coherently without internal
                contradictions.
              </p>
            </div>
          </div>

          {/* Generalization Risk */}
          <div className={container}>
            <BiSolidError
              className={twMerge(icon, "text-[#f97316] bg-[#ffedd5]")}
              size={40}
            />
            <div>
              <h5 className={heading}>Generalization Risk</h5>
              <p className={text}>
                Flags overly broad claims that extend beyond what the evidence
                supports.
              </p>
            </div>
          </div>

          {/* Confirmation Bias */}
          <div className={container}>
            <PiAlienFill
              className={twMerge(icon, "text-[#f43f5e] bg-[#ffe4e6]")}
              size={38}
            />
            <div>
              <h5 className={heading}>Confirmation Bias</h5>
              <p className={text}>
                Detects cherry-picked evidence or selective framing of
                information.
              </p>
            </div>
          </div>

          {/* Nuance & Context */}
          <div className={container}>
            <RiStackFill
              className={twMerge(icon, "text-[#a855f7] bg-[#f3e8ff]")}
              size={38}
            />
            <div>
              <h5 className={heading}>Nuance & Context</h5>
              <p className={text}>
                Measures acknowledgment of complexity, caveats, and missing
                context.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rendering the pro tip card */}
      <ProTip />
    </div>
  );
};

export default Guide;
