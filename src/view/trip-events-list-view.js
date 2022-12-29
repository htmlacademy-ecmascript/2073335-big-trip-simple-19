import { createElement } from '../render.js';

function createTemplate() {
  return (
    `<ul class="trip-events__list">
    </ul>`
  );
}

export default class TripEventsListView {
  #element = null;

  get template() {
    return createTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

