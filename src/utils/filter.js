import { FilterType } from '../const.js';

const filterTypeToFilter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points, dateNow = Date.now()) => points.filter(({ dateFrom, dateTo }) =>
    dateFrom.getTime() >= dateNow ||
  (dateFrom.getTime() < dateNow && dateTo.getTime() > dateNow)
  )
};

export { filterTypeToFilter };
