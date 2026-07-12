import React from 'react'
import { BsLightningChargeFill } from "react-icons/bs";

const MiniHeader = () => {
  return (
    <h4 className="flex items-center mb-4 text-brand-primary font-semibold">
      <BsLightningChargeFill
        className="p-1.5 mr-2 rounded-md bg-brand-tertionary text-white"
        size={28}
      />
      Think<span className="text-brand-tertionary">Tweet</span>
    </h4>
  );
}

export default MiniHeader