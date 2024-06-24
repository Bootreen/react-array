import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const usePreset = create(
  immer((set, get) => ({
    btns: {
      All_users: {
        title: "All users",
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
        isCnt: true,
        cnt: { min: 18, max: 100, curr: 40 },
        isOn: false,
        group: 2,
        alg_type: "filter",
        // This reference to the same object inside itself is impossible in vanilla JS/React
        // Provided by Zustand state management library
        algorythm: ({ dob: { age } }) => age > get().btns.Older_than.cnt.curr,
      },
      Younger_than: {
        title: "Younger than",
        type: "checkbox",
        isCnt: true,
        cnt: { min: 18, max: 100, curr: 60 },
        isOn: false,
        group: 2,
        alg_type: "filter",
        algorythm: ({ dob: { age } }) => age < get().btns.Younger_than.cnt.curr,
      },
    },

    sorters: {
      title: { direction: "unsorted", target: "name.title", isNumber: false },
      first: { direction: "unsorted", target: "name.first", isNumber: false },
      last: { direction: "unsorted", target: "name.last", isNumber: false },
      gender: { direction: "unsorted", target: "gender", isNumber: false },
      age: { direction: "unsorted", target: "dob.age", isNumber: true },
      country: {
        direction: "unsorted",
        target: "location.country",
        isNumber: false,
      },
      city: { direction: "unsorted", target: "location.city", isNumber: false },
    },

    actions: {
      onSortClick: (id) => {
        set((state) => {
          state.sorters[id].direction =
            state.sorters[id].direction === "ascending"
              ? "descending"
              : state.sorters[id].direction === "descending"
              ? "unsorted"
              : "ascending";
        });
      },

      // Switch filters
      onFilterSelect: (id) => {
        // Checkbox-type filters switch independently
        if (get().btns[id].type === "checkbox")
          // Shorter nested object update notation
          // is provided by Immer middleware
          set((state) => {
            state.btns[id].isOn = !state.btns[id].isOn;
          });
        // Radio-type filters on turning on
        // switch off other filters in their group
        if (get().btns[id].type === "radio")
          Object.entries(get().btns).forEach(([currId, { group }]) => {
            if (group === get().btns[id].group) {
              set((state) => {
                state.btns[currId].isOn = currId === id ? true : false;
              });
            }
          });
      },

      // Increment/decrement cnt if it doesn't break the max/min limits
      oncntChange: (inc, id) => {
        if (inc && get().btns[id].cnt.curr < get().btns[id].cnt.max)
          set((state) => {
            ++state.btns[id].cnt.curr;
          });
        if (!inc && get().btns[id].cnt.curr > get().btns[id].cnt.min)
          set((state) => {
            --state.btns[id].cnt.curr;
          });
      },

      // Gather all active filters and sorters
      filters: () =>
        Object.values(get().btns)
          .filter(({ isOn, alg_type }) => isOn && alg_type === "filter")
          .map(({ algorythm }) => algorythm),

      sorters: () =>
        Object.values(get().sorters).map(({ direction, target, isNumber }) => {
          if (direction === "unsorted") {
            // nothing to sort
            return () => 0;
          } else if (target.includes(".")) {
            // if this is nested property, destructure it
            // to parent and child
            const [parent, child] = target.split(".");
            // square brackets is used to write object key
            // as variable
            return (
              { [parent]: { [child]: a } },
              { [parent]: { [child]: b } }
            ) =>
              direction === "ascending"
                ? isNumber
                  ? a - b
                  : a.localeCompare(b)
                : isNumber
                ? b - a
                : b.localeCompare(a);
          } else {
            return ({ [target]: a }, { [target]: b }) =>
              direction === "ascending"
                ? isNumber
                  ? a - b
                  : a.localeCompare(b)
                : isNumber
                ? b - a
                : b.localeCompare(a);
          }
        }),
    },
  }))
);

export const usePresetActions = () => usePreset((state) => state.actions);
