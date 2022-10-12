import PropTypes from "prop-types";
import StepperNavigation from "./components/StepperNavigation";
import StepperContent from "./components/StepperСontent/StepperContent";
import StepperActions from "./components/StepperActions/StepperActions";
import { StepperProvider } from "./providers/StepperProvider";
import { useStepper } from "./hooks/";
import "./stepper.css";

const Stepper = ({ steps }) => {
  const {
    activeStepIndex,
    nextStep,
    prevStep,
    content,
    prevDisabled,
    finishStep,
    updateTempStepData,
    activeStepData,
  } = useStepper(steps);
  return (
    <StepperProvider
      updateTempStepData={updateTempStepData}
      activeStepData={activeStepData}
    >
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
    </StepperProvider>
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
