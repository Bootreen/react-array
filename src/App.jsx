import { Fragment, useState } from "react";
import { preset } from "./data/preset";
import { Button } from "./components/button";
import { users } from "./data/usersComplete";
import "./App.css";

const App = () => {
  const [state, setState] = useState(preset);
  const onFilterSelect = (key) => {
    // Updating nested objects via useState is a fucking brainmelting hell
    // That's why we need state management libraries
    if (state[key].type === "checkbox")
      setState((state) => ({
        ...state,
        [key]: {
          ...state[key],
          isOn: !state[key].isOn,
        },
      }));
    if (state[key].type === "radio")
      Object.entries(state).forEach(([currKey, { group }]) => {
        if (group === state[key].group)
          setState((state) => ({
            ...state,
            [currKey]: {
              ...state[currKey],
              isOn: currKey === key ? true : false,
            },
          }));
      });
  };

  const counterHandler = (increment, target) => {
    if (increment && state[target].counter.current < state[target].counter.max)
      setState((state) => ({
        ...state,
        [target]: {
          ...state[target],
          counter: {
            ...state[target].counter,
            current: state[target].counter.current + 1,
          },
        },
      }));
    if (!increment && state[target].counter.current > 0)
      setState((state) => ({
        ...state,
        [target]: {
          ...state[target],
          counter: {
            ...state[target].counter,
            current: state[target].counter.current - 1,
          },
        },
      }));
    // It's necessary to update original preset object as well,
    // because counter algorythms relies on current counter
    // value from preset. It's a bit "krutchy" solution, so this is
    // the time to introduce some proper state management library
    // and revise preset data structure.
    preset[target].counter.current = state[target].counter.current;
  };

  // Gather all active filters and sorters
  const filters = () =>
    Object.values(state)
      .filter(({ isOn, alg_type }) => isOn && alg_type === "filter")
      .map(({ algorythm }) => algorythm);

  const sorters = () =>
    Object.values(state)
      .filter(({ isOn, alg_type }) => isOn && alg_type === "sort")
      .map(({ algorythm }) => algorythm);

  // Using recursion for .filter and .sort chaining
  const chainFilter = (data, filters, index = 0) =>
    filters.length === 0
      ? data
      : index === filters.length - 1
      ? data.filter(filters[index])
      : chainFilter(data.filter(filters[index]), filters, index + 1);

  const chainSorter = (data, sorters, index = 0) =>
    sorters.length === 0
      ? data
      : index === sorters.length - 1
      ? data.toSorted(sorters[index])
      : chainSorter(data.toSorted(sorters[index]), sorters, index + 1);

  return (
    <Fragment>
      <div className='container buttonsGroup'>
        {Object.entries(state).map(
          ([key, { title, isOn, isCounter, counter: { current } = {} }]) =>
            isCounter ? (
              <div className='counterBlock' key={key}>
                <Button
                  status={isOn ? "selected" : "inactive"}
                  title={title + " " + current}
                  handler={onFilterSelect}
                  handlerKey={key}
                />
                <div className='counter'>
                  <button onClick={() => counterHandler(true, key)}>▲</button>
                  <button onClick={() => counterHandler(false, key)}>▼</button>
                </div>
              </div>
            ) : (
              <div key={key}>
                <Button
                  status={isOn ? "selected" : "inactive"}
                  title={title}
                  handler={onFilterSelect}
                  handlerKey={key}
                />
              </div>
            )
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
