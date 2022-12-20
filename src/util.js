import dayjs from 'dayjs';

function humanizeEventDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
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


export {getRandomArrayItem, getRandomNumber, humanizeEventDueDate};
