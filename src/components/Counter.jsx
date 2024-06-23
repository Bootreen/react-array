import { Button } from "./Button";

export const Counter = ({ handler, id }) => (
  <div className='flex counter-control'>
    <Button name='counter-btn' title='▲' handler={() => handler(true, id)} />
    <Button name='counter-btn' title='▼' handler={() => handler(false, id)} />
  </div>
);
