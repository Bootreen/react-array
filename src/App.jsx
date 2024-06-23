import { Fragment } from "react";
import { FiltersMenu } from "./components/FiltersMenu";
import { UserList } from "./components/UserList";
import "./App.css";

const App = () => (
  <Fragment>
    <FiltersMenu />
    <UserList />
  </Fragment>
);

export default App;
