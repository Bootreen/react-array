import { Fragment, useState } from "react";
import { preset } from "./data/preset";
import { Button } from "./components/button";
import { users } from "./data/usersComplete";
import "./App.css";

const App = () => {
  const [active, setActive] = useState(preset["All"].title);
  const onFilterSelect = (active) => setActive(active);

  return (
    <Fragment>
      <div className='container buttonsGroup'>
        {Object.values(preset).map(({ title }) => (
          <Button
            key={title}
            active={active}
            caption={title}
            handler={onFilterSelect}
          />
        ))}
      </div>
      <div className='container list'>
        {users
          .filter(preset[active].filter)
          .toSorted(preset[active].sorter)
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
