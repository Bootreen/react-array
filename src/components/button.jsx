export const Button = ({ title, status, handler, handlerKey }) => {
  return (
    <button className={"control " + status} onClick={() => handler(handlerKey)}>
      {title}
    </button>
  );
};
