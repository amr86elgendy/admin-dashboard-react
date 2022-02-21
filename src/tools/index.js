
export const sortType = (rowA, rowB, columnId) => {
  if (rowA?.original[columnId] > rowB?.original[columnId]) return 1;
  if (rowB?.original[columnId] > rowA?.original[columnId]) return -1;
  return 0;
};