import { createElement } from '../render.js';

function createTemplate() {
  return (
    `<section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
    </section>`
  );
}

export default class TripEventsView {
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
