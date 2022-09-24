import React from "react";
import StepperNavigation from "./stepper_navigation/StepperNavigation";
import StepperContent from "./stepper_content/StepperContent";
import StepperActions from "./stepper_actions/StepperActions";
import PlayGround from "../screens/play_load/PlayGround";
import Step from "./stepper_navigation/step/Step";
import "./Stepper.css";

const Stepper = () => {
  return (
    <div className="stepper">
      <StepperNavigation>
        <Step title={"title "} stepIndex={1} active={true} />
        <Step title={"title"} stepIndex={2} />
      </StepperNavigation>
      <StepperContent>
        <PlayGround />
      </StepperContent>
      <StepperActions />
    </div>
  );
};

export default Stepper;
