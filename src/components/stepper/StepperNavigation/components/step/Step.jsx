
import PropTypes from "prop-types";
import "./Step.css";

const Step = ({ title, description, number, active }) => {
  const stylesToStep = active ? "step step__active" : "step";
  return (
    <div className={stylesToStep}>
      <div className="step__number"> {number}</div>
      <div className={"step__title-description"}>
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
