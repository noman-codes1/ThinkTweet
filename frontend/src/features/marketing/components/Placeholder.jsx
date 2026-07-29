import React from 'react'
import placeholder from "../../../assets/placeholder.jpeg"
// please write the address in a clean way. #tip : use vite alias

const Placeholder = () => {
  return (
    <div className="h-90 w-3xl aspect-video max-lg:h-auto max-lg:w-[70%] max-lg:mx-auto max-md:w-[90%]">
      <img className="size-full object-cover rounded-lg" src={placeholder} alt="" />
    </div>
  );
}

export default Placeholder