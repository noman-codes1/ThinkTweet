import React from 'react'
import Hero from '../features/marketing/Hero';
import Methodology from '../features/marketing/Methodology';

const Home = () => {

  //give the title of the page
  document.title = "Home - ThinkTweet"
  return (
    <div>
      <Hero/>
      <Methodology/>
    </div>
  );
}

export default Home