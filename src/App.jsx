import { Fragment, useState } from "react";
import { buttons } from "./data/buttonslist";
import { Button } from "./components/button";
import { users } from "./data/usersComplete";
import "./App.css";

const App = () => {
  const [filter, setFilter] = useState("");
  const onFilterSelect = (filter) => setFilter(filter);

  return (
    <Fragment>
      {buttons.map((caption) => (
        <Button
          key={caption}
          active={filter}
          caption={caption}
          handler={onFilterSelect}
        />
      ))}
      {users.map(({ name: { title, first, last }, email }) => (
        <div key={email}>
          {title} {first} {last}
        </div>
      ))}
    </Fragment>
  );
};

export default App;
