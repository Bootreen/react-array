import { Fragment, useState } from "react";
import { preset } from "./data/preset";
import { Button } from "./components/button";
import { users } from "./data/usersComplete";
import "./App.css";

const App = () => {
  const [active, setActive] = useState(preset["All"].title);
  const onFilterSelect = (active) => setActive(active);
  const titleToKey = (title) => title.replaceAll(" ", "_");

  return (
    <Fragment>
      <div className='container buttonsGroup'>
        {Object.entries(preset).map(([key, { title }]) => (
          <Button
            key={key}
            active={active}
            caption={title}
            handler={onFilterSelect}
          />
        ))}
      </div>
      <div className='container list'>
        {users
          .filter(preset[titleToKey(active)].filter)
          .toSorted(preset[titleToKey(active)].sorter)
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
