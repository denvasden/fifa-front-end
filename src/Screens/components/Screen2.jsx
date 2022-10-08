import { useState } from "react";

const Screen2 = ({ getScreenData, initialState }) => {
  const [state, setState] = useState(initialState);

  getScreenData(state);

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
