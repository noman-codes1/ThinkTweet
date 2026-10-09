import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFingerprint, FaLock, FaKey, FaUserShield } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { IoMdRefresh } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import { FadeLoader } from "react-spinners";

const Unauthorized401 = () => {
  //using state
  const [showPageContent, setShowPageContent] = useState(false);

  //using the function for navigate
  const navigateNow = useNavigate(); // this runs the function instantly and returns a function

  //getting the timer so that it remains persistent across renders
  const timer = useRef();

  //running the timer for few seconds
  useEffect(() => {
    timer.current = setTimeout(() => {
      setShowPageContent(true)
    }, 2000);

    return () => clearTimeout(timer.current);
  }, []);

  return showPageContent ? (
    <div>
      {/* Container Box */}
      <div>
        <p>Error Code</p>
        <h1>401</h1>
        <h2>
          Unauthorized <span>/</span> Access Denied
        </h2>
        <p>
          The security gateway has blocked this request. Your neural signature
          doesn't match the required permissions for this sector.
        </p>

        {/* Button for user to take action */}
        <div>
          <button onClick={() => navigateNow(-1)}>
            <RiArrowGoBackFill />
            Return Back
          </button>
          <button className="border" onClick={() => window.location.reload()}>
            <IoMdRefresh />
            Refresh Page
          </button>
        </div>

        {/* Small Dialog */}
        <p>
          <GoDotFill />
          ThinkTweet Security Protocol
        </p>

        {/* Fingerprint Icon */}
        <FaFingerprint />
      </div>

      {/* Few design Icons */}
      <div>
        <FaLock />
        <FaKey />
        <FaUserShield />
      </div>
    </div>
  ) : (
    <div>
      <FadeLoader />
    </div>
  );
};

export default Unauthorized401;
