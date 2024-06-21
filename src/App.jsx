import { Fragment } from "react";
import { usePreset, usePresetActions } from "./store/preset";
import { Button } from "./components/button";
import { users } from "./data/usersComplete";
import "./App.css";

const App = () => {
  // Much cleaner main code, because all state management functions
  // now packed inside store usePreset
  const { onFilterSelect, onCounterChange, filters, sorters } =
    usePresetActions();
  const activeState = usePreset((state) => state);

  // Using recursion for .filter and .sort chaining
  const chainFilter = (data, filters, i = 0) =>
    filters.length === 0
      ? data
      : i === filters.length - 1
      ? data.filter(filters[i])
      : chainFilter(data.filter(filters[i]), filters, i + 1);

  const chainSorter = (data, sorters, i = 0) =>
    sorters.length === 0
      ? data
      : i === sorters.length - 1
      ? data.toSorted(sorters[i])
      : chainSorter(data.toSorted(sorters[i]), sorters, i + 1);

  return (
    <Fragment>
      <div className='container buttonsGroup'>
        {Object.entries(activeState).map(
          ([id, { title, isOn, isCounter, counter: { current } = {} }]) => {
            if (id !== "actions")
              return isCounter ? (
                <div className='counterBlock' key={id}>
                  <Button
                    status={isOn ? "selected" : "inactive"}
                    title={title + " " + current}
                    handler={onFilterSelect}
                    handlerId={id}
                  />
                  <div className='counter'>
                    <button onClick={() => onCounterChange(true, id)}>▲</button>
                    <button onClick={() => onCounterChange(false, id)}>
                      ▼
                    </button>
                  </div>
                </div>
              ) : (
                <div key={id}>
                  <Button
                    status={isOn ? "selected" : "inactive"}
                    title={title}
                    handler={onFilterSelect}
                    handlerId={id}
                  />
                </div>
              );
          }
        )}
      </div>
      <div className='container list'>
        {chainSorter(chainFilter(users, filters()), sorters()).map(
          ({ name: { title, first, last }, dob: { age }, email }) => (
            <div className='listRow' key={email}>
              {title} {first} {last}, age: {age}
            </div>
          )
        )}
      </div>
    </Fragment>
  );
};

export default App;
