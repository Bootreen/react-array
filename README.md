# React Array Exercise by Oleksii Butrin

[Current build](https://react-array.vercel.app/)

### Features

- Advanced state management via [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) library and [Immer](https://immerjs.github.io/immer/); central state store used with subscription to store state and methods inside components that need it
  ```js
  const { onFilterSelect, onCounterChange, filters, sorters } =
    usePresetActions();
  const activeState = usePreset((state) => state);
  ```
- Flexible filters/sorters implementation via `preset` object
- New filter or sorter can be added just by adding new sub-object to preset without modifying rest of the code
  ```js
  Older_than: {
    title: "Older than",
    type: "checkbox",
    isCounter: true,
    counter: { min: 0, max: 100, current: 40 },
    isOn: false,
    group: 2,
    alg_type: "filter",
    algorythm: ({ dob: { age } }) => age > get().Older_than.counter.current,
  }
  ```
- Button behaviour that represent filters and sorters are controled by `group` and `type` parameters
- [Immer middleware](https://docs.pmnd.rs/zustand/integrations/immer-middleware) allows simple nested object state updates without spreading nested objects
  ```js
  // Setting boolean object property on 2nd nesting level
  set((state) => {
    state[currId].isOn = currId === id ? true : false;
  });
  // Incrementing counter on 3rd nesting level
  set((state) => {
    ++state[id].counter.current;
  });
  ```
- Active filters/sorters are gathered to arrays and then applied one by one via corresponding recursive chaining functions
  ```js
  const chainFilter = (data, filters, i = 0) =>
    filters.length === 0
      ? data
      : i === filters.length - 1
      ? data.filter(filters[i])
      : chainFilter(data.filter(filters[i]), filters, i + 1);
  ```
