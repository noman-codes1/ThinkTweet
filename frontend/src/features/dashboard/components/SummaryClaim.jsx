import React from 'react'
import { IoDocumentText } from "react-icons/io5";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaCoins } from "react-icons/fa6";

const SummaryClaim = () => {
  return (
    <div className="mt-8 shadow-lg border p-6 rounded-lg bg-white border-[#d3d1f8] duration-250 hover:-translate-y-1 hover:shadow-xl">
      <h5 className="flex items-center gap-2 mb-4 text-base text-brand-primary">
        <IoDocumentText
          className="p-1.5 rounded-lg text-brand-tertionary bg-[#eef2ff]"
          size={28}
        />{" "}
        Summary
      </h5>
      <p className="text-[0.9rem] tracking-wide leading-6 text-brand-secondary mb-6 pb-6 border-b border-b-brand-fourth">
        This tweet presents a moderately strong argument for AI regulation in
        diagnostic healthcare, anchored by a reference to Stanford research and
        a replication claim across 12 studies. The evidentiary foundation is
        above average for a social media post — however, the absence of a direct
        citation, the conspicuous precision of "94% higher accuracy," and the
        undefined scope of "regulated frameworks" introduce meaningful
        credibility gaps. The argument is logically structured but leans on
        authority rather than transparent data. Confirmation bias is moderate:
        the claim selectively foregrounds supportive evidence without
        acknowledging counterarguments or limitations. Readers should treat this
        as a compelling hypothesis worth investigating — not a settled
        conclusion.
      </p>
      <div className="flex gap-6">
        <p className="flex items-center gap-2 text-sm text-brand-secondary">
          <MdOutlineAccessTimeFilled /> Analyzed June 20, 2026 &middot; 3:12 PM
        </p>
        <p className="flex items-center gap-2 text-sm text-brand-secondary">
          <FaCoins color="#f59e0b" />
          18 credits used
        </p>
      </div>
    </div>
  );
}

export default SummaryClaim