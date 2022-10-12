import "./stepper-navigation.css";
import Step from "./components/step/Step";
import PropTypes from "prop-types";

const StepperNavigation = ({ steps, activeStepIndex }) => {
  return (
    <ul className="stepper-navigation">
      {steps.map((step, index) => (
        <li key={index}>
          <Step
            title={step.title}
            number={index + 1}
            active={activeStepIndex === index}
            description={step.description}
          />
        </li>
      ))}
    </ul>
  );
};

StepperNavigation.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  activeStepIndex: PropTypes.number.isRequired,
};

export default StepperNavigation;
