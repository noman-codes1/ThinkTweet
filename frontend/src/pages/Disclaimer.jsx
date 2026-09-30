import React from 'react'
import Headline from '../features/disclaimer-page/Headline';
import ContentContainerOfDisclaimer from '../features/disclaimer-page/ContentContainerOfDisclaimer';
import { FaArrowUp } from "react-icons/fa6";

const Disclaimer = () => {

  //giving the title of page
  document.title = "Disclaimer - ThinkTweet"

  //function to scroll to the top
  const scrollToTop = () =>{
    window.scrollTo({top:0, left:0, behavior: 'smooth'})
  }
  
  return (
    <div className="py-15 px-10 max-md:px-5 bg-[#f8fafc]">
      <Headline />
      <ContentContainerOfDisclaimer />
      <button
        className="flex gap-1 items-center mt-10 justify-self-center text-brand-secondary hover:text-brand-tertionary-hover hover:cursor-pointer"
        onClick={() => scrollToTop()}
      >
        <FaArrowUp size={13}/> Back to Top
      </button>
    </div>
  );
}

export default Disclaimer