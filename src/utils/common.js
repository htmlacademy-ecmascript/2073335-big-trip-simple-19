import dayjs from 'dayjs';

function humanizeDate(eventDate, dateFormat) {
  return eventDate ? dayjs(eventDate).format(dateFormat) : '';
}

function capitalize(text) {
  return text.charAt(0).toUpperCase().concat(text.slice(1));
}

function updatePoint(points, update) {
  return points.map((point) => point.id === update.id ? update : point);
}

export const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortByPrice = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortByTime = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? pointB.basePrice - pointA.basePrice;
};

export {humanizeDate, capitalize, updatePoint, sortByPrice, sortByTime};
