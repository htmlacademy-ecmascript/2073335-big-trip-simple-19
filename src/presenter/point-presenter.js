import EditFormView from '../view/edit-form-view.js';
import {render} from '../render.js';
import TripEventItemView from '../view/trip-events-item-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import TripEventsView from '../view/trip-events-view.js';

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

    for (const points of this.#points) {
      this.#renderPoint(points, this.#pointsDestinations, this.#pointsOffersByTypes);
    }

    render(new SortView(), this.#tripEventsView.element);
    render(this.#tripEventsListView, this.#tripEventsView.element);
    render(this.#tripEventsView, this.#container);
  }

  #renderPoint(point) {
    const pointCardView = new TripEventItemView({point, tripDestinations: this.#pointsDestinations, allOffers: this.#pointsOffersByTypes});
    const pointFormView = new EditFormView({point, tripDestinations: this.#pointsDestinations, allOffers: this.#pointsOffersByTypes});

    const replaceCardToForm = () => {
      this.#tripEventsListView.element.replaceChild(pointFormView.element, pointCardView.element);
    };

    const replaceFormToCard = () => {
      this.#tripEventsListView.element.replaceChild(pointCardView.element, pointFormView.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key.startsWith('Esc') || pointFormView.element.querySelector('.event__rollup-btn') ) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointCardView.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });
    if (pointFormView.element.querySelector('.event__rollup-btn')) {

      pointFormView.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
        replaceFormToCard();
        document.addEventListener('keydown', escKeyDownHandler);

      });
    }

    pointFormView.element.querySelector('.event__save-btn').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    });


    render(pointCardView, this.#tripEventsListView.element);
  }
}

