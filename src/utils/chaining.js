// Using recursion for .filter and .sort chaining
export const chainFilter = (data, filters, i = 0) =>
  filters.length === 0
    ? data
    : i === filters.length - 1
    ? data.filter(filters[i])
    : chainFilter(data.filter(filters[i]), filters, i + 1);

export const chainSorter = (data, sorters, i = 0) =>
  sorters.length === 0
    ? data
    : i === sorters.length - 1
    ? data.toSorted(sorters[i])
    : chainSorter(data.toSorted(sorters[i]), sorters, i + 1);
