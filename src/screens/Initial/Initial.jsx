import React from "react";
// import { StepperProvider } from "../../components/Stepper/providers/StepperProvider";
import Stepper from "../../components/Stepper/Stepper";
import { Screen1, Screen2, Screen3, Screen4 } from "./components/";

function validate(text) {
  return text.length >= 5;
}

const steps = [
  {
    title: "Step1",
    content: <Screen1 />,
    validate: validate,
    description: "(description)",
  },
  {
    title: "Step2",
    content: <Screen2 />,
    validate: validate,
  },
  {
    title: "Step3",
    content: <Screen3 />,
    validate: function () {
      return true;
    },
  },
  {
    title: "Step4",
    content: <Screen4 />,
    validate: function () {
      return true;
    },
  },
];

function Initial() {
  return (
    <div className="App">
      <Stepper steps={steps} />
    </div>
  );
}

export default Initial;
