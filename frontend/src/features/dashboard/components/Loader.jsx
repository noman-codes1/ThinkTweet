import React from "react";
import { PacmanLoader } from "react-spinners";
import { useState, useRef, useEffect } from "react";

//static variable
const pharases = [
  "Reviewing the request...",
  "Extracting text from the tweet...",
  "Quering your request to the LLM...",
  "Crafting the final response...",
  "Updating the database...",
  "Almost done...",
];

const Loader = () => {
  //using state
  const [content, setContent] = useState("");

  //storing the timer id so that it doesn't get lost...
  const timer = useRef(null);

  //running the timer when mounting and cleanup when unmounting
  useEffect(() => {
    setContent("Connecting to the server...");
    let i = 0;
    timer.current = setInterval(() => {
      //returning if the all the phrases are gone
      if (i === 6) return;

      setContent(pharases[i]);
      i = i + 1;
    }, 2000);

    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return (
    <div className="border border-brand-fourth bg-white h-56 mt-5 rounded-xl flex justify-center items-center flex-col">
      <PacmanLoader
        className="mb-4"
        color="#4f46e5"
        size={40}
      />
      {/* WORKING HERE */}
      <p className="mt-2 animate-pulse text-brand-secondary">{content}</p>
    </div>
  );
};

export default Loader;
