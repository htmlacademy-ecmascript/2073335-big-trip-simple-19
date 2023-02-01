import dayjs from 'dayjs';
import { FilterType } from '../const.js';

//const isPastPoint = (point) => dayjs(point.dateTo).isSameOrBefore(dayjs());
//const isPresentPoint = (point) => dayjs(point.dateFrom).isSameOrBefore(dayjs()) && dayjs(point.dateTo).isSameOrAfter(dayjs());
const isFuturePoint = (dateFrom) => dateFrom && (dayjs().isSame(dateFrom, 'D') || dayjs().isBefore(dateFrom, 'D'));

const filterTypeToFilter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point.dateFrom, point.dateTo))
};


export { filterTypeToFilter };
