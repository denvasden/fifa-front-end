import { useState } from "react";

const Screen1 = ({ getScreenData, initialState }) => {
  const [state, setState] = useState(initialState);

  getScreenData(state);

  function handleChange(event) {
    setState(event.target.value);
  }
  return (
    <div>
      <input value={state} type="text" onChange={handleChange} />
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum fugiat
        delectus porro cupiditate quas aut dolor
      </p>
    </div>
  );
};

export default Screen1;
