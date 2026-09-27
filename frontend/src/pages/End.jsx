import React from 'react'
import YouHaveReachedEnd from '../features/end/YouHaveReachedEnd'
import WhatsComing from '../features/end/WhatsComing'

const End = () => {

  //title of the document
  document.title = "You have reached death"
  return (
    <div className="py-15 px-10 bg-[#f8fafc] max-md:px-8 max-phone:px-4">
      <YouHaveReachedEnd />
      {/* <WhatsComing /> */}
    </div>
  );
}

export default End