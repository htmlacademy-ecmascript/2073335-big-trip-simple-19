import EditFormView from '../view/edit-form-view.js';
import {render, replace} from '../framework/render.js';
import TripEventItemView from '../view/trip-events-item-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import TripEventsView from '../view/trip-events-view.js';
import EmptyListView from '../view/empty-list-view.js';

export default class PointPresenter {
  #container = null;
  #pointsModel = null;

  #tripEventsView = new TripEventsView();
  #tripEventsListView = new TripEventsListView();

  #points = [];
  #pointsDestinations = [];
  #pointsOffersByTypes = [];

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;

  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#pointsDestinations = [...this.#pointsModel.tripDestinations];
    this.#pointsOffersByTypes = [...this.#pointsModel.offersByType];

    if (this.#points.length === 0) {
      render(new EmptyListView(), this.#container);
      return;
    }

    for (const point of this.#points) {
      this.#renderPoint(point, this.#pointsDestinations, this.#pointsOffersByTypes);
    }

    render(new SortView(), this.#tripEventsView.element);
    render(this.#tripEventsListView, this.#tripEventsView.element);
    render(this.#tripEventsView, this.#container);
  }

  #renderPoint(point) {

    const escKeyDownHandler = (evt) => {
      if (evt.key.startsWith('Esc')) {
        evt.preventDefault();
        replaceFormToCard.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointCardView = new TripEventItemView({
      point,
      tripDestinations: this.#pointsDestinations,
      allOffers: this.#pointsOffersByTypes,

      onEventRollupClick: () => {
        replaceCardToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointFormView = new EditFormView({
      point,
      tripDestinations: this.#pointsDestinations,
      allOffers: this.#pointsOffersByTypes,

      onFormSubmit: () => {
        replaceFormToCard.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },

      onRollupClick: () => {
        replaceFormToCard.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }

    });

    function replaceCardToForm() {
      replace(pointFormView, pointCardView);
    }

    function replaceFormToCard() {
      replace(pointCardView, pointFormView);
    }

    render(pointCardView, this.#tripEventsListView.element);
  }
}


