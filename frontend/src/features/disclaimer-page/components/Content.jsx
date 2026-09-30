import React from "react";
import { twMerge } from "tailwind-merge";

const Content = ({
  contentNum,
  contentHeading,
  contentParaOne,
  contentParaTwo,
  contentParaThree,
}) => {
  return (
    <div>
      <h3
        className={twMerge(
          "text-xl mb-3 mt-10 font-bold text-brand-primary",
          contentNum === 1 && "mt-0",
        )}
      >{`${contentNum}. ${contentHeading}`}</h3>
      <p
        className={twMerge(
          "text-brand-secondary",
          contentNum === 14 && "inline",
        )}
      >
        {contentParaOne}
      </p>
      {contentParaTwo && <p className="mt-3 text-brand-secondary">{contentParaTwo}</p>}
      {contentParaThree && <p className="mt-3 text-brand-secondary">{contentParaThree}</p>}
      {contentNum === 14 && (
        <span className="text-brand-tertionary hover:text-brand-tertionary-hover hover:underline hover:cursor-pointer">
          {" "}
          hi@meetnoman.com
        </span>
      )}
    </div>
  );
};

export default Content;
