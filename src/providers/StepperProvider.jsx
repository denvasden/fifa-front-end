import React from "react";
import useStepper from "../hooks/useStepper";

export const StepperContext = React.createContext();

export function StepperProvider({ children }) {
  const stepperState = useStepper();
  return (
    <StepperContext.Provider value={stepperState}>
      {children}
    </StepperContext.Provider>
  );
}
