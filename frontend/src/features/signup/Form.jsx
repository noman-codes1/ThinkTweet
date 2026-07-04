import React from "react";
import { FaUserPlus, FaRocket } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash, FaRegUser } from "react-icons/fa6";
import { useState } from "react";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { isEmail, isAlphanumeric } from "validator";
import { twMerge } from "tailwind-merge";
import { BarLoader, PuffLoader } from "react-spinners";


// WE WILL COME BACK TO THIS BECAUSE, THERE ARE LOTS OF LOGICAL ISSUES

//variable for the class
const label = "text-sm text-brand-primary font-semi-bold";
const container =
  "flex bg-[#f8fafc] gap-2 mt-2 mb-1 border items-center p-2 px-3 rounded-lg border-brand-secondary focus-within:outline-brand-tertionary-hover focus-within:outline focus-within:shadow-2xl";
const icon = "text-brand-secondary";
const input = "text-sm focus:outline-none text-brand-primary w-full";

const Form = ({ handleSubmit }) => {
  //using the react variable
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  //func for checker
  const checkError = () => {
    //checking if there are any errors...
    for (const value of Object.values(formError)) {
      if (value !== "") return true;
    }
  };

  //func for onsubmit form
  const onSubmitFormFunc = (e) => {
    e.preventDefault();

    console.log("Hey");
    if (checkError() === true) return

    setIsSubmitting(true);
    const name = formObject.username;
    const email = formObject.email;
    const pass = formObject.password;
    const conPass = formObject.confirmPass;

    handleSubmit(name, email, pass, conPass);
  };

  //func to handle name input
  const nameInputFunc = (event) => {
    const val = event.target.value;

    //setting the state
    // SOLVE REACT SCHEDULING (async) IN THESE HERE
    setFormError({ ...formError, errName: "" });

    if (val === "") {
      setFormObject({ ...formObject, username: val });
      return;
    }

    if (!isAlphanumeric(val)) {
      setFormError({ ...formError, errName: "Special Characters not allowed" });
      return;
    }
    if (val.length >= 15) {
      setFormError({
        ...formError,
        errName: "Longer username detected. Not allowed",
      });
      return;
    }
    setFormObject({ ...formObject, username: val });

    if (val.length <= 3) {
      setFormError({
        ...formError,
        errName: "Must be greater than 3 character",
      });
    }
  };

  //fn to for email input
  const emailInputFunc = (event) => {
    const val = event.target.value;

    //reseting the state
    setFormError({ ...formError, errEmail: "" });

    //handling the user is removing the charac
    if (val === "") {
      setFormObject({ ...formObject, email: val });
      return;
    }

    //validation for length
    if (val.length <= 10) {
      setFormError({
        ...formError,
        errEmail: "Must be greater than 10 character",
      });
    } else if (val.length >= 35) {
      setFormError({
        ...formError,
        errEmail: "Character limit exceeded. Use different email.",
      });
      return;
    } else if (!isEmail(val)) {
      setFormError({
        ...formError,
        errEmail: "Invalid Email",
      });
    }
    setFormObject({ ...formObject, email: val });
  };

  //handling pass
  const passInputFunc = (event) => {
    const val = event.target.value;

    //reseting the state
    setFormError({ ...formError, errPass: "" });

    if (val === "") {
      setFormObject({ ...formObject, password: val });
      return;
    }

    //checking the length
    if (val.length <= 14) {
      setFormError({ ...formError, errPass: "Must be atleast 14 character" });
    } else if (val.length > 35) {
      setFormError({
        ...formError,
        errPass: "Very long password detected. Action not allowed",
      });
      return;
    }
    setFormObject({ ...formObject, password: val });
  };

  //fucntion for the confirm password
  const confirmPassInputFunc = (event) => {
    const val = event.target.value;

    //setting the error state
    setFormError({ ...formError, errConfirmPass: "" });

    if (val !== formObject.password) {
      setFormError({ ...formError, errConfirmPass: "Password not matched" });
    }
    setFormObject({ ...formObject, confirmPass: val });
  };

  return (
    <div
      className={twMerge(
        "bg-white border-brand-secondary shadow-lg w-md p-8 rounded-lg overflow-hidden",
        isSubmitting && "relative",
      )}
    >
      {isSubmitting && (
        <div className="absolute bg-[#f7f6fe]/50 z-100 inset-0 pointer-events-auto rounded-lg">
          <BarLoader className="mb-8" color="#4f46e5" width={450} />
        </div>
      )}
      <FaUserPlus
        className="flex justify-self-center p-3 mb-6 rounded-lg bg-[#eef2ff] text-brand-tertionary"
        size={50}
      />
      <h2 className="text-center text-brand-primary text-2xl font-bold mb-2">
        Create Your Account
      </h2>
      <p className="text-center text-brand-secondary text-base mb-8">
        Join ThinkTweet to unlock deep tweet analysis.
      </p>
      <form onSubmit={(e) => onSubmitFormFunc(e)}>
        {/* Name */}
        <div className="mb-4">
          <label className={label}>Name</label>
          <div className={container}>
            <FaRegUser className={icon} size={14} />
            <input
              value={formObject.username}
              onChange={(e) => nameInputFunc(e)}
              className={input}
              type="text"
              placeholder="Enter your username"
              required
            />
          </div>
          {formError.errName && (
            <p className="text-xs pl-1 text-[#dc2626]">{formError.errName}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className={label}>Email Address</label>
          <div className={container}>
            <MdAlternateEmail className={icon} size={18} />
            <input
              value={formObject.email}
              onChange={(e) => emailInputFunc(e)}
              className={input}
              type="text"
              placeholder="Enter your email"
              required
            />
          </div>
          {formError.errEmail && (
            <p className="text-xs pl-1 text-[#dc2626]">{formError.errEmail}</p>
          )}
        </div>

        {/* Create your Password */}
        <div className="mb-4">
          <label className={label}>Password</label>
          <div className={container}>
            <MdLockOutline className={icon} size={18} />
            <input
              className={input}
              type={openEye ? "text" : "password"}
              placeholder="Create your password"
              value={formObject.password}
              onChange={(e) => passInputFunc(e)}
              required
            />
            <div
              className="hover:cursor-pointer text-brand-secondary"
              onClick={() => (openEye ? setOpenEye(false) : setOpenEye(true))}
            >
              {openEye ? <FaRegEye size={14} /> : <FaRegEyeSlash size={14} />}
            </div>
          </div>
          {formError.errPass && (
            <p className="text-xs pl-1 text-[#dc2626]">{formError.errPass}</p>
          )}
        </div>

        {/* Re-enter pass */}
        <div className="mb-4">
          <label className={label}>Confirm Password</label>
          <div className={container}>
            <MdLockOutline className={icon} size={18} />
            <input
              className={input}
              type="password"
              placeholder="Re-enter your password"
              value={formObject.confirmPass}
              onChange={(e) => confirmPassInputFunc(e)}
              required
            />
            <FaRegEyeSlash className="text-brand-secondary" size={16} />
          </div>
          {formError.errConfirmPass && (
            <p className="text-xs pl-1 text-[#dc2626]">
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
          />
          <p className="text-sm">
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

        <button
          disabled={!checkError()}
          className={twMerge(
            "w-full p-3 gap-2 mt-6 text-[0.95rem] rounded-lg bg-brand-tertionary text-white duration-400 ease-out hover:cursor-pointer hover:-translate-y-1 hover:to-brand-tertionary-hover",
            checkError() && "opacity-60 hover:cursor-not-allowed",
          )}
          type="submit"
        >
          {isSubmitting ? (
            <span className="flex justify-center items-center gap-2">
              <PuffLoader size={22} color="white" />
              Setting up account...
            </span>
          ) : (
            <span className="flex items-center gap-2 justify-center">
              <FaRocket /> Create Account{" "}
            </span>
          )}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <a
          onClick={(e) => e.preventDefault()}
          className="text-brand-tertionary hover:cursor-pointer hover:underline"
          href=""
        >
          Log In
        </a>
      </p>
    </div>
  );
};

export default Form;
