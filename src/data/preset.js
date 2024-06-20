export const preset = {
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
    algorythm: ({ dob: { age: ageA } }, { dob: { age: ageB } }) => ageA - ageB,
  },
};
