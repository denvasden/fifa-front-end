import React from "react";
import BasicButton from "../../UI/basic_button/BasicButton";
import useStepperContext from "../../../hooks/useStepperContext";
import "./StepperActions.css";

const StepperActions = () => {
  const { getIndexActiveStep, steps, nextStep, prevStep } = useStepperContext();

  const indexActiveStep = getIndexActiveStep();

  const nextDisabled = indexActiveStep === steps.length - 1 ? true : false;
  const prevDisabled = indexActiveStep === 0 ? true : false;

  function handleNext() {
    nextStep(indexActiveStep);
  }

  function handlePrev() {
    prevStep(indexActiveStep);
  }

  return (
    <div className="stepper-actions">
      <BasicButton disabled={prevDisabled} handler={handlePrev}>
        prev
      </BasicButton>
      <BasicButton disabled={nextDisabled} handler={handleNext}>
        next
      </BasicButton>
    </div>
  );
};

export default StepperActions;
