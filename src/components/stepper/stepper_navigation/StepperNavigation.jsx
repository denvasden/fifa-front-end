import React from "react";
import "./StepperNavigation.css";
import Step from "./step/Step";
import useStepperContext from "../../../hooks/useStepperContext";

const StepperNavigation = () => {
  const stepper = useStepperContext();

  return (
    <div className="stepper-navigation">
      {stepper.steps.map((step, index) => (
        <Step
          title={step.title}
          key={step.id}
          stepIndex={index + 1}
          active={step.active}
          description={step.description}
        />
      ))}
    </div>
  );
};

export default StepperNavigation;
