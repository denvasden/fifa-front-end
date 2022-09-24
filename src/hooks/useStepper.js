import { useState } from "react";

const initialSteps = [
  {
    title: "Step1",
    id: "12de34$4",
    active: true,
    description: "(description)",
  },
  { title: "Step2", id: "0#34djcn", active: false },
  { title: "Step3", id: "234cc&21", active: false },
  { title: "Step3", id: "234cc&23", active: false },
];

function useStepper() {
  const [steps, setSteps] = useState(initialSteps);

  function addFieldsToStep(indexStep, fields) {
    const tempSteps = [...steps];

    tempSteps[indexStep] = { ...tempSteps[indexStep], ...fields };
    setSteps(tempSteps);
  }

  function shiftActiveStep(indexStep, next = true) {
    const tempSteps = [...steps];
    if (next) {
      tempSteps[indexStep].active = !tempSteps[indexStep].active;
      tempSteps[indexStep + 1].active = !tempSteps[indexStep + 1].active;
    } else {
      tempSteps[indexStep].active = !tempSteps[indexStep].active;
      tempSteps[indexStep - 1].active = !tempSteps[indexStep - 1].active;
    }
    setSteps(tempSteps);
  }

  function nextStep(indexStep) {
    shiftActiveStep(indexStep);
  }

  function prevStep(indexStep) {
    shiftActiveStep(indexStep, false);
  }

  function getIndexActiveStep() {
    return steps.findIndex((step) => step.active);
  }

  return {
    steps,
    addFieldsToStep,
    getIndexActiveStep,
    nextStep,
    prevStep,
  };
}

export default useStepper;
