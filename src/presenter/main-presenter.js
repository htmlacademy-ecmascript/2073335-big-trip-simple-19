import {render} from '../render.js';
import FilterView from '../view/filter-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import TripControlsFiltersView from '../view/trip-controls-filters-view.js';
import TripMainView from '../view/trip-main-view.js';


export default class MainPresenter {
  tripMainView = new TripMainView();
  TripControlsFiltersView = new TripControlsFiltersView();


  constructor ({container}) {
    this.container = container;
  }

  init() {

    render(new FilterView(), this.TripControlsFiltersView.getElement());
    render(this.TripControlsFiltersView, this.tripMainView.getElement());
    render(new NewEventButtonView(), this.tripMainView.getElement());
    render(this.tripMainView, this.container);
  }
}
