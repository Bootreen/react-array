import { users } from "../data/usersComplete";
import { chainFilter, chainSorter } from "../utils/chaining";
import { usePreset, usePresetActions } from "../store/preset";

export const UserList = () => {
  const { filters, sorters } = usePresetActions();
  // UserList must be subscribed to usePreset because
  // it should rerender every time filter/sorter state changes
  usePreset((state) => state);
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Country</th>
          <th>City</th>
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
              <td>{title}</td>
              <td>{first}</td>
              <td>{last}</td>
              {gender === "male" ? (
                <td className='male'>{"\u2642"}</td>
              ) : (
                <td className='female'>{"\u2640"}</td>
              )}

              <td>{age}</td>
              <td>{country}</td>
              <td>{city}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};
