import { users } from "../data/usersComplete";
import { chainFilter, chainSorter } from "../utils/chaining";
import { usePreset, usePresetActions } from "../store/preset";

export const UserList = () => {
  const { filters, sorters } = usePresetActions();
  // UserList must be subscribed to usePreset because
  // it should rerender every time filter/sorter state changes
  usePreset((state) => state);
  return (
    <div className='flex list'>
      {chainSorter(chainFilter(users, filters()), sorters()).map(
        ({ name: { title, first, last }, dob: { age }, email }) => (
          <div className='list-row' key={email}>
            {title} {first} {last}, age: {age}
          </div>
        )
      )}
    </div>
  );
};
