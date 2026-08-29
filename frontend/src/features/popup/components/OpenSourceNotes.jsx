import React from 'react'
import { FaFileCode } from "react-icons/fa";
import { twMerge } from 'tailwind-merge';

const OpenSourceNotes = ({
  containerOPS,
  headingOPS,
  paraOneOPS
}) => {
  return (
    <div
      className={twMerge(
        containerOPS,
        "mt-4 border-brand-fourth bg-[#f8fafc] max-phone:bg-transparent max-phone:mt-6",
      )}
    >
      <FaFileCode className="w-25 mt-1.5 max-phone:w-30" color="#9a7473" size={28} />
      <div>
        <h2 className={headingOPS}>Open Source & Community Driven</h2>
        <p className={paraOneOPS}>
          Want to see how we built this?{" "}
          <span className="text-brand-primary underline">
            This entire project is open-source!
          </span>{" "}
          You can visit our GitHub repository to read the readme.md
          documentation.
        </p>
        <p className="text-brand-secondary max-phone:tracking-wide">
          We welcome community feedback: if you spot any security
          vulnerabilities, architectural flaws, or general bugs, please point
          them out so we can look into them immediately.
        </p>
      </div>
    </div>
  );
};

export default OpenSourceNotes