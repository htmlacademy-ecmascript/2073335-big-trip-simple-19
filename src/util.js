import dayjs from 'dayjs';

function humanizeDate(eventDate, dateFormat) {
  return eventDate ? dayjs(eventDate).format(dateFormat) : '';
}


function getRandomArrayItem (items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(a, b) {

  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function capitalize(text) {
  return text.charAt(0).toUpperCase().concat(text.slice(1));
}

export {getRandomArrayItem, getRandomNumber, humanizeDate, capitalize};
