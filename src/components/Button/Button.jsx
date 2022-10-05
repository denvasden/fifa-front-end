
import "./button.css";

const Button = ({ children, disabled, className, onClick }) => {
  const styles = disabled
    ? `${className} button__disabled `
    : `${className} button`;
  return (
    <button disabled={disabled} className={styles} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
