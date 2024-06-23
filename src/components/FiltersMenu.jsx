import { usePreset, usePresetActions } from "../store/preset.js";
import { CounterBlock } from "./CounterBlock";
import { Button } from "./Button";

export const FiltersMenu = () => {
  const { onFilterSelect, onCounterChange } = usePresetActions();
  const activeState = usePreset((state) => state);
  return (
    <div className='flex buttons-group'>
      {Object.entries(activeState).map(
        ([id, { title, isOn, isCounter, counter: { current } = {} }]) => {
          if (id !== "actions")
            return isCounter ? (
              <CounterBlock
                key={id}
                id={id}
                isOn={isOn}
                title={title}
                current={current}
                filterHandler={onFilterSelect}
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
