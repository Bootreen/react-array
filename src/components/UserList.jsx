import { usePreset, usePresetActions } from "../store/preset";
import { users } from "../data/usersComplete";
import { chainFilter, chainSorter } from "../utils/chaining";

export const UserList = () => {
  const { filters, sorters } = usePresetActions();
  // UserList must be subscribed to usePreset because
  // it should rerender every time filter/sorter state changes
  usePreset((state) => state);
  return (
    <table>
      <thead>
        <tr>
          <th>
            <div className='flex th-container'>
              <span className='th-title'>Title</span>
              <span className='direction'>{"\u2195"}</span>
            </div>
          </th>
          <th>
            <div className='flex th-container'>
              <span className='th-title'>First name</span>
              <span className='direction'>{"\u2195"}</span>
            </div>
          </th>
          <th>
            <div className='flex th-container'>
              <span className='th-title'>Last name</span>
              <span className='direction'>{"\u2195"}</span>
            </div>
          </th>
          <th>
            <div className='flex th-container'>
              <span className='th-title'>Gender</span>
              <span className='direction'>{"\u2195"}</span>
            </div>
          </th>
          <th>
            <div className='flex th-container'>
              <span className='th-title'>Age</span>
              <span className='direction'>{"\u2195"}</span>
            </div>
          </th>
          <th>
            <div className='flex th-container'>
              <span className='th-title'>Country</span>
              <span className='direction'>{"\u2195"}</span>
            </div>
          </th>
          <th>
            <div className='flex th-container'>
              <span className='th-title'>City</span>
              <span className='direction'>{"\u2195"}</span>
            </div>
          </th>
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
