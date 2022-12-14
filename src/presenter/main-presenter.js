import {render} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import TripControlsFiltersView from '../view/trip-controls-filters-view.js';
import TripMainView from '../view/trip-main-view.js';


export default class MainPresenter {
  #container = null;
  #filters = [];

  #tripMainView = new TripMainView();
  #tripControlsFiltersView = new TripControlsFiltersView();


  constructor ({container, filters}) {
    this.#container = container;
    this.#filters = filters;
  }

  init() {
    render(new FilterView(this.#filters), this.#tripControlsFiltersView.element);
    render(this.#tripControlsFiltersView, this.#tripMainView.element);
    render(new NewEventButtonView(), this.#tripMainView.element);
    render(this.#tripMainView, this.#container);
  }
}
