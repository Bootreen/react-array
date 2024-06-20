import { Fragment, useState } from "react";
import { buttons } from "./data/buttonslist";
import { Button } from "./components/button";
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
    </Fragment>
  );
};

export default App;
