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

function isDatesEqual(dateA, dateB) {
  return dayjs(dateA).isSame(dateB, 'D');
}

export {humanizeDate, capitalize, updatePoint, isDatesEqual};
