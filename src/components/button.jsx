export const Button = ({ title, status, handler }) => {
  return (
    <button className={status} onClick={() => handler(title)}>
      {title}
    </button>
  );
};
