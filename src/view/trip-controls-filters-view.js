import { createElement } from '../render.js';

function createTemplate() {
  return (
    `<div class="trip-main__trip-controls  trip-controls">
            <div class="trip-controls__filters">
            </div>
     </div>`
  );}

export default class TripControlsFiltersView {
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
