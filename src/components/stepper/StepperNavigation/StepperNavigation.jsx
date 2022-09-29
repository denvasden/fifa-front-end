import React from "react";
import "./stepper-navigation.css";
import Step from "./components/step/Step";
import PropTypes from "prop-types";

const StepperNavigation = ({ initialData, activeIndex }) => {
  return (
    <div className="stepper-navigation">
      {initialData.map((step, index) => (
        <Step
          title={step.title}
          key={index}
          number={index + 1}
          active={activeIndex === index}
          description={step.description}
        />
      ))}
    </div>
  );
};

StepperNavigation.propTypes = {
  initialData: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

export default StepperNavigation;
