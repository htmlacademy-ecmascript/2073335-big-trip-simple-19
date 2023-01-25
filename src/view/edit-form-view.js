import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeDate, capitalize } from '../utils/common.js';

function createEmptyPoint() {
  return {
    basePrice: 0,
    dateFrom: new Date(),
    dateTo: new Date(),
    destination: 0,
    offers: [],
    type: 'flight',
  };
}

const BLANK_DESTINATION = {
  name: '',
  description: '',
  pictures: [],
  offers: [],
  type: ''
};

function createPicturesListTemplate(picture) {
  let template = '';
  if (picture) {
    template = picture.pictures.map((item) => `<img class="event__photo" src=${item.src} alt="${item.description}">`
    ).join('');
  }
  return template;
}

function createTripTypeTemplate(allOffers, point, type) {
  return allOffers.map((item) =>
    `<div class="event__type-item">
      <input id="event-type-${item.type}-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.type}" ${type === item.type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${item.type}" for="event-type-${item.type}-${point.id}">${capitalize(item.type)}</label>
    </div>`).join('');
}

function createOffersTemplate({offers}) {
  return offers.map(({title, id, price}) =>
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" type="checkbox" name="event-offer-${title}" ${offers.includes(id) ? 'checked' : ''} data-offer-id="${id}">
        <label class="event__offer-label" for="event-offer-${title}-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`).join('');
}

function createTemplate(point, tripDestinations, allOffers) {
  const { basePrice, type, destination, offers, dateFrom, dateTo} = point;

  const destinationInfo = tripDestinations.find((item) => item.id === destination);
  const offerByType = allOffers.find((offer) => offer.type === type);

  const {offers: offersName, type: offersType } = allOffers.find((offer) => offer.type === type) ?? BLANK_DESTINATION;
  const { name: descriptionName, description, pictures} = tripDestinations.find((item) => item.id === destination) ?? BLANK_DESTINATION;

  const destinationsOptionValueTemplate = tripDestinations.map((item) => `<option value="${item.name}"></option>`).join('');

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${offersType}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createTripTypeTemplate(allOffers, point, type)}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
            </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${descriptionName}" list="destination-list-1">

            <datalist id="destination-list-1">
              ${destinationsOptionValueTemplate}
              </datalist>
            
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(dateFrom, 'YY/MM/DD HH:mm')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(dateTo, 'YY/MM/DD HH:mm')}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" min="1" value="${basePrice}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${point.isEdit ? 'Delete' : 'Cancel'}</button>
          ${point.isEdit ? '<button class="event__rollup-btn" type="button">' : ''}
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
        ${
    offersName ?
      `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
            ${createOffersTemplate(offerByType, offers)}
            
          </section>`
      : ''

    }
    </section>

    ${descriptionName.length > 0 ?
      `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            <div class="event__photos-container">
            <div class="event__photos-tape">
            ${pictures.length > 0 ? createPicturesListTemplate(destinationInfo) : ''}
            </div>
          </div>
          </div>
          </section>`
      : ''
    }
    
        </section>
      </form>
    </li>`
  );
}

export default class EditFormView extends AbstractStatefulView {
  #point = null;
  #tripDestinations = null;
  #allOffers = null;
  #handleFormSubmit = null;
  #handleRollupClick = null;

  constructor({ point = createEmptyPoint(), tripDestinations, allOffers, onFormSubmit, onRollupClick}) {
    super();
    this.#point = point;
    this.#tripDestinations = tripDestinations;
    this.#allOffers = allOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupClick = onRollupClick;
    this._setState(EditFormView.parsePointToState(point));
    this._restoreHandlers();
  }

  get template() {
    return createTemplate(this._state, this.#tripDestinations, this.#allOffers);
  }


  _restoreHandlers() {
    const element = this.element;

    element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    if ( element.querySelector('.event__rollup-btn')) {
      element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupEventClickHandler);
    }
    element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeChangeHandler);
    element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    if ( element.querySelector('.event__available-offers')) {
      element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    }
  }

  reset(point) {
    this.updateElement(EditFormView.parsePointToState(point));
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToPoint(this._state));
  };

  #rollupEventClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();

  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();


    this.updateElement({
      type: evt.target.value,
      offers: []
    });

  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedDestination = this.#tripDestinations.find((destination) => evt.target.value === destination.name);
    if (selectedDestination !== undefined) {
      this.updateElement({
        destination: selectedDestination.id,
        pictures: []
      });
    }
  };


  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const currentOfferId = Number(evt.target.dataset.offerId);
    const { offers } = this._state;

    const currentOfferIndex = offers.indexOf(currentOfferId);

    const updatedOffers = currentOfferIndex === -1
      ? offers.concat(currentOfferId)
      : offers.slice().splice(currentOfferIndex, 1);

    this._setState({ offers: updatedOffers }); };

  static parsePointToState(point) {
    return { ...point,
      isEdit: Object.hasOwn(point, 'id'),
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.isEdit;
  }
}
