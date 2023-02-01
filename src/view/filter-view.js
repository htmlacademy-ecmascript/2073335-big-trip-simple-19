import AbstractView from '../framework/view/abstract-view.js';

function createFiltersTemplate(filter, currentFilterType) {
  const {type, name, count} = filter;
  return (
    `<div class="trip-filters__filter">
        <input id='filter-${name}' class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${type} ${type === currentFilterType ? 'checked' : ''} ${count > 0 ? '' : 'disabled'}>
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
}

function createTemplate(filterItems, currentFilterType) {
  const filtersTemplate = filterItems.map((filter) => createFiltersTemplate(filter, currentFilterType))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
        ${filtersTemplate}
        <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`);
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
