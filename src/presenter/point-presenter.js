import EditFormView from '../view/edit-form-view.js';
import {render} from '../render.js';
import TripEventItemView from '../view/trip-events-item-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import TripEventsView from '../view/trip-events-view.js';
import EmptyListView from '../view/empty-list-view.js';

const POINT_COUNT = 0;

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

    if (this.#points.length === POINT_COUNT) {
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
    const pointCardView = new TripEventItemView({point, tripDestinations: this.#pointsDestinations, allOffers: this.#pointsOffersByTypes});
    const pointFormView = new EditFormView({point, tripDestinations: this.#pointsDestinations, allOffers: this.#pointsOffersByTypes});

    const replaceCardToForm = () => {
      this.#tripEventsListView.element.replaceChild(pointFormView.element, pointCardView.element);
    };
    //рейплейс форм ту кард только если форма открыта
    const replaceFormToCard = () => {
      this.#tripEventsListView.element.replaceChild(pointCardView.element, pointFormView.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key.startsWith('Esc')) {
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
        document.removeEventListener('keydown', escKeyDownHandler);

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


