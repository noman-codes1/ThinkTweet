import React from "react";
import Card from "./components/Card";
import GettingStartedBtn from "./components/GettingStartedBtn";
import { array } from "./variable/data";
import { FaMicroscope } from "react-icons/fa";

const Methodology = () => {
  return (
    <div className="bg-[#f8fafc] py-25 max-phone:py-15">

      {/* Methodology dialog */}
      <p className="text-center flex gap-2 justify-self-center bg-[#e4e4f9] text-brand-tertionary p-1 px-4 rounded-2xl text-sm tracking-wider mb-6">
        <FaMicroscope className="self-center" size={13} />
        Our Methodology
      </p>
      <h2 className="text-center text-4xl font-bold text-brand-primary mb-4 max-phone:text-3xl max-phone:mx-5">
        The 5 Core Analysis Parameters
      </h2>
      <p className="leading-7.5 text-center mx-65 text-lg text-brand-secondary mb-12 max-xl:mx-50 max-lg:mx-20 max-md:mx-5">
        Our AI engine evaluates every tweet across five distinct dimensions,
        providing a structured, rigorous breakdown of language and argumentation
        within the gender domain.
      </p>

      {/* Explanation of parameters */}
      <div className="grid grid-cols-3 ml-10 mr-10 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:mx-5">
        {array.map((elem) => {
          return (
            <Card
              key={elem.num}
              index={elem.num}
              iconBox={elem.icon}
              titleColor={elem.color}
              title={elem.name}
              descr={elem.details}
            />
          );
        })}
      </div>
      <p className="mt-10 text-center text-[0.95rem] mb-4 text-brand-secondary max-phone:mx-5">
        Ready to see all five parameters applied to real tweets?
      </p>

      {/* Buttons to navigate */}
      <div className="flex justify-center">
        <GettingStartedBtn />
      </div>
    </div>
  );
};

export default Methodology;
