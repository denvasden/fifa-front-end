import { useContext } from "react";
import { StepperContext } from "../../providers/StepperProvider";

function useStepperContext() {
  return useContext(StepperContext);
}

export default useStepperContext;
