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

function getWeightForNullData(dataA, dataB) {
  if (dataA === null && dataB === null) {
    return 0;
  }

  if (dataA === null) {
    return 1;
  }

  if (dataB === null) {
    return -1;
  }

  return null;

}

function sortByTime (pointA, pointB) {
  const weight = getWeightForNullData(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortByPrice (pointA, pointB) {
  const weight = getWeightForNullData(pointA.dateFrom, pointB.dateFrom);

  return weight ?? pointB.basePrice - pointA.basePrice;
}


export {humanizeDate, capitalize, updatePoint, sortByPrice, sortByTime};
