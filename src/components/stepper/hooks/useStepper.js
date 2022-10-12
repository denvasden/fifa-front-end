import { useReducer } from "react";

const ACTION_TYPES = {
  ACTIVE_STEP_INDEX_INCREMENT: "ACTIVE_STEP_INDEX_INCREMENT",
  ACTIVE_STEP_INDEX_DECREMENT: "ACTIVE_STEP_INDEX_DECREMENT",
  ADD_ACTIVE_STEP_DATA: "ADD_ACTIVE_STEP_DATA",
};

function useStepper(steps) {
  const [state, dispath] = useReducer(stepperReducer, {
    activeStepIndex: 0,
    screensData: [],
  });
  const { activeStepIndex, screensData } = state;
  let activeStepData = null;

  function addScreenData(data) {
    dispath({ type: ACTION_TYPES.ADD_ACTIVE_STEP_DATA, payload: data });
  }

  function nextStep() {
    addScreenData(activeStepData);

    if (
      steps[activeStepIndex].validate &&
      !steps[activeStepIndex].validate(activeStepData)
    ) {
      alert("No valid data!!!");
      return;
    }
    dispath({ type: ACTION_TYPES.ACTIVE_STEP_INDEX_INCREMENT, payload: steps });
  }

  function prevStep() {
    addScreenData(activeStepData);
    dispath({ type: ACTION_TYPES.ACTIVE_STEP_INDEX_DECREMENT });
  }

  function updateTempStepData(data) {
    activeStepData = data;
  }

  return {
    activeStepIndex,
    prevStep,
    nextStep,
    updateTempStepData,
    content: steps[activeStepIndex].content,
    activeStepData: screensData[activeStepIndex]
      ? screensData[activeStepIndex]
      : "",
    prevDisabled: activeStepIndex === 0,
    finishStep: activeStepIndex === steps.length - 1,
  };
}

export default useStepper;

function stepperReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ACTIVE_STEP_INDEX_INCREMENT: {
      if (action.payload[state.activeStepIndex + 1]) state.activeStepIndex++;
      return {
        ...state,
      };
    }

    case ACTION_TYPES.ACTIVE_STEP_INDEX_DECREMENT: {
      if (state.activeStepIndex > 0) state.activeStepIndex--;
      return {
        ...state,
      };
    }

    case ACTION_TYPES.ADD_ACTIVE_STEP_DATA: {
      state.screensData[state.activeStepIndex] = action.payload;
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}
