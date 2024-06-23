import { Button } from "./Button";

export const Counter = ({ handler, id }) => (
  <div className='flex counter-control'>
    <Button
      name='counter-btn'
      title={"\u25B2"} // 'arrow up' symbol
      handler={() => handler(true, id)}
    />
    <Button
      name='counter-btn'
      title={"\u25BC"} // 'arrow down' symbol
      handler={() => handler(false, id)}
    />
  </div>
);
