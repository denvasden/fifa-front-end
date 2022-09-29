import React from "react";
import Button from "../../Button/Button";
import PropTypes, { bool } from "prop-types";
import "./stepper-actions.css";

const StepperActions = (props) => {
  const { nextStep, prevStep, validation, finish, prevDisabled } = props;

  function handleNext() {
    validation() ? nextStep() : alert("No valid data!!!");
  }
  return (
    <div className="stepper-actions">
      <Button disabled={prevDisabled} onClick={prevStep}>
        prev
      </Button>
      {finish ? (
        <Button>finish</Button>
      ) : (
        <Button onClick={handleNext}>next</Button>
      )}
    </div>
  );
};

StepperActions.propTypes = {
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  validation: PropTypes.func,
  finish: bool,
  prevDisabled: bool,
};

export default StepperActions;
