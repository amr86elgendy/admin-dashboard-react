
export const sortType = (rowA, rowB, columnId) => {
  if (rowA?.original[columnId] > rowB?.original[columnId]) return 1;
  if (rowB?.original[columnId] > rowA?.original[columnId]) return -1;
  return 0;
};

export const globalFilter = (rows, ids, filterValue) => {
  rows = rows.filter((row) => {
    return ids.some((id) => {
      const rowValue = row.original[id];
      return String(rowValue)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    });
  });
  return rows;
};