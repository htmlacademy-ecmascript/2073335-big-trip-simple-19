import { FilterType } from '../const.js';

const filterTypeToFilter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.filter((point) => Date.now() <= new Date(point.dateTo).getTime()),
};

export { filterTypeToFilter };
