import { createElement } from '../render.js';

function createTemplate() {
  return (`<div class="trip-main">
  <section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">My BigTrip</h1>
              <p class="trip-info__dates">Sometimes…</p>
            </div>
          </section> 
  </div>`
  );}

export default class TripMainView{
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

