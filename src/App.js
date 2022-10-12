import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Stepper from "./components/Stepper";
// import { StepperProvider } from "./components/Stepper/providers/StepperProvider";
// import { Screen1, Screen2, Screen3, Screen4 } from "./screens/index";
import { Initial } from "./screens/Initial";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Initial />}></Route>
      </Routes>

      {/* <StepperProvider steps={steps}>
      <div className="App">
        <Stepper steps={steps} /> */}
      {/* </div> */}
      {/* </StepperProvider> */}
    </BrowserRouter>
  );
}

export default App;
