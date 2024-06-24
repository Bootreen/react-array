import { usePreset } from "../store/preset.js";

export const ColumnHeader = ({ id, title, handler }) => {
  const sorters = usePreset((state) => state.sorters);
  return (
    <th onClick={() => handler(id)}>
      <div className='flex th-container'>
        <span className='th-title'>{title}</span>
        <span className='direction'>
          {sorters[id].direction === "unsorted"
            ? "\u2195"
            : sorters[id].direction === "ascending"
            ? "\u2193"
            : "\u2191"}
        </span>
      </div>
    </th>
  );
};
