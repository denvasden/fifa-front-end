import PropTypes from "prop-types";
import clsx from "clsx";
import "./Step.css";

const Step = ({ title, description, number, active }) => {
  const stepStyle = clsx("step", active && "step_active");
  return (
    <div className={stepStyle}>
      <div className="step__number"> {number}</div>
      <div className={"step__title__description"}>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

Step.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  number: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Step;
