import React from "react";
import { FaLock } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const PrivacyAndSecurity = ({
  containerPS,
  headingPS,
  paraOnePS,
  innerContainerPS,
  highlightParaPS,
}) => {
  return (
    <div
      className={twMerge(
        containerPS,
        "mt-4 border-[#dbeafe] bg-[#eff6ff] max-phone:bg-transparent max-phone:mt-6",
      )}
    >
      <FaLock className="w-35 mt-1.5 max-phone:w-40" color="#bbb9c1" size={25} />
      <div>
        <h2 className={headingPS}>Privacy & Data Security</h2>
        <p className={paraOnePS}>
          We utilize industry-standard security measures to protect your data.
          However, as with any digital platform, no system is 100% bulletproof.
        </p>
        <div
          className={twMerge(innerContainerPS, "border-[#bfdbfe] bg-[#dbeafe]")}
        >
          <p className="text-[#1e40af] max-phone:tracking-wide">
            <span className={highlightParaPS}>Your choice matters:</span>{" "}
            Because this is an educational project, your peace of mind is our
            priority. If you feel hesitant, you are entirely welcome to use a{" "}
            <span className={highlightParaPS}>
              temporary, random, or anonymous
            </span>{" "}
            email address to log in. We do not block disposable email IDs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndSecurity;
