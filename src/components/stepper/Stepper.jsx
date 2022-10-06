import PropTypes from "prop-types";
import StepperNavigation from "./StepperNavigation/StepperNavigation";
import StepperContent from "./StepperСontent/StepperContent";
import StepperActions from "./StepperActions/StepperActions";
// import { StepperProvider } from "./providers/StepperProvider";
import useStepper from "./hooks/useStepper";
import "./stepper.css";

const Stepper = ({ steps }) => {
  const { activeStepIndex, nextStep, prevStep } = useStepper(steps);

  return (
    //   <StepperProvider>
    <div className="stepper">
      <StepperNavigation steps={steps} activeStepIndex={activeStepIndex} />
      <StepperContent>{steps[activeStepIndex].content}</StepperContent>
      <StepperActions
        onNext={nextStep}
        onPreviouse={prevStep}
        prevDisabled={activeStepIndex === 0}
        finishStep={activeStepIndex === steps.length - 1}
      />
    </div>
    //  </StepperProvider>
  );
};

Stepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string.isRequired,
      content: PropTypes.element.isRequired,
      validate: PropTypes.func,
      description: PropTypes.string,
    })
  ).isRequired,
  activeStepIndex: PropTypes.number,
};

export default Stepper;
