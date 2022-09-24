import React from "react";
import StepperNavigation from "./stepper_navigation/StepperNavigation";
import StepperContent from "./stepper_content/StepperContent";
import StepperActions from "./stepper_actions/StepperActions";
import { StepperProvider } from "../../providers/StepperProvider";
import "./Stepper.css";

const Stepper = () => {
  return (
    <div className="stepper">
      <StepperProvider>
        <StepperNavigation />
        <StepperContent />
        <StepperActions />
      </StepperProvider>
    </div>
  );
};

export default Stepper;
