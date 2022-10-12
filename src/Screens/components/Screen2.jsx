import { useState } from "react";
import useStepperContext from "../../components/Stepper/hooks/useStepperContext/useStepperContext";

const Screen2 = () => {
  const { receiveActiveStepData, initialActiveStepData } = useStepperContext();
  const [state, setState] = useState(initialActiveStepData);

  receiveActiveStepData(state);

  function handleChange(event) {
    setState(event.target.value);
  }

  return (
    <div>
      <input value={state} type="text" onChange={handleChange} />
      <p>Step2</p>
    </div>
  );
};

export default Screen2;
