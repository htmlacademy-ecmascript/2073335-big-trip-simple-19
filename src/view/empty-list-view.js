import { FilterType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const messageForFilter = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
};


function createTemplate(filterType) {
  const messageValue = messageForFilter[filterType];

  return `<p class="trip-events__msg">${messageValue}</p>`;
}

export default class EmptyListView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createTemplate(this.#filterType);
  }
}
