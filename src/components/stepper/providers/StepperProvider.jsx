import React from "react";
import { useStepper } from "../hooks/";

export const StepperContext = React.createContext();

export function StepperProvider({ steps, children }) {
  return (
    <StepperContext.Provider value={useStepper(steps)}>
      {children}
    </StepperContext.Provider>
  );
}
