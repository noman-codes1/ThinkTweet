import React from "react";
import { MdOutlineLogout } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";
import { customFetch } from "../../utils/customFetch";
import { use } from "react";
import { AuthContext } from "../../utils/AuthProvider";
import { useState } from "react";
import LogoutLoader from "./components/LogoutLoader";
import { sleep } from "../../utils/sleep";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Logout = () => {
  //create a state (react variable)
  const [serverState, setServerState] = useState("idle");

  //getting the data from the auth context
  const auth = use(AuthContext);

  //getting the values
  const navigateNow = useNavigate();

  //writing a func to talk to the server
  const talkToServer = async () => {
    //changing the server state
    setServerState("logging-out");

    //tracking the sever response
    let serverSuccess;

    //talking to server
    const serverObject = await customFetch("logout");

    //sleeping for few second
    await sleep(8000);

    //working according what server has responded
    if (serverObject.success) {
      serverSuccess = true;
    } else if (serverObject.statusCode === 401) {
      //talking to the refresh router
      const refreshObject = await customFetch("refresh");

      if (refreshObject.success) {
        //talking again to the server to logout
        const finalObject = await customFetch("logout");

        if (finalObject.success) {
          serverSuccess = true;
        } else {
          serverSuccess = false;
        }
      } else {
        serverSuccess = false;
      }
    } else {
      serverSuccess = false;
    }

    // working accordingly depending on the server response
    if (serverSuccess) {
      //resetting the state
      auth.setShowLogoutPopup(false);
      auth.setIsAuthenticated(false);

      //changing the router
      navigateNow("/login", { replace: true });
    } else {
      setServerState("idle");
      auth.setShowLogoutPopup(false);
    }
  };;
  return (
    <div className="fixed bg-[#9ca0a9]/70 backdrop-blur-xs inset-0 z-600 flex items-center justify-center shadow-2xl">
      <div
        className={twMerge(
          "rounded-lg w-sm max-phone:w-[90%]",
          serverState === "idle" && "bg-white",
        )}
      >
        {/* Showing the logout popup */}
        {serverState === "idle" && (
          <div className="p-8 flex flex-col items-center">
            <MdOutlineLogout
              className="p-2 rounded-lg mb-6 text-[#ef4444] bg-[#fff1f2]"
              size={42}
            />
            <h1 className="text-xl px-10 font-bold text-brand-primary text-center mb-5 max-phone:px-7">
              Are you sure you want to log out?
            </h1>
            <p className="text-center text-sm mb-8 text-brand-secondary px-10 max-phone:px-5">
              You are about to be logged out of your account. Click confirm to
              log out
            </p>
            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                onClick={() => auth.setShowLogoutPopup(false)}
                className="border bg-[#f8fafc] border-brand-fourth text-brand-secondary py-2.5 rounded-lg text-sm hover:cursor-pointer hover:text-brand-primary hover:bg-[#f3f4f5]"
              >
                Cancel
              </button>
              <button
                onClick={() => talkToServer()}
                className="border py-2.5 rounded-lg text-sm text-white bg-[#ef4444] hover:bg-[#dc2626] hover:cursor-pointer"
              >
                Log out
              </button>
            </div>
          </div>
        )}

        {/* Explictly keeping it in the false condition. This will work only when 
        session deletion actually work */}
        {false && (
          <div className="flex items-center gap-2 justify-center rounded-b-lg border-t border-t-brand-fourth py-3 -mt-2 bg-[#f8fafc]">
            <FaShieldAlt className="text-brand-secondary" size={11} />
            <p className="text-xs text-brand-secondary">
              Your session data will be cleared securely.
            </p>
          </div>
        )}

        {/* Showing the ladder */}
        {serverState === "logging-out" && <LogoutLoader />}

        {/* #work: feature under-dev 
        Responding when the server return success */}
        {serverState === "success" && <div></div>}

        {/* #work: feature under-dev
        Showing the error state */}
        {serverState === "failure" && <div></div>}
      </div>
    </div>
  );
};

export default Logout;
