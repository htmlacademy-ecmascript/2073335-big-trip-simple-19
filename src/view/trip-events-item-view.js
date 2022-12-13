import { createElement } from '../render.js';

const createTemplate = () => (
  `<li class="trip-events__item">
<div class="event">
  <time class="event__date" datetime="2019-03-20">MAR 20</time>
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/sightseeing.png" alt="Event type icon">
  </div>
  <h3 class="event__title">Sightseeing Geneva</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="2019-03-20T11:15">11:15</time>
      &mdash;
      <time class="event__end-time" datetime="2019-03-20T12:15">12:15</time>
    </p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">180</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    <li class="event__offer">
      <span class="event__offer-title">No additional offers</span>
    </li>
  </ul>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>
</li>`
);

export default class TripEventsItemView {
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
