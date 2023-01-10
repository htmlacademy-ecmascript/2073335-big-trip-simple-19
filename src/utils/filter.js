import dayjs from 'dayjs';

const isFuturePoint = (dateFrom) => dateFrom && (dayjs().isSame(dateFrom, 'D') || dayjs().isBefore(dateFrom, 'D'));

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
};

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point.dateFrom)),
};

export { filter };
