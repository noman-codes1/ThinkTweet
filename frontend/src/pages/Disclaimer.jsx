import React from 'react'
import Headline from '../features/disclaimer-page/Headline';
import ContentContainerOfDisclaimer from '../features/disclaimer-page/ContentContainerOfDisclaimer';

const Disclaimer = () => {

  //giving the title of page
  document.title = "Disclaimer - ThinkTweet"

  //function to scroll to the top
  const scrollToTop = () =>{
    window.scrollTo({top:0, left:0, behavior: 'smooth'})
  }
  
  return (
    <div>
      <Headline />
      <ContentContainerOfDisclaimer />
      <button onClick={() => scrollToTop()}>Back to Top</button>
    </div>
  );
}

export default Disclaimer