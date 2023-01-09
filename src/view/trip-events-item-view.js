import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate } from '../util.js';

function createTemplate(point, tripDestinations, allOffers) {
  const { basePrice, destination, type, offers, dateFrom, dateTo } = point;


  const destinationInfo = tripDestinations.find((item) => item.id === destination);
  const offersType = allOffers.find((offer) => offer.type === type);
  const checkedOffers = offersType.offers.filter((offer) => offers.includes(offer.id));

  const createOffersListTemplate = () => {
    if (checkedOffers.length === 0) {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">No additional offers</span>
        </li>`
      );
    }
    return checkedOffers.map((offer) =>
      `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>`).join('');
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom.toISOString()}">${humanizeDate(dateFrom, 'MMM DD')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationInfo.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom.toISOString()}">${humanizeDate(dateFrom, 'HH:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateFrom.toISOString()}">${humanizeDate(dateTo, 'HH:mm')}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersListTemplate()}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class TripEventsItemView extends AbstractView {
  #point = null;
  #tripDestinations = null;
  #allOffers = null;
  #handleEditClick = null;

  constructor({ point, tripDestinations, allOffers, onEditClick}) {
    super();
    this.#point = point;
    this.#tripDestinations = tripDestinations;
    this.#allOffers = allOffers;

    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

  }

  get template() {
    return createTemplate(this.#point, this.#tripDestinations, this.#allOffers);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
