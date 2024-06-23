export const Button = ({ title, name, handler }) => {
  return (
    <button className={name} onClick={handler}>
      {title}
    </button>
  );
};
