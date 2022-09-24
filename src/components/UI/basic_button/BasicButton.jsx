import React from "react";
import "./BasicButton.css";

const BasicButton = ({ children, disabled, className, handler }) => {
  const styles = disabled
    ? `${className} basic-button__disabled `
    : `${className} basic-button`;
  return (
    <button disabled={disabled} className={styles} onClick={handler}>
      {children}
    </button>
  );
};

export default BasicButton;
