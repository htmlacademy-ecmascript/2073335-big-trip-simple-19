import {filterTypeToFilter} from '../utils/filter.js';

function generateFilters(points) {
  return Object.entries(filterTypeToFilter).map(
    ([filterName, filterPoints]) => ({
      name: filterName,
      isEmpty: filterPoints(points).length === 0,
    }),
  );
}

export {generateFilters};
