import dayjs from 'dayjs';

function humanizeDate(eventDate, dateFormat) {
  return eventDate ? dayjs(eventDate).format(dateFormat) : '';
}

function capitalize(text) {
  return text.charAt(0).toUpperCase().concat(text.slice(1));
}

export {humanizeDate, capitalize};
