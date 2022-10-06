import "./App.css";
import Stepper from "./components/Stepper/Stepper";
import { Screen1, Screen2, Screen3, Screen4 } from "./Screens/index";

const steps = [
  {
    title: "Step1",
    content: <Screen1 />,
    validate: function () {
      return true;
    },
    description: "(description)",
  },
  {
    title: "Step2",
    content: <Screen2 />,
    validate: function () {
      return true;
    },
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

function App() {
  return (
    <div className="App">
      <Stepper steps={steps} />
    </div>
  );
}

export default App;
