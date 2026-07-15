import React from "react";
import { FaUserPlus, FaRocket } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash, FaRegUser } from "react-icons/fa6";
import { useState } from "react";
import {
  MdAlternateEmail,
  MdLockOutline,
  MdOutlineError,
  MdOutlineRefresh,
} from "react-icons/md";
import { isEmail, isAlphanumeric } from "validator";
import { twMerge } from "tailwind-merge";
import { BarLoader, PuffLoader } from "react-spinners";
import { sleep } from "../../utils/sleep";
import { Link } from "react-router-dom";

//static variable for the class css
const label = "text-[0.9rem] text-[#475569] font-semi-bold";
const container =
  "flex bg-[#f8fafc] gap-2 mt-2 mb-1 border shadow-xs items-center py-2.5 px-3 rounded-lg border-brand-fourth focus-within:outline-brand-tertionary focus-within:outline focus-within:bg-white";
const icon = "text-brand-secondary";
const input = "text-sm focus:outline-none text-brand-primary w-full font-mono";
const errBox = "text-sm flex items-center gap-1 pl-1 text-[#dc2626]";
const buttonSubmit = "flex items-center gap-2 justify-center";

const SignUpForm = ({ setHasSentMailFunc }) => {
  //react state
  const [openEye, setOpenEye] = useState(false);
  const [formObject, setFormObject] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [formError, setFormError] = useState({
    errName: "",
    errEmail: "",
    errPass: "",
    errConfirmPass: "",
  });
  const [enableCheckbox, setEnableCheckbox] = useState(false);
  const [serverErr, setServerErr] = useState("");

  //#tip : normal means empty form, setting-up means talking to the server and failed means error occured
  const [formState, setIsFormState] = useState("normal");

  //#tip: Study about async issue which could cause while changing the state so fast

  //function to take name input and validate it
  const validatingName = (event) => {
    const val = event.target.value;

    //rejecting the input if the formState is 'failed'
    if (formState === "failed") return;

    //resetting the state to avoid errors when not needed
    setFormError({ ...formError, errName: "" });

    // #tip: lower the prefrence of this to avoid multiple async request
    //checking the length of input to throw a error
    if (val.length < 3) {
      setFormError({
        ...formError,
        errName: "Too short. Must be at least 3 characters.",
      });
    } else if (val.length > 12) {
      setFormError({ ...formError, errName: "Too long. Keep it concise." });
      return;
    }

    //fixing the issue of isAlphanumeric condition check, when removing the text
    if (val === "") {
      setFormObject({ ...formObject, username: val });
      return;
    }

    //checking whether the input is alphanumeric or not
    if (!isAlphanumeric(val)) {
      setFormError({
        ...formError,
        errName: "Letters and numbers only.",
      });
      return;
    }

    //updating the state with the current input
    setFormObject({ ...formObject, username: val });
  };

  //function to take email input and validate it
  const validatingEmail = (event) => {
    const val = event.target.value;

    //rejecting the input if the formState is 'failed'
    if (formState === "failed") return;

    //resetting the state to avoid errors when not needed
    setFormError({ ...formError, errEmail: "" });

    //checking the whether email is valid or not
    if (!isEmail(val)) {
      setFormError({ ...formError, errEmail: "Invalid email" });
    }

    //rejecting the input if the email is so much longer
    if (val.length >= 35) {
      setFormError({
        ...formError,
        errEmail: "Too many characters. Try again.",
      });
      return;
    }

    //updating the state
    setFormObject({ ...formObject, email: val });
  };

  //function to validate the pass
  const validatingPassword = (event) => {
    const val = event.target.value;

    //rejecting the input if the confirmed pass is filled
    if (formObject.confirmPass) return;
    // #tip: solve the issue that user knows why we are not allowing them to enter values

    //rejecting the input if the formState is 'failed'
    if (formState === "failed") return;

    //resetting the state
    setFormError({ ...formError, errPass: "" });

    //checking the length
    if (val.length <= 14) {
      setFormError({
        ...formError,
        errPass: "Must be 14+ characters.",
      });
    } else if (val.length >= 40) {
      setFormError({
        ...formError,
        errPass: "Too many characters. Try again.",
      });
      return;
    }

    //setting the state
    setFormObject({ ...formObject, password: val });
  };

  //function to validate the confirmed pass
  const validatingConfirmPass = (event) => {
    const val = event.target.value;

    //rejecting the input if the formState is 'failed'
    if (formState === "failed") return;

    //resetting the state
    setFormError({ ...formError, errConfirmPass: "" });

    //checking whether the password is same or not
    if (formObject.password !== val) {
      setFormError({
        ...formError,
        errConfirmPass: "Both passwords must match.",
      });
    }

    //setting the state
    setFormObject({ ...formObject, confirmPass: val });
  };

  //checking whether to enable submit button or not (using derived state)
  let disableSubmitButton = true;
  if (
    !formError.errName &&
    !formError.errEmail &&
    !formError.errPass &&
    !formError.errConfirmPass &&
    formObject.username.length >= 3 &&
    formObject.email.length >= 5 &&
    formObject.password.length >= 14 &&
    formObject.confirmPass.length >= 14 &&
    enableCheckbox === true
  ) {
    disableSubmitButton = false;
  }

  //submitting the form and sending the request to the server
  const serverTalkSignup = async (event) => {
    //removing the browser default behaviour
    event.preventDefault();

    //checking which form submit click what should do
    if (formState === "failed") {
      //rolling everything back to normal
      setIsFormState("normal");
      setFormObject({ username: "", email: "", password: "", confirmPass: "" });
      setServerErr("");
    } else {
      try {
        setIsFormState("setting-up");

        //talking begins with the server
        const response = await fetch(
          "https://unconstructed-marisha-nonantagonistic.ngrok-free.dev/signAuth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formObject.username,
              useremail: formObject.email,
              userpass: formObject.password,
              userconpass: formObject.confirmPass,
            }),
          },
        );

        //converting the json into js object
        const dataRecieved = await response.json();
        await sleep(3000);

        // moving the window to top to cue the user when error occurs
        if (!dataRecieved.success) {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          setIsFormState("failed");
          setServerErr(dataRecieved.message);
        } else {
          setHasSentMailFunc(true);
        }
      } catch (error) {
        setIsFormState("failed");
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        setServerErr(error.message);
      }
    }
  };

  return (
    <div
      className={twMerge(
        "bg-white border border-brand-fourth shadow-lg w-md p-8 rounded-lg overflow-clip max-phone:w-[92%] max-phone:px-5 max-phone:py-7",
        formState === "setting-up" && "relative",
        formState === "failed" && "border-[#ef4444]",
      )}
    >
      {/* a loader when the form is submitted */}
      {formState === "setting-up" && (
        <div className="absolute bg-[#f7f7fe]/60 z-10 inset-0 pointer-events-auto">
          <BarLoader color="#4f46e5" width={460} />
        </div>
      )}

      {/* Form Begins */}
      <FaUserPlus
        className={twMerge(
          "flex justify-self-center p-3 mb-6 rounded-lg bg-[#eef2ff] text-brand-tertionary",
          formState === "failed" &&
            "text-[#ef4444] bg-[#fef2f2] border-[#fee2e2] border",
        )}
        size={50}
      />
      <h2 className="text-center text-brand-primary text-2xl font-bold mb-2">
        Create Your Account
      </h2>
      <p className="text-center text-brand-secondary text-base mb-8">
        Join ThinkTweet to unlock deep tweet analysis.
      </p>
      <form onSubmit={(e) => serverTalkSignup(e)}>
        {/* Enter your name */}
        <div className="mb-4">
          <label className={label}>Name</label>
          <div
            className={twMerge(
              container,
              formState === "failed" && "border-[#ef4444]",
            )}
          >
            <FaRegUser className={icon} size={14} />
            <input
              value={formObject.username}
              onChange={(e) => validatingName(e)}
              className={input}
              type="text"
              placeholder="Enter your username"
              required
            />
          </div>
          {formError.errName && (
            <p className={errBox}>
              <MdOutlineError />
              {formError.errName}
            </p>
          )}
        </div>

        {/* Enter you email */}
        <div className="mb-4">
          <label className={label}>Email Address</label>
          <div
            className={twMerge(
              container,
              formState === "failed" && "border-[#ef4444]",
            )}
          >
            <MdAlternateEmail className={icon} size={18} />
            <input
              value={formObject.email}
              onChange={(e) => validatingEmail(e)}
              className={input}
              type="text"
              placeholder="Enter your email"
              required
            />
          </div>
          {formError.errEmail && (
            <p className={errBox}>
              <MdOutlineError />
              {formError.errEmail}
            </p>
          )}
        </div>

        {/* Create your Password */}
        <div className="mb-4">
          <label className={label}>Password</label>
          <div
            className={twMerge(
              container,
              formState === "failed" && "border-[#ef4444]",
            )}
          >
            <MdLockOutline className={icon} size={19} />
            <input
              className={input}
              type={openEye ? "text" : "password"}
              placeholder="Create your password"
              value={formObject.password}
              onChange={(e) => validatingPassword(e)}
              required
            />
            <div
              className="hover:cursor-pointer text-brand-secondary"
              onClick={() => (openEye ? setOpenEye(false) : setOpenEye(true))}
            >
              {openEye ? <FaRegEye size={18} /> : <FaRegEyeSlash size={17} />}
            </div>
          </div>
          {formError.errPass && (
            <p className={errBox}>
              <MdOutlineError />
              {formError.errPass}
            </p>
          )}
        </div>

        {/* Re-enter your pass */}
        <div className="mb-4">
          <label className={twMerge(label, "select-none")}>
            Confirm Password
          </label>
          <div
            className={twMerge(
              container,
              formState === "failed" && "border-[#ef4444]",
            )}
          >
            <MdLockOutline className={icon} size={19} />
            <input
              className={input}
              type="password"
              placeholder="Re-enter your password"
              value={formObject.confirmPass}
              onChange={(e) => validatingConfirmPass(e)}
              required
            />
          </div>
          {formError.errConfirmPass && (
            <p className={errBox}>
              <MdOutlineError />
              {formError.errConfirmPass}
            </p>
          )}
        </div>

        {/* TOS and PP */}
        <div className="flex gap-2 mb-4 mt-6">
          <input
            checked={enableCheckbox}
            type="checkbox"
            onChange={(e) => setEnableCheckbox(e.target.checked)}
            className="self-start mt-1 border-brand-secondary accent-brand-tertionary hover:cursor-pointer"
            required
          />
          <p className="text-sm text-brand-secondary">
            I agree to ThinkTweet's{" "}
            <span className="text-brand-tertionary hover:cursor-pointer hover:underline">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-brand-tertionary hover:cursor-pointer hover:underline">
              Privacy Policy
            </span>
          </p>
        </div>

        {/* Showing the error state */}
        {formState === "failed" && (
          <div className="border border-[#fca5a5] bg-[#fef2f2] rounded-lg p-4 flex gap-3">
            <MdOutlineError
              className="size-12 bg-[#fee2e2] animate-pulse h-max p-1.5 rounded-full mt-1"
              color="#ef4444"
            />
            <div>
              <h5 className="font-semibold text-[0.93rem] mb-1 text-[#dc2626]">
                Error: {serverErr}
              </h5>
              <p className="text-sm text-[#ef4444]">
                We couldn't create your account. Please review the error and try
                again.
              </p>
            </div>
          </div>
        )}

        {/* Button to submit the form */}
        <button
          disabled={disableSubmitButton}
          className={twMerge(
            "w-full p-3 mt-6 text-[0.95rem] rounded-lg bg-brand-tertionary text-white duration-400 ease-out hover:cursor-pointer hover:-translate-y-1 hover:to-brand-tertionary-hover",
            disableSubmitButton && "opacity-60 hover:cursor-not-allowed",
            formState === "failed" && "bg-[#ef4444] hover:bg-[#c03939]",
          )}
          type="submit"
        >
          {/* Changing the button according the form state conditon */}
          {formState === "normal" && (
            <span className={buttonSubmit}>
              <FaRocket /> Create Account{" "}
            </span>
          )}
          {formState === "setting-up" && (
            <span className={twMerge(buttonSubmit, "animate-pulse")}>
              <PuffLoader size={22} color="white" />
              Setting up account...
            </span>
          )}
          {formState === "failed" && (
            <span className={buttonSubmit}>
              <MdOutlineRefresh size={18} />
              Try Again
            </span>
          )}
        </button>
      </form>

      {/* Guiding the user */}
      <p className="mt-4 text-center text-sm text-brand-secondary">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-brand-tertionary hover:cursor-pointer hover:underline"
          href=""
        >
          Log In
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
