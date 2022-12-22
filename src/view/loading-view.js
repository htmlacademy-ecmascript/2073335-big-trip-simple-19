import { createElement } from '../render.js';

function createTemplate() {
  return '<p class="trip-events__msg">Loading...</p>';
}

export default class LoadingView {
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
