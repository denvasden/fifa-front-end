import { useReducer } from "react";
import { stepperReducer, ACTION_TYPES } from "./stepperReducer";

function useStepper(steps) {
  const [state, dispath] = useReducer(stepperReducer, {
    activeStepIndex: 0,
    screensData: {},
  });
  const { activeStepIndex, screensData } = state;
  let tempScreenData = null;

  function addScreenData(data) {
    dispath({ type: ACTION_TYPES.ADD_SCREEN_DATA, payload: data });
  }

  function nextStep() {
    addScreenData(tempScreenData);

    if (
      steps[activeStepIndex].validate &&
      !steps[activeStepIndex].validate(tempScreenData)
    ) {
      alert("No valid data!!!");
      return;
    }

    if (steps[activeStepIndex + 1])
      dispath({ type: ACTION_TYPES.ACTIVE_STEP_INDEX_INCREMENT });
  }

  function prevStep() {
    addScreenData(tempScreenData);

    if (steps[activeStepIndex - 1])
      dispath({ type: ACTION_TYPES.ACTIVE_STEP_INDEX_DECREMENT });
  }

  function getScreenData(data) {
    tempScreenData = data;
  }

  return {
    activeStepIndex,
    prevStep,
    nextStep,
    getScreenData,
    initialScreenState: screensData[activeStepIndex]
      ? screensData[activeStepIndex]
      : "",
  };
}

export default useStepper;
