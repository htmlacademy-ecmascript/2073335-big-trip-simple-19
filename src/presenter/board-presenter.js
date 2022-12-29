import EditFormView from '../view/edit-form-view.js';
import {render} from '../render.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import TripEventsView from '../view/trip-events-view.js';

export default class BoardPresenter {
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

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderItem(this.#points[i], this.#pointsDestinations, this.#pointsOffersByTypes);
    }

    render(new SortView(), this.#tripEventsView.element);
    render(this.#tripEventsListView, this.#tripEventsView.element);
    render(this.#tripEventsView, this.#container);
  }

  #renderItem(point) {
    const tripEventsItemView = new TripEventsItemView({point, tripDestinations: this.#pointsDestinations, allOffers: this.#pointsOffersByTypes});
    const editFormView = new EditFormView({point, tripDestinations: this.#pointsDestinations, allOffers: this.#pointsOffersByTypes});

    const replaceCardToForm = () => {
      this.#tripEventsListView.element.replaceChild(editFormView.element, tripEventsItemView.element);
    };

    const replaceFormToCard = () => {
      this.#tripEventsListView.element.replaceChild(tripEventsItemView.element, editFormView.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    tripEventsItemView.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });
    if (editFormView.element.querySelector('.event__rollup-btn')) {
      editFormView.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
        replaceFormToCard();
        document.addEventListener('keydown', escKeyDownHandler);

      });
    }
    editFormView.element.querySelector('.event__save-btn').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    });


    render(tripEventsItemView, this.#tripEventsListView.element);
  }
}

