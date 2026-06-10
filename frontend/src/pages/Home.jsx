import React from "react";
import { useState, useEffect } from "react";

const App = () => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dataText: text,
        }),
      });
      alert("Data Sent to Server");

      const serverReply = await response.json();
      console.log(serverReply.message);

      setText("");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="h-screen flex flex-col items-center justify-center"
      >
        <textarea
          className="w-2xs mb-8 border border-amber-800 text-amber-50"
          name=""
          id=""
          placeholder="Enter your tweet here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="text-white border-2 px-2.5 py-1 border-amber-950 rounded-md bg-red-800 cursor-pointer hover:bg-red-700"
        >
          Click
        </button>
      </form>
    </div>
  );
};

export default App;
