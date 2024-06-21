import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const usePreset = create(
  immer((set, get) => ({
    preset: {
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
        algorythm: ({ dob: { age } }) => age > get().Older_than.counter.current,
      },
    },
    actions: {
      onFilterSelect: (key) => {
        const snapshot = get().preset;
        if (snapshot[key].type === "checkbox")
          set((state) => {
            state.preset[key].isOn = !state.preset[key].isOn;
          });
        if (snapshot[key].type === "radio")
          Object.entries(snapshot).forEach(([currKey, { group }]) => {
            if (group === snapshot[key].group) {
              set((state) => {
                state.preset[currKey].isOn = currKey === key ? true : false;
              });
            }
          });
      },
      onCounterChange: () => set(() => {}),
    },
  }))
);

export const usePresetActions = () => usePreset((state) => state.actions);
