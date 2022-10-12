import PropTypes from "prop-types";
import StepperNavigation from "./components/StepperNavigation";
import StepperContent from "./components/StepperСontent/StepperContent";
import StepperActions from "./components/StepperActions/StepperActions";
import { useStepperContext } from "./hooks/";
import "./stepper.css";

const Stepper = ({ steps }) => {
  const {
    activeStepIndex,
    nextStep,
    prevStep,
    content,
    prevDisabled,
    finishStep,
  } = useStepperContext();
  return (
    <div className="stepper">
      <StepperNavigation steps={steps} activeStepIndex={activeStepIndex} />
      <StepperContent>{content}</StepperContent>
      <StepperActions
        onNext={nextStep}
        onPreviouse={prevStep}
        isFinishStep={finishStep}
        prevDisabled={prevDisabled}
      />
    </div>
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
