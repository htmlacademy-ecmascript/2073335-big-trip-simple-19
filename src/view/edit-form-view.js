import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeDate, capitalize } from '../utils/common.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
};

const BLANK_OFFER = {
  type: '',
  offers: [],
};

function createPicturesListTemplate(pictures) {
  return pictures
    .map(({ src, description }) => `<img class="event__photo" src=${src} alt="${description}">`)
    .join('');
}

function createTripTypeTemplate(allOffers, point) {
  return allOffers.map(({type, id}) =>
    `<div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${point.type === type ? 'checked' : ''}> 
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${capitalize(type)}</label>
    </div>`).join('');
}

function createOffersTemplate(offerByType) {
  return offerByType.offers.map(({title, price, id}) =>
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" type="checkbox" name="event-offer-${title}" ${offerByType.type.includes(offerByType.type) ? 'checked' : ''} data-offer-id="${id}">
        <label class="event__offer-label" for="event-offer-${title}-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`).join('');
}

function createTemplate(state, tripDestinations, allOffers,) {
  const {isEdit, ...point} = state;
  const { basePrice, destination, dateFrom, dateTo, type} = point ?? createEmptyPoint();

  // const destinationInfo = tripDestinations.find((item) => item.id === destination);

  const {offers, type: offerType } = allOffers.find((offer) => offer.type === type) ?? BLANK_OFFER;
  const { name: descriptionName, description, pictures} = tripDestinations.find((item) => item.id === destination) ?? BLANK_DESTINATION;
  const offerByType = allOffers.find((offer) => offer.type === type);
  const destinationsOptionValueTemplate = tripDestinations.map((item) => `<option value="${item.name}"></option>`).join('');

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${offerType}.png" alt="Event type icon">
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
          <button class="event__reset-btn" type="reset">${isEdit ? 'Delete' : 'Cancel'}</button>
          ${isEdit ? '<button class="event__rollup-btn" type="button">' : ''}
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
        ${
    offerByType.offers.length > 0 ?
      `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
            ${createOffersTemplate(offerByType, offers, point)}
            
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
            ${pictures.length > 0 ? createPicturesListTemplate(pictures) : ''}
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
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ point = createEmptyPoint(), tripDestinations, allOffers, onFormSubmit, onRollupClick}) {
    super();
    this.#point = point;
    this.#tripDestinations = tripDestinations;
    this.#allOffers = allOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupClick = onRollupClick;
    this._setState(EditFormView.parsePointToState(point, tripDestinations));
    this._restoreHandlers();
  }

  get template() {
    return createTemplate(this._state, this.#tripDestinations, this.#allOffers);
  }


  _restoreHandlers() {
    const element = this.element;
    const eventAvailableOffers = element.querySelector('.event__available-offers');

    if (eventAvailableOffers) {
      eventAvailableOffers.addEventListener('change', this.#offerChangeHandler);
    }

    element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#rollupEventClickHandler);
    element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeChangeHandler);
    element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  reset(point) {
    this.updateElement(EditFormView.parsePointToState(point));
  }


  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

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
    const destinationName = evt.target.value;
    const selectedDestination = this.#tripDestinations.find(({name}) => name === destinationName) ?? BLANK_DESTINATION;
    this.updateElement({
      destination: selectedDestination.id,
    });
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


  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate
    });
  };

  #setDateFromPicker = () => {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: this._state.dateTo,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        time24hr: true
      }
    );
  };

  #setDateToPicker = () => {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        time24hr: true
      }
    );
  };


  static parsePointToState(point) {
  //  const destinationId = point.destination;

    return { ...point,
      isEdit: Object.hasOwn(point, 'id'),
      //destinationNames: tripDestinations.map({ name }) => name),
      // destinationInfo: tripDestinations.find(({ id }) => id === destinationId),
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};
    delete point.isEdit;
    return point;
  }


}
