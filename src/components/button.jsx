export const Button = ({ title, status, handler, handlerId }) => {
  return (
    <button className={"control " + status} onClick={() => handler(handlerId)}>
      {title}
    </button>
  );
};
