import {remove, render, RenderPosition} from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import TripEventsView from '../view/trip-events-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import { sortByPrice, sortByDay, sortByTime } from '../utils/sort.js';
import { UpdateType, UserAction, FilterType, SortType, TimeLimit } from '../const.js';
import { filterTypeToFilter } from '../utils/filter.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import ErrorView from '../view/error-view.js';

export default class PointListPresenter {
  #container = null;
  #pointsModel = null;
  #filterModel = null;

  #newPointPresenter = null;

  #errorView = new ErrorView();
  #emptyListView = null;
  #sortView = null;
  #tripEventsView = new TripEventsView();
  #tripEventsListView = new TripEventsListView();

  #loadingView = new LoadingView();

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER,
    upperLimit: TimeLimit.UPPER
  });

  #pointPresenters = new Map();

  constructor({container, pointsModel, filterModel, onNewPointDestroy}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
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

  init() {
    this.#renderTripEventsView();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init({
      tripDestinations: this.#pointsModel.destinations,
      allOffers: this.#pointsModel.offers,
    });
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#tripEventsListView.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init({
      point,
      tripDestinations: this.#pointsModel.destinations,
      allOffers: this.#pointsModel.offers,
    });
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderSort() {
    this.#sortView = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortView, this.#tripEventsView.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoint () {
    this.#emptyListView = new EmptyListView({
      filterType: this.#filterType
    });
    render(this.#emptyListView, this.#tripEventsView.element);
  }

  #renderList () {
    render(this.#tripEventsListView, this.#tripEventsView.element);
  }

  #renderLoadingMessage() {
    render(this.#loadingView, this.#tripEventsListView.element);
  }

  #renderError() {
    render(this.#errorView, this.#tripEventsListView.element);
  }

  #renderPoints () {
    for (const point of this.points) {
      this.#renderPoint(point);
    }
  }

  #renderTripEventsView () {
    this.#renderList();
    render(this.#tripEventsView, this.#container);

    const points = this.points;
    const pointsCount = points.length;

    if (this.#isLoading) {
      this.#renderLoadingMessage();
      return;
    }

    if (!pointsCount && !this.#pointsModel.offers.length && !this.#pointsModel.destinations.length) {
      this.#renderError();
      return;
    }

    if (pointsCount > 0) {
      remove(this.#emptyListView);
      this.#renderSort();

      this.#renderPoints();
    } else {
      this.#renderNoPoint();
    }
  }


  #clear({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortView);
    remove(this.#loadingView);
    remove(this.#emptyListView);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleModelEvent = (updateType, point) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(point.id).init({
          point,
          tripDestinations: this.#pointsModel.destinations,
          allOffers: this.#pointsModel.offers,
        });
        break;
      case UpdateType.MINOR:
        this.#clear();
        this.#renderTripEventsView();
        break;
      case UpdateType.MAJOR:
        this.#clear({resetSortType: true});
        this.#renderTripEventsView();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingView);
        this.#renderTripEventsView();
        break;
    }
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
