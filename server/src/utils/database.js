/**
 * Convert filter object to where object
 * @param {Object} filter
 */
export const filterToWhere = filter => {
  const where = {};
  for (const key in filter) {
    if (filter[key].value === null) {
      continue;
    }

    if (filter[key].matchMode === 'equals') {
      where[key] = filter[key].value;
    } else if (filter[key].matchMode === 'contains') {
      where[key] = { $regex: filter[key].value, $options: 'i' };
    } else if (filter[key].matchMode === 'notContains') {
      where[key] = { $regex: `^((?!${filter[key].value}).)*$`, $options: 'i' };
    } else if (filter[key].matchMode === 'startsWith') {
      where[key] = { $regex: `^${filter[key].value}`, $options: 'i' };
    } else if (filter[key].matchMode === 'endsWith') {
      where[key] = { $regex: `${filter[key].value}$`, $options: 'i' };
    } else if (filter[key].matchMode === 'notEquals') {
      where[key] = { $ne: filter[key].value };
    } else {
      where[key] = filter[key].value;
    }
  }
  return where;
};
