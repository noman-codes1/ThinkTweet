import React from "react";
import { useState } from "react";

const Analyze = () => {
  const [url, setUrl] = useState("");
  const [validateUrl, setValidateUrl] = useState(false);
  const [analyzeButton, setAnalyzeButton] = useState(false)

  //function to validate url in the real time
  const handleUrl = (event) => {
    const inputValue = event.target.value
    if (inputValue.length>=14 && !inputValue.startsWith("https://x.com/")) {
        alert("Incorrect url.")
        setUrl("")
        return
    } else if (url.length === 14) {
        //pending logic
        // setAnalyzeButton(true) 
    }
    setUrl(inputValue)
  };

  //function to handle the validation on paste
  const handleValidationOnPaste = (event) =>{
    console.log("Entered onPaste Validation")
    const pastedText = event.clipboardData.getData("text")
    if(!pastedText.startsWith("https://x.com/")){
        event.preventDefault()
        alert("Validation Failed")
    }
  }

  //function to talk to the server
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
        console.log("Data is about to send to the server")
        const response = await fetch("http://localhost:3000/tweet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url : url
          }),
        });

        const reply = await response.json();
        setUrl("")
        console.log(reply);
    } catch (error) {
        console.log(error)
        setUrl("")
    }
  };

  return (
    <div>
      <div className="px-40">
        <p className="text-red-50 mb-3">Analysis Engine</p>
        <h2 className="text-red-300 mb-3 text-2xl">Analyze a Tweet</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            onChange={(e) => handleUrl(e)}
            onPaste={(e) => handleValidationOnPaste(e)}
            value={url}
            className="border-2 border-amber-100 text-violet-50 mr-3 px-3 py-1 rounded-md"
            placeholder="Enter your x.com link"
            type="text"
          />
          <button
            className="text-blue-700 border-2 px-3 py-1 rounded-md cursor-pointer hover:text-blue-800"
            type="submit"
          >
            Analyze
          </button>
        </form>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Analyze;
