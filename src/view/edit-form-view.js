import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeDate, capitalize } from '../utils/common.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

const BLANK_DESTINATION = {
  id: 0,
  name: '',
  description: '',
  pictures: [],

};

const BLANK_OFFER = {
  type: '',
  offers: [],
};

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

function createOffersTemplate(offers, point) {
  return offers.map(({title, price, id}) =>
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" type="checkbox" name="event-offer-${title}" ${point.offers.includes(id) ? 'checked' : ''} data-offer-id="${id}">
        <label class="event__offer-label" for="event-offer-${title}-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`).join('');
}

function createTemplate(state, tripDestinations, allOffers,) {
  const {isEdit, ...point} = state;
  const { basePrice, destination, dateFrom, dateTo, type, isDisabled, isSaving, isDeleting } = point;

  const { name: descriptionName, description, pictures} = tripDestinations.find((item) => item.id === destination) ?? BLANK_DESTINATION;
  const offerByType = allOffers.find((offer) => offer.type === type) ?? BLANK_OFFER;
  const destinationsOptionValueTemplate = tripDestinations.map((item) => `<option value="${item.name}"></option>`).join('');
  const typeOffers = offerByType.offers;
  const deleteButtonText = isDeleting ? 'Deleting...' : 'Delete';

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post ${isDisabled ? 'disabled' : ''}">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createTripTypeTemplate(allOffers, point)}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
            </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(descriptionName)}" list="destination-list-1"  ${isDisabled ? 'disabled' : ''} required>

            <datalist id="destination-list-1">
              ${destinationsOptionValueTemplate}
              </datalist>
            
          </div>
          <div class="event__field-group  event__field-group--time" ${isDisabled ? 'disabled' : ''}>
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
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" min="1" value="${basePrice}" ${isDisabled ? 'disabled' : ''} required>
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset">${isEdit ? deleteButtonText : 'Cancel'}</button>
          ${isEdit ? '<button class="event__rollup-btn" type="button">' : ''}
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
        ${
    typeOffers.length > 0 ?
      `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
            ${createOffersTemplate( typeOffers, point)}
            
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
  #handleResetClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ point = createEmptyPoint(), tripDestinations, allOffers, onFormSubmit, onRollupClick, onResetClick}) {
    super();
    this._setState(EditFormView.parsePointToState(point, tripDestinations));
    this.#point = point;
    this.#tripDestinations = tripDestinations;
    this.#allOffers = allOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupClick = onRollupClick;
    this.#handleResetClick = onResetClick;
    this._restoreHandlers();
  }

  get template() {
    return createTemplate(this._state, this.#tripDestinations, this.#allOffers);
  }


  _restoreHandlers() {
    const element = this.element;

    element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);
    element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#rollupEventClickHandler);
    element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeChangeHandler);
    element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    element.querySelector('.event__reset-btn').addEventListener('click', this.#formResetClickHandler);
    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  reset(point) {
    this.updateElement(EditFormView.parsePointToState(point));
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  #setDateFromPicker() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('input[name=event-start-time]'),
      {
        dateFormat: 'j/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        enableTime: true,
        maxDate: this._state.dateTo
      }
    );
  }

  #setDateToPicker() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('input[name=event-end-time]'),
      {
        dateFormat: 'j/m/y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        enableTime: true,
        minDate: this._state.dateFrom,
      }
    );
  }

  #priceInputHandler = (evt) => {
    evt.preventDefault();

    this._setState({
      basePrice: evt.target.valueAsNumber
    });
  };

  #formResetClickHandler = (evt) => {
    evt.preventDefault();

    this.#handleResetClick(EditFormView.parseStateToPoint(this._state));
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


  #dateFromChangeHandler = ([dateFrom]) => {
    this.#datepickerTo.set('minDate', dateFrom);
    this._setState({ dateFrom });
  };

  #dateToChangeHandler = ([dateTo]) => {
    this.#datepickerFrom.set('maxDate', dateTo);
    this._setState({ dateTo });
  };

  static parsePointToState(point) {
    return { ...point,
      isEdit: Object.hasOwn(point, 'id'),
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};
    delete point.isEdit;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
