import React from 'react'

const Disclaimer = () => {

  //giving the title of page
  document.title = "Disclaimer - ThinkTweet"
  
  return (
    <div className="h-screen bg-[#f1f3fb]">
      <h1 className="text-6xl mb-5">Disclaimer</h1>
      <p>
        Note: This page is{" "}
        <span className="underline font-bold">under development</span>. Check back later
      </p>
    </div>
  );
}

export default Disclaimer