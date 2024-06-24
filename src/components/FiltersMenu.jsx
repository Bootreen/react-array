import { usePreset, usePresetActions } from "../store/preset.js";
import { CounterBlock } from "./CounterBlock";
import { Button } from "./Button";

export const FiltersMenu = () => {
  const { onFilterSelect, onCounterChange } = usePresetActions();
  const activeState = usePreset((state) => state);
  return (
    <div className='flex buttons-group'>
      {Object.entries(activeState.btns).map(
        ([id, { title, isOn, isCnt, cnt: { curr } = {} }]) => {
          if (id !== "actions")
            return isCnt ? (
              <CounterBlock
                key={id}
                id={id}
                isOn={isOn}
                title={title}
                current={curr}
                filterHandler={() => onFilterSelect(id)}
                counterHandler={onCounterChange}
              />
            ) : (
              <Button
                key={id}
                name={isOn ? "control selected" : "control"}
                title={title}
                handler={() => onFilterSelect(id)}
              />
            );
        }
      )}
    </div>
  );
};
