import { useState } from "react";

function useStepper(amountSteps) {
  const [activeIndex, setActiveIndex] = useState(0);

  function nextStep() {
    if (activeIndex + 1 < amountSteps)
      setActiveIndex((prevIndex) => prevIndex + 1);
  }
  function prevStep() {
    if (activeIndex - 1 >= 0) setActiveIndex((prevIndex) => prevIndex - 1);
  }

  return {
    activeIndex,
    prevStep,
    nextStep,
  };
}

export default useStepper;
