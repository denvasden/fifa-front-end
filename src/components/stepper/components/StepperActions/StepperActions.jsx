import Button from "../../../Button/Button";
import PropTypes from "prop-types";
import "./stepper-actions.css";

const StepperActions = (props) => {
  const { onNext, onPreviouse, isFinishStep, prevDisabled } = props;
  return (
    <div className="stepper-actions">
      <Button disabled={prevDisabled} onClick={onPreviouse}>
        prev
      </Button>
      <Button onClick={onNext}>{isFinishStep ? "finish" : "next"}</Button>
    </div>
  );
};

StepperActions.propTypes = {
  onNext: PropTypes.func,
  onPreviouse: PropTypes.func,
  prevDisabled: PropTypes.bool,
  isFinishStep: PropTypes.bool,
};

export default StepperActions;
