import React from "react";
import { LuMail } from "react-icons/lu";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";
import isEmail from "validator/lib/isEmail";
import { MdError } from "react-icons/md";
import { HashLoader, BarLoader } from "react-spinners";
import { FaArrowRight } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import MiniHeader from "./components/MiniHeader";

//static variable
const label = "text-[0.9rem] text-[#475569]";
const inpuBoxDiv =
  "mt-1.5 flex items-center gap-4 border p-3 rounded-lg mb-1 border-brand-fourth bg-[#f8fafc] hover:shadow-xs focus-within:outline-1 focus-within:outline-brand-tertionary focus-within:bg-white";
const inputBox =
  "w-full text-sm focus:outline-none font-mono text-brand-primary";

const LogFrom = ({ setIsUserVerfied, setUserVerifiedEmail }) => {
  //using state
  const [formData, setFormData] = useState({ email: "", pass: "" });
  const [fromErr, setFormErr] = useState({ emailErr: "", passErr: "" });
  const [hidePass, setHidePass] = useState(true);
  const [formState, setFormState] = useState("normal");

  //function for validating email
  const validateUserEmail = (event) => {
    const enteredValue = event.target.value;

    //resetting the state
    setFormErr({ ...fromErr, emailErr: "" });

    //rejecting the input
    if (enteredValue.length >= 35) {
      setFormErr({ ...fromErr, emailErr: "Too many characters. Try again." });
      return;
    }

    //validating the email
    if (!isEmail(enteredValue)) {
      setFormErr({ ...fromErr, emailErr: "Invalid email." });
    }

    //disabling if from state is failed
    if (formState === "failed") return;

    //setting the value
    setFormData({ ...formData, email: enteredValue });
  };

  //function to validating the passoword
  const validateUserPassword = (event) => {
    const enteredValue = event.target.value;

    //resetting the state
    setFormErr({ ...fromErr, passErr: "" });

    //checking the length of the passoword and validating it
    if (enteredValue.length <= 14) {
      setFormErr({
        ...fromErr,
        passErr: "Too short. Must be at least 14 characters.",
      });
    } else if (enteredValue.length >= 40) {
      setFormErr({ ...fromErr, passErr: "Too many characters. Try again." });
      return;
    }

    //disabling the input if formState is failed
    if (formState === "failed") return;

    //setting up the value
    setFormData({ ...formData, pass: enteredValue });
  };

  //checking whether to make it ready or not
  let isReady = false;
  if (
    !fromErr.emailErr &&
    !fromErr.passErr &&
    formData.email.length > 5 &&
    formData.pass.length > 14
  ) {
    console.log("hey i am inside if");
    isReady = true;
  }

  //helper function to make a promise
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  //submitting the form
  const talkServerLogin = async (event) => {
    console.log("I am okay");

    event.preventDefault();

    //working according to the condition
    if (formState === "failed") {
      setFormState("normal");
      setFormData({ email: "", pass: "" });
    } else {
      console.log("I am here");
      setFormState("authenticating");
      await sleep(5000);

      //mimicking the server state
      if (false) {
          setUserVerifiedEmail(formData.email);
          setIsUserVerfied(true);
          setFormState("normal");
      } else {
        setFormState("failed");
      }
    }
  };

  return (
    <div
      className={twMerge(
        "border w-md relative py-8 px-9 rounded-lg bg-white shadow-xl border-brand-fourth h-max max-phone:w-[92%] max-phone:px-5 max-phone:py-7",
        formState === "failed" && "border-[#e83a3a]",
      )}
    >
      {formState === "authenticating" && (
        <div className="absolute inset-0 rounded-lg bg-[#f9fafd]/60 pointer-events-auto z-10 overflow-clip">
          <BarLoader color="#4f46e5" width={450} />
        </div>
      )}
      <MiniHeader />
      <h2
        className={twMerge(
          "text-3xl font-semibold mb-1.5 text-brand-primary",
          formState === "failed" && "text-[#b91c1c]",
        )}
      >
        Welcome Back
      </h2>
      <p className="border-b border-b-brand-fourth pb-7 mb-7 text-brand-secondary">
        Log in to access your dashboard and run analyses.
      </p>
      <form onSubmit={(e) => talkServerLogin(e)}>
        {/* For entering the email */}
        <label className={label} htmlFor="">
          Email Address
        </label>
        <div
          className={twMerge(
            inpuBoxDiv,
            formState === "failed" && "border-[#e63636]",
          )}
        >
          <input
            className={inputBox}
            type="email"
            value={formData.email}
            placeholder="Enter your registered mail"
            onChange={(e) => validateUserEmail(e)}
            required
          />
          <LuMail
            size={19}
            className={twMerge(
              "text-brand-secondary",
              formData.email.length > 1 && "text-brand-tertionary",
              formState === "failed" && "text-[#e14444]",
            )}
          />
        </div>
        <p className="mb-5 text-sm text-[#ef4444]">
          {fromErr.emailErr && (
            <span className="flex items-center gap-1">
              <MdError />
              {fromErr.emailErr}
            </span>
          )}
        </p>
        {/*Note : do not get confused one is for checking the condition and already it'a string */}

        {/* For entering the passoword */}
        <label className={label} htmlFor="">
          Password
        </label>
        <div
          className={twMerge(
            inpuBoxDiv,
            formState === "failed" && "border-[#e63636]",
          )}
        >
          <input
            className={inputBox}
            type={hidePass ? "password" : "text"}
            value={formData.pass}
            placeholder="Enter your password"
            onChange={(e) => validateUserPassword(e)}
            required
          />
          <div
            className={twMerge(
              "text-brand-secondary hover:cursor-pointer hover:text-brand-tertionary",
              formData.pass.length > 1 &&
                "text-brand-tertionary hover:text-brand-tertionary-hover",
              formState === "failed" && "text-[#e14444]",
            )}
          >
            {hidePass ? (
              <LuEyeClosed size={20} onClick={() => setHidePass(false)} />
            ) : (
              <LuEye size={20} onClick={() => setHidePass(true)} />
            )}
          </div>
        </div>
        <p className="mb-2.5 text-sm text-[#ef4444]">
          {fromErr.passErr && (
            <span className="flex items-center gap-1">
              <MdError />
              {fromErr.passErr}
            </span>
          )}
        </p>
        {/*Note : do not get confused one is for checking the condition and already it'a string */}

        {/* button for forgot password */}
        <button
          onClick={(e) => e.preventDefault()}
          className="block ml-auto text-sm mb-6 text-brand-secondary hover:text-brand-tertionary hover:cursor-pointer select-none"
        >
          Forgot Password?
        </button>

        {/* To show error state */}
        {formState === "failed" && (
          <div className="flex gap-3 border p-3 rounded-lg mb-5 border-l-3 bg-[#fef2f2] border-[#fee2e2] border-l-[#eb3e3e]">
            <IoIosCloseCircle
              className="border h-max p-1.5 rounded-full mt-1 size-12 bg-[#fce0e0]"
              color="#ef4444"
            />
            <div>
              <p className="font-semibold text-[0.93rem] mb-2 text-[#b91c1c]">
                Error: Invalid email or password combination.
              </p>
              <p className="text-sm text-[#e14444]">
                Please check your credentials and try again. After 3 failed
                attempts, your account will be temporarily locked.
              </p>
            </div>
          </div>
        )}

        {/* buton to submit form */}
        <button
          className={twMerge(
            "border w-full py-3 rounded-lg text-base mb-7 bg-brand-tertionary text-white duration-300 ease-in hover:bg-brand-tertionary-hover hover:-translate-y-0.5 hover:cursor-pointer",
            !isReady && "hover:cursor-not-allowed opacity-60",
            formState === "failed" && "bg-[#ef4444] hover:bg-[#c03939]",
          )}
          type="submit"
          disabled={!isReady}
        >
          {formState === "normal" && "Log In"}
          {formState === "authenticating" && (
            <span className="animate-pulse">
              Authenticating...
              <HashLoader className="ml-4" color="white" size={16} />
            </span>
          )}
          {formState === "failed" && (
            <span className="flex items-center justify-center gap-2">
              Try Again
              <FaArrowRight />
            </span>
          )}
        </button>
      </form>
      <p className="text-center border-t border-t-brand-fourth text-brand-secondary pt-9 text-sm">
        Don't have an account?{" "}
        <button className="text-brand-tertionary hover:cursor-pointer hover:text-brand-tertionary-hover hover:underline">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LogFrom;
