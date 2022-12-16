import { createElement } from '../render.js';
import { humanizeEventDueDate } from '../util.js';
import { destinations, offersByTypes } from '../mock/mock.js';

const createTemplate = (point) => {
  const {basePrice, destination, type, offers, dateFrom, dateTo} = point;

  const date = humanizeEventDueDate(dateFrom, 'MMM DD');
  const timeStart = humanizeEventDueDate(dateFrom, 'HH:mm');
  const timeEnd = humanizeEventDueDate(dateTo, 'HH:mm');
  const timeStartInDateTime = humanizeEventDueDate(dateFrom, 'YYYY-MM-DDTHH:mm');
  const timeEndInDateTime = humanizeEventDueDate(dateTo, 'YYYY-MM-DDTHH:mm');

  const pointDestination = destinations.find((item) => destination === item.id);
  const pointOffersType = offersByTypes.find((offer) => offer.type === type);
  const offersChecked = pointOffersType.offers
    .filter((offer) => offers.includes(offer.id));

  const offersList = () => {
    if (!offersChecked.length) {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">No additional offers</span>
        </li>`
      );
    } else {
      const offersCheckedTemplate = offersChecked.map((offer) =>
        `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>`).join('');
      return offersCheckedTemplate;
    }
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${timeStartInDateTime}">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${pointDestination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${timeStartInDateTime}">${timeStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${timeEndInDateTime}">${timeEnd}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersList()}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class TripEventsItemView {
  constructor({point}) {
    this.point = point;

  }

  getTemplate() {
    return createTemplate(this.point);
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
