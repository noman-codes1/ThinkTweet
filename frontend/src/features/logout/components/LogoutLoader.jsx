import React from "react";
import { FadeLoader } from "react-spinners";

const LogoutLoader = () => {
  return (
    <div className="flex justify-center">
      <FadeLoader className="mb-3" color="#4f46e5" />
      {/* <p className="font-mono animate-pulse text-brand-secondary">
        Logging out...
      </p> */}
    </div>
  );
};

export default LogoutLoader;
