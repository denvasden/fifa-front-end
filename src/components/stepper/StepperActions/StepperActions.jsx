import React from "react";
import Button from "../../Button/Button";
import PropTypes, { bool } from "prop-types";
import "./stepper-actions.css";

const StepperActions = (props) => {
  const { nextStep, prevStep, validate, finish, prevDisabled } = props;

  function handleNext() {
    validate() ? nextStep() : alert("No valid data!!!");
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
  validate: PropTypes.func,
  finish: bool,
  prevDisabled: bool,
};

export default StepperActions;
