import { FilterType } from '../const.js';

const filterTypeToFilter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.filter((point) => point.dateTo >= point.dateFrom),
};

export { filterTypeToFilter };
