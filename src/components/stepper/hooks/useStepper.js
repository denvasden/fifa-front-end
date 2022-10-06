import { useState } from "react";

function useStepper(steps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const nextStepIndex =
    activeStepIndex + 1 === steps.length ? null : activeStepIndex + 1;

  function nextStep() {
    if (steps[activeStepIndex].validate && !steps[activeStepIndex].validate()) {
      alert("No valid data!!!");
      return;
    }
    if (steps[activeStepIndex + 1])
      setActiveStepIndex((prevIndex) => prevIndex + 1);
  }

  function prevStep() {
    if (steps[activeStepIndex - 1])
      setActiveStepIndex((prevIndex) => prevIndex - 1);
  }

  return {
    activeStepIndex,
    prevStep,
    nextStep,
    nextStepIndex,
  };
}

export default useStepper;
