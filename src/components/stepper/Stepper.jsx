import React from "react";
import PropTypes from "prop-types";
import StepperNavigation from "./StepperNavigation/StepperNavigation";
import StepperContent from "./StepperСontent/StepperContent";
import StepperActions from "./StepperActions/StepperActions";
// import { StepperProvider } from "./providers/StepperProvider";
import useStepper from "./hooks/useStepper";
import "./stepper.css";

const Stepper = ({ initialData }) => {
  const amountSteps = initialData.length;
  const { activeIndex, nextStep, prevStep } = useStepper(amountSteps);

  return (
    //   <StepperProvider>
    <div className="stepper" >
      <StepperNavigation initialData={initialData} activeIndex={activeIndex} />
      <StepperContent>{initialData[activeIndex].content}</StepperContent>
      <StepperActions
        nextStep={nextStep}
        prevStep={prevStep}
        prevDisabled={activeIndex === 0}
        finish={activeIndex === amountSteps - 1}
        validation={initialData[activeIndex].validation}
      />
    </div>
    //  </StepperProvider>
  );
};

Stepper.propTypes = {
  initialData: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string.isRequired,
      content: PropTypes.element.isRequired,
      validation: PropTypes.func,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default Stepper;
