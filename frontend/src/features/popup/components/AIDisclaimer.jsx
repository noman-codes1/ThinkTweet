import React from "react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

const AIDisclaimer = ({
  containerAI,
  headingAI,
  paraOneAI,
  innerContainerAI,
  highlightParaAI,
}) => {
  return (
    <div className={twMerge(containerAI, "border-[#fde68a] bg-[#fffbeb] max-phone:bg-transparent")}>
      <FaTriangleExclamation
        className="w-40 mt-1.5 max-phone:w-60"
        size={25}
        color="#f0c100"
      />
      <div>
        <h2 className={headingAI}>A note on AI response & context loss</h2>
        <p className={paraOneAI}>
          Because our underlying LLM sometimes loses the nuance and context of
          original tweets, it may occasionally generate replies that reflect
          misogynistic biases. We are acutely aware of this limitation and urge
          you not to blindly trust the system's output. Feminism and feminist
          discourse are core values of this project, and we are actively working
          to improve the model's alignment.
        </p>
        <div
          className={twMerge(innerContainerAI, "border-[#fde68a] bg-[#fef3c7]")}
        >
          <p className="text-[#92400e] max-phone:tracking-wide">
            <span className={highlightParaAI}>Help us improve: </span>If you
            encounter an inappropriate or misogynistic reply, please take a
            screenshot and email us at{" "}
            <span className={twMerge(highlightParaAI, "text-brand-tertionary font-sans hover:underline hover:cursor-pointer")}>
              noman.work@proton.me
            </span>
            . {/* This is the ending dot of the paragraph */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIDisclaimer;
