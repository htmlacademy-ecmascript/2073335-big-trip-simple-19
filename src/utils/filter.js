import dayjs from 'dayjs';
import { FilterType } from '../const.js';

function isPointFuture (date) {
  return dayjs().isBefore(date, 'day') || dayjs().isSame(date, 'day');
}

const filterTypeToFilter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom) || isPointFuture(point.dateTo)),
};

export { filterTypeToFilter };
