
import PropTypes from "prop-types";
import "./stepper-content.css";

const StepperContent = ({ children }) => {
  return (
    <div
      className="stepper-content"
     
    >
      {children}
    </div>
  );
};

StepperContent.propTypes = {
  children: PropTypes.element,
};

export default StepperContent;
