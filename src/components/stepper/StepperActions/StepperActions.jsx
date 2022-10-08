import Button from "../../Button/Button";
import PropTypes from "prop-types";
import "./stepper-actions.css";

const StepperActions = (props) => {
  const { onNext, onPreviouse, finishStep, prevDisabled } = props;
  return (
    <div className="stepper-actions">
      <Button disabled={prevDisabled} onClick={onPreviouse}>
        prev
      </Button>
      <Button onClick={onNext}>{finishStep ? "finish" : "next"}</Button>
    </div>
  );
};

StepperActions.propTypes = {
  onNext: PropTypes.func,
  onPreviouse: PropTypes.func,
  prevDisabled: PropTypes.bool,
  finish: PropTypes.bool,
};

export default StepperActions;
