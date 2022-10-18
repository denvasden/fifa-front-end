import { useStepperContext } from "../../../components/Stepper/hooks";
import InputText from "../../../components/InputText/InputText";
import { useState } from "react";
import Button from "../../../components/Button/Button";

const Screen1 = () => {
  const { updateTempStepData, activeStepData } = useStepperContext();
  const [player, setPlayer] = useState(activeStepData);

  updateTempStepData(player);

  function updateStepData(data) {
    setPlayer(data);
  }
  return (
    <div className={""}>
      <InputText defaultValue={activeStepData} getValue={updateStepData} />

      <Button> </Button>
    </div>
  );
};

export default Screen1;
