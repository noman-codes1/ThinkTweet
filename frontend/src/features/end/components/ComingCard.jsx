import React from "react";
import { FaMagic } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { MdGroups } from "react-icons/md";

const ComingCard = ({ id, head, content }) => {
  return (
    <div>
      {id === 0 ? (
        <FaMagic />
      ) : (
        <span>{id === 1 ? <GoGraph /> : <MdGroups />}</span>
      )}
      <h2>{head}</h2>
      <p>{content}</p>
    </div>
  );
};

export default ComingCard;
