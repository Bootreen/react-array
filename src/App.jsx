import { Fragment, useState } from "react";
import { preset } from "./data/preset";
import { Button } from "./components/button";
import { users } from "./data/usersComplete";
import "./App.css";

const App = () => {
  const [state, setState] = useState(preset);
  const titleToKey = (title) => title.replaceAll(" ", "_");
  const onFilterSelect = (title) => {
    // Updating nested objects via useState is a fucking brainmelting hell
    // That's why we need state management libraries
    if (state[titleToKey(title)].type === "checkbox")
      setState((state) => ({
        ...state,
        [titleToKey(title)]: {
          ...state[titleToKey(title)],
          isOn: !state[titleToKey(title)].isOn,
        },
      }));
    if (state[titleToKey(title)].type === "radio")
      Object.values(state).forEach(({ group, title: curTitle }) => {
        if (group === state[titleToKey(title)].group)
          setState((state) => ({
            ...state,
            [titleToKey(curTitle)]: {
              ...state[titleToKey(curTitle)],
              isOn: curTitle === title ? true : false,
            },
          }));
      });
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
        {Object.entries(state).map(([key, { title, isOn }]) => (
          <Button
            key={key}
            status={isOn ? "selected" : "inactive"}
            title={title}
            handler={onFilterSelect}
          />
        ))}
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
