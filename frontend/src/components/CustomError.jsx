import React from 'react'

const CustomError = ({content}) => {
  return (
    <div className="h-screen text-4xl p-2 bg-[#f8fafc] text-brand-secondary">
      {content}
    </div>
  );
}

export default CustomError