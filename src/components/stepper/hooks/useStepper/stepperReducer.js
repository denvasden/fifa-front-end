export function stepperReducer(state, action) {
  switch (action.type) {
    case "ACTIVE_STEP_INDEX_INCREMENT":
      return {
        ...state,
        activeStepIndex: state.activeStepIndex + 1,
      };
    case "ACTIVE_STEP_INDEX_DECREMENT":
      return {
        ...state,
        activeStepIndex: state.activeStepIndex - 1,
      };
    case "ADD_SCREEN_DATA":
      return {
        ...state,
        screensData: {
          ...state.screensData,
          [state.activeStepIndex]: action.payload,
        },
      };
    default:
      return state;
  }
}

export const ACTION_TYPES = {
  ACTIVE_STEP_INDEX_INCREMENT: "ACTIVE_STEP_INDEX_INCREMENT",
  ACTIVE_STEP_INDEX_DECREMENT: "ACTIVE_STEP_INDEX_DECREMENT",
  ADD_SCREEN_DATA: "ADD_SCREEN_DATA",
};
