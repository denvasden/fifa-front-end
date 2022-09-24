import React from "react";
import PlayGround from "../../screens/play_grounds/PlayGround";
import PlayGround1 from "../../screens/play_grounds/PlayGround1";
import PlayGround2 from "../../screens/play_grounds/PlayGround2";
import PlayGround3 from "../../screens/play_grounds/PlayGround3";
import useStepperContext from "../../../hooks/useStepperContext";

import "./StepperContent.css";

const StepperContent = (props) => {
  const { getIndexActiveStep } = useStepperContext();
  const indexActiveStep = getIndexActiveStep();
  return (
    <div className="stepper-content">
      {indexActiveStep === 0 && <PlayGround />}
      {indexActiveStep === 1 && <PlayGround1 />}
      {indexActiveStep === 2 && <PlayGround2 />}
      {indexActiveStep === 3 && <PlayGround3 />}
    </div>
  );
};

export default StepperContent;
