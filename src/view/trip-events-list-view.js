import { createElement } from '../render.js';

const createTemplate = () => (
  `<ul class="trip-events__list">
</ul>`
);

export default class TripEventsListView {
  getTemplate() {
    return createTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
