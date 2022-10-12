import { useState } from "react";
import useStepperContext from "../../components/Stepper/hooks/useStepperContext/useStepperContext";

const Screen3 = () => {
const { receiveActiveStepData, initialActiveStepData }= useStepperContext()
  const [state, setState] = useState(initialActiveStepData);

  receiveActiveStepData(state);

  function handleChange(event) {
    setState(event.target.value);
  }

  return (
    <div>
      <input value={state} type="text" onChange={handleChange} />
      <p>Step3</p>
    </div>
  );
};

export default Screen3;
