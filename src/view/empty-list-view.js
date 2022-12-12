import { createElement } from '../render.js';

const createTemplate = () => (
  `<section class="trip-events">
<h2 class="visually-hidden">Trip events</h2>

<p class="trip-events__msg">Click New Event to create your first point</p>
</section>`
);

export default class EmptyListView {
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
