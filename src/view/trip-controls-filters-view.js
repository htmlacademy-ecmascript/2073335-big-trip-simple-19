import { createElement } from '../render.js';

function createTemplate() {
  return ( `<div class="trip-main__trip-controls  trip-controls">
            <div class="trip-controls__filters">
            
            </div>
          </div>`
  );}

export default class TripControlsFiltersView {
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
