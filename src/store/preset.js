import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const usePreset = create(
  immer((set, get) => ({
    All: {
      title: "All",
      type: "radio",
      isOn: true,
      group: 1,
      alg_type: "filter",
      algorythm: () => true,
    },
    Man: {
      title: "Man",
      type: "radio",
      isOn: false,
      group: 1,
      alg_type: "filter",
      algorythm: ({ gender }) => gender === "male",
    },
    Woman: {
      title: "Woman",
      type: "radio",
      isOn: false,
      group: 1,
      alg_type: "filter",
      algorythm: ({ gender }) => gender === "female",
    },
    By_name: {
      title: "By name",
      type: "checkbox",
      isOn: false,
      group: 2,
      alg_type: "sort",
      algorythm: ({ name: { last: lastA } }, { name: { last: lastB } }) =>
        lastA.localeCompare(lastB),
    },
    By_age: {
      title: "By age",
      type: "checkbox",
      isOn: false,
      group: 2,
      alg_type: "sort",
      algorythm: ({ dob: { age: ageA } }, { dob: { age: ageB } }) =>
        ageA - ageB,
    },
    Older_than: {
      title: "Older than",
      type: "checkbox",
      isCounter: true,
      counter: { min: 0, max: 100, current: 40 },
      isOn: false,
      group: 2,
      alg_type: "filter",
      // This reference to the same object inside itself is impossible in vanilla JS/React
      // Provided by Zustand state management library
      algorythm: ({ dob: { age } }) => age > get().Older_than.counter.current,
    },
    Younger_than: {
      title: "Younger than",
      type: "checkbox",
      isCounter: true,
      counter: { min: 50, max: 100, current: 60 },
      isOn: false,
      group: 2,
      alg_type: "filter",
      algorythm: ({ dob: { age } }) => age < get().Younger_than.counter.current,
    },

    actions: {
      // Switch filters
      onFilterSelect: (id) => {
        // Checkbox-type filters switch independently
        if (get()[id].type === "checkbox")
          // Shorter nested object update notation
          // is provided by Immer middleware
          set((state) => {
            state[id].isOn = !state[id].isOn;
          });
        // Radio-type filters on turning on
        // switch off other filters in their group
        if (get()[id].type === "radio")
          Object.entries(get()).forEach(([currId, { group }]) => {
            if (group === get()[id].group) {
              set((state) => {
                state[currId].isOn = currId === id ? true : false;
              });
            }
          });
      },

      // Increment/decrement counter if it doesn't break the max/min limits
      onCounterChange: (inc, id) => {
        if (inc && get()[id].counter.current < get()[id].counter.max)
          set((state) => {
            ++state[id].counter.current;
          });
        if (!inc && get()[id].counter.current > 0)
          set((state) => {
            --state[id].counter.current;
          });
      },

      // Gather all active filters and sorters
      filters: () =>
        Object.values(get())
          .filter(({ isOn, alg_type }) => isOn && alg_type === "filter")
          .map(({ algorythm }) => algorythm),

      sorters: () =>
        Object.values(get())
          .filter(({ isOn, alg_type }) => isOn && alg_type === "sort")
          .map(({ algorythm }) => algorythm),
    },
  }))
);

export const usePresetActions = () => usePreset((state) => state.actions);
