import { useState } from "react";
import { useStepperContext } from "../../../components/Stepper/hooks";

const Screen3 = () => {
  const { updateTempStepData, activeStepData } = useStepperContext();
  const [state, setState] = useState(activeStepData);

  updateTempStepData(state);

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
