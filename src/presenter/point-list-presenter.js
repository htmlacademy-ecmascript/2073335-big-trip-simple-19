import {render, RenderPosition} from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import TripEventsView from '../view/trip-events-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import { updatePoint } from '../utils/common.js';

export default class PointListPresenter {
  #container = null;
  #pointsModel = null;

  #tripEventsView = new TripEventsView();
  #tripEventsListView = new TripEventsListView();
  #sortView = new SortView();
  #emptyListView = new EmptyListView();

  #points = [];
  #destinations = [];
  #allOffers = [];

  #pointPresenters = new Map ();

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;

  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.tripDestinations];
    this.#allOffers = [...this.#pointsModel.offersByType];

    this.#renderTripEventsView();
  }

  #renderSort() {
    render(this.#sortView, this.#tripEventsView.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {


    const pointData = {
      point,
      tripDestinations: this.#destinations,
      allOffers: this.#allOffers,
    };

    const pointPresenter = new PointPresenter({
      container: this.#tripEventsListView.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(pointData);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderNoPoint () {
    render(this.#emptyListView, this.#container.element, RenderPosition.AFTERBEGIN);
  }

  #clear() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointsInList () {
    for (const point of this.#points) {
      this.#renderPoint(point, this.#destinations, this.#allOffers);
    }
  }

  #renderList () {
    render(this.#tripEventsListView, this.#tripEventsView.element);
  }

  #renderTripEventsView () {
    render(this.#tripEventsView, this.#container);

    if (this.#points.length === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    this.#renderPointsInList();
    this.#renderList();

  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };


}
