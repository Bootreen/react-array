export const preset = {
  All: { title: "All", filter: () => true, sorter: () => 0 },
  Man: {
    title: "Man",
    filter: ({ gender }) => gender === "male",
    sorter: () => 0,
  },
  Woman: {
    title: "Woman",
    filter: ({ gender }) => gender === "female",
    sorter: () => 0,
  },
  "By name": {
    title: "By name",
    filter: () => true,
    sorter: ({ name: { last: lastA } }, { name: { last: lastB } }) =>
      lastA.localeCompare(lastB),
  },
  "By age": {
    title: "By age",
    filter: () => true,
    sorter: ({ dob: { age: ageA } }, { dob: { age: ageB } }) => ageA - ageB,
  },
};
