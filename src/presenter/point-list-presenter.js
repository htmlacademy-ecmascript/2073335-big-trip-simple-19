import {remove, render, RenderPosition} from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import TripEventsView from '../view/trip-events-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import { SortType } from '../const.js';
import { sortByPrice, sortByDay, sortByTime } from '../utils/sort.js';
import { UpdateType, UserAction, FilterType } from '../const.js';
import { filterTypeToFilter } from '../utils/filter.js';
import NewPointPresenter from './new-point-presenter.js';

export default class PointListPresenter {
  #container = null;
  #pointsModel = null;
  #destinationModel = null;
  #offersModel = null;
  #filterModel = null;

  #newPointPresenter = null;

  #sortView = null;
  #tripEventsView = new TripEventsView();
  #tripEventsListView = new TripEventsListView();
  #emptyListView = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  #pointPresenters = new Map();
  #newPointPresenters = new Map();

  constructor({container, pointsModel, tripDestinationModel, offersModel, filterModel, onNewPointDestroy}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationModel = tripDestinationModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      container: this.#tripEventsListView.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filterTypeToFilter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
    }
    return filteredPoints.sort(sortByDay);
  }

  get offers() {
    return this.#offersModel.offersByType;
  }

  get destinations() {
    return this.#destinationModel.tripDestinations;
  }

  init() {
    this.#renderTripEventsView();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init({
      tripDestinations: this.destinations,
      allOffers: this.offers
    });
  }

  #renderSort() {
    this.#sortView = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortView, this.#tripEventsView.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#tripEventsListView.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init({
      point,
      tripDestinations: this.destinations,
      allOffers: this.offers
    });
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderNoPoint () {
    this.#emptyListView = new EmptyListView({
      filterType: this.#filterType
    });
    render(this.#emptyListView, this.#container, RenderPosition.AFTERBEGIN);
  }

  #clear({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    remove(this.#sortView);

    if (this.#emptyListView) {
      remove(this.#emptyListView);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderPoints () {
    for (const point of this.points) {
      this.#renderPoint(point);
    }
  }

  #renderList () {
    render(this.#tripEventsListView, this.#tripEventsView.element);
  }

  #renderTripEventsView () {
    if (this.points.length === 0) {
      this.#renderNoPoint();
      return;
    }
    this.#renderSort();
    this.#renderPoints();
    this.#renderList();
    render(this.#tripEventsView, this.#container);
  }

  #handleModelEvent = (updateType, point, offers, destination) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(point.id).init(point, offers, destination);
        break;
      case UpdateType.MINOR:
        this.#clear();
        this.#renderTripEventsView();
        break;
      case UpdateType.MAJOR:
        this.#clear({resetSortType: true});
        this.#renderTripEventsView();
        break;
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clear();
    this.#renderTripEventsView();
  };
}
