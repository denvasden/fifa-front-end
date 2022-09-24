import React from "react";
import "./Step.css";

const Step = ({ title, description, stepIndex, active }) => {
  const StepNum = `Step ${stepIndex}`;
  const stylesToStep = active ? "step step__active" : "step";
  return (
    <div className={stylesToStep}>
      <div className="step__number"> {stepIndex}</div>
      <div className={"step__title-description"}>
        <p>
          {StepNum} {title}
        </p>
        {description && (
          <p>
            {StepNum} {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Step;
