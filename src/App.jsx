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
    if (state[titleToKey(title)].type === "radio") {
      Object.values(state).forEach(({ group, title: curTitle }) => {
        if (group === state[titleToKey(title)].group && curTitle === title) {
          setState((state) => ({
            ...state,
            [titleToKey(curTitle)]: {
              ...state[titleToKey(curTitle)],
              isOn: true,
            },
          }));
        } else if (
          group === state[titleToKey(title)].group &&
          curTitle !== title
        ) {
          setState((state) => ({
            ...state,
            [titleToKey(curTitle)]: {
              ...state[titleToKey(curTitle)],
              isOn: false,
            },
          }));
        }
      });
    }
  };

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
        {users
          // .filter(preset[titleToKey(active)].filter)
          // .toSorted(preset[titleToKey(active)].sorter)
          .map(({ name: { title, first, last }, dob: { age }, email }) => (
            <div className='listRow' key={email}>
              {title} {first} {last}, age: {age}
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default App;
