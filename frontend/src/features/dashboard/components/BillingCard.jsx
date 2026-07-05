import React from "react";
import { FaReceipt } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";

const BillingCard = ({purData}) => {
  return (
    <div className="border p-4 rounded-lg bg-white shadow-md hover:shadow-xl border-[#e2e8f0]">
      <div>
        <div className="flex mb-4">
          <FaReceipt
            className="rounded-lg p-2 bg-[#f1f5f9] text-brand-secondary"
            size={30}
          />
          <p className="self-center ml-auto bg-[#f1f5f9] text-brand-secondary border-[#e2e8f0] text-xs border px-3 p-0.5 rounded-xl">
            Billing
          </p>
        </div>
        <p className="text-2xl mt-8 mb-2 text-brand-primary">{!purData ? "No purchase yet" : `${purData.date}`}</p>
        <p className="text-[0.9rem] mb-4 text-brand-secondary">Last Credit Purchase</p>
      </div>
      <div className="border-t border-[#e2e8f0] pt-4">
        <p className="flex items-center gap-2 text-xs text-brand-secondary">
          <FaHistory size={11} />
          {purData
            ? `${purData.credits} credits. ${purData.amount} charged`
            : "Last purchase history will appear"}
        </p>
      </div>
    </div>
  );
};

export default BillingCard;
