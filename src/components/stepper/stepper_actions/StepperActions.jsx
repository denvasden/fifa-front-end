import React from "react";
import BasicButton from "../../UI/basic_button/BasicButton";
import "./StepperActions.css";

const StepperActions = () => {
  return (
    <div className="stepper-actions">
      <BasicButton disabled={true}>prev</BasicButton>
      <BasicButton>next</BasicButton>
    </div>
  );
};

export default StepperActions;
