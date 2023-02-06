const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
};

const SortType = {
  TIME: 'time',
  PRICE: 'price',
  DAY: 'day',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const TimeLimit = {
  LOWER: 350,
  UPPER: 1000
};


export {FilterType, SortType, UserAction, UpdateType, TimeLimit};

