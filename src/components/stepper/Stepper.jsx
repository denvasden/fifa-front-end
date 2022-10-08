import PropTypes from "prop-types";
import StepperNavigation from "./StepperNavigation/StepperNavigation";
import StepperContent from "./StepperСontent/StepperContent";
import StepperActions from "./StepperActions/StepperActions";
import useStepper from "./hooks/useStepper/useStepper";
import { withScreenData } from "../hoc/withScreenData";
import "./stepper.css";

const Stepper = ({ steps }) => {
  const {
    activeStepIndex,
    nextStep,
    prevStep,
    getScreenData,
    initialScreenState,
  } = useStepper(steps);

  return (
    <div className="stepper">
      <StepperNavigation steps={steps} activeStepIndex={activeStepIndex} />
      <StepperContent>
        {withScreenData(
          steps[activeStepIndex].content,
          getScreenData,
          initialScreenState
        )}
      </StepperContent>
      <StepperActions
        onNext={nextStep}
        onPreviouse={prevStep}
        prevDisabled={activeStepIndex === 0}
        finishStep={activeStepIndex === steps.length - 1}
      />
    </div>
  );
};

Stepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string.isRequired,
      content: PropTypes.elementType.isRequired,
      validate: PropTypes.func,
      description: PropTypes.string,
    })
  ).isRequired,
  activeStepIndex: PropTypes.number,
};

export default Stepper;
