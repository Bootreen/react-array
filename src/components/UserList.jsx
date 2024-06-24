import { usePreset, usePresetActions } from "../store/preset";
import { users } from "../data/usersComplete";
import { chainFilter, chainSorter } from "../utils/chaining";
import { ColumnHeader } from "./ColumnHeader";

export const UserList = () => {
  const { onSortClick, filters, sorters } = usePresetActions();
  // UserList must be subscribed to usePreset because
  // it should rerender every time filter/sorter state changes
  usePreset((state) => state);
  return (
    <table>
      <thead>
        <tr>
          <ColumnHeader id='title' title='Title' handler={onSortClick} />
          <ColumnHeader id='first' title='First name' handler={onSortClick} />
          <ColumnHeader id='last' title='Last name' handler={onSortClick} />
          <ColumnHeader id='gender' title='Gender' handler={onSortClick} />
          <ColumnHeader id='age' title='Age' handler={onSortClick} />
          <ColumnHeader id='country' title='Country' handler={onSortClick} />
          <ColumnHeader id='city' title='City' handler={onSortClick} />
        </tr>
      </thead>
      <tbody>
        {chainSorter(chainFilter(users, filters()), sorters()).map(
          ({
            gender,
            name: { title, first, last },
            location: { city, country },
            dob: { age },
            email,
          }) => (
            <tr className='list-row' key={email}>
              <td className='text-right'>{title}</td>
              <td>{first}</td>
              <td>{last}</td>
              {gender === "male" ? (
                <td className='text-center male'>{"\u2642"}</td>
              ) : (
                <td className='text-center female'>{"\u2640"}</td>
              )}
              <td className='text-center'>{age}</td>
              <td>{country}</td>
              <td>{city}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};
