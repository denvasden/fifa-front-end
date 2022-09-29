import "./App.css";
import Stepper from "./components/Stepper/Stepper";
import { Screen1, Screen2, Screen3, Screen4 } from "./Screens/index";

const initialData = [
  {
    title: "Step1",
    content: <Screen1 />,
    validation: function () {
      return true;
    },
    description: "(description)",
  },
  {
    title: "Step2",
    content: <Screen2 />,
    validation: function () {
      return true;
    },
  },
  {
    title: "Step3",
    content: <Screen3 />,
    validation: function () {
      return true;
    },
  },
  {
    title: "Step3",
    content: <Screen4 />,
    validation: function () {
      return true;
    },
  },
];

function App() {
  return (
    <div className="App">
      <Stepper initialData={initialData} />
    </div>
  );
}

export default App;
