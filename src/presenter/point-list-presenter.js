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
  #pointsDestinations = [];
  #pointsOffersByTypes = [];
  #pointPresenters = new Map ();

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;

  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#pointsDestinations = [...this.#pointsModel.tripDestinations];
    this.#pointsOffersByTypes = [...this.#pointsModel.offersByType];

    this.#renderTripEventsView();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };


  #renderSort() {
    render(this.#sortView, this.#tripEventsView.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {


    const pointData = {
      point,
      tripDestinations: this.#pointsDestinations,
      allOffers: this.#pointsOffersByTypes,
    };

    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#tripEventsListView.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(pointData);
    this.#pointPresenters.set(pointData.id, pointPresenter);
  }

  #renderNoPoint () {
    render(this.#emptyListView, this.#container.element, RenderPosition.AFTERBEGIN);
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderTripList () {
    for (const point of this.#points) {
      this.#renderPoint(point, this.#pointsDestinations, this.#pointsOffersByTypes);
    }
    render(this.#tripEventsListView, this.#tripEventsView.element);
  }

  #renderTripEventsView () {
    render(this.#tripEventsView, this.#container);

    if (this.#points.length === 0) {
      this.#renderNoPoint();
      return;
    }
    this.#renderSort();
    this.#renderTripList();

  }


}
