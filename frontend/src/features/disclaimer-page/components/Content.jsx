import React from "react";

const Content = ({
  contentNum,
  contentHeading,
  contentParaOne,
  contentParaTwo,
  contentParaThree,
}) => {
  return (
    <div>
      <h3>{`${contentNum}. ${contentHeading}`}</h3>
      <p>{contentParaOne}</p>
      {contentParaTwo && <p>{contentParaTwo}</p>}
      {contentParaThree && <p>{contentParaThree}</p>}
      {contentNum === 13 && <span>hi@meetnoman.com</span>}
    </div>
  );
};

export default Content;
