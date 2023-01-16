import { SortType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createTemplate(currentSortType) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <div class="trip-sort__item  trip-sort__item--day">
        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type="${SortType.DAY}" value="sort-day" ${currentSortType === SortType.DAY ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-day">Day</label>
      </div>
      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>
      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type="${SortType.TIME}" value="sort-time" ${currentSortType === SortType.TIME ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-time">Time</label>
      </div>
      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type="${SortType.PRICE}" value="sort-price" ${currentSortType === SortType.PRICE ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-price">Price</label>
      </div>
      <div class="trip-sort__item  trip-sort__item--offer">
        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"  value="sort-offer" disabled>
        <label class="trip-sort__btn" for="sort-offer">Offers</label>
      </div>
    </form>`
  );
}

export default class SortView extends AbstractView {

  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}

