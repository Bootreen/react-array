import { Button } from "./Button";
import { Counter } from "./Counter";

export const CounterBlock = ({
  id,
  isOn,
  title,
  current,
  filterHandler,
  counterHandler,
}) => (
  <div className='flex counter-block' key={id}>
    <Button
      name={isOn ? "control selected" : "control"}
      title={title + " " + current}
      handler={filterHandler}
    />
    <Counter handler={counterHandler} id={id} />
  </div>
);
