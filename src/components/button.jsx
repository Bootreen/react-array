export const Button = ({ caption, active, handler }) => (
  <button
    className={active === caption ? "selected" : "inactive"}
    onClick={() => handler(caption)}
  >
    {caption}
  </button>
);
