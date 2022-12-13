import EditFormView from '../view/edit-form-view.js';
import {render, RenderPosition} from '../render.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import TripEventsView from '../view/trip-events-view.js';

const WAYPOINTS_COUNT = 3;

export default class BoardPresenter {
  TripEventsView = new TripEventsView();
  TripEventsListView = new TripEventsListView();


  constructor({container}) {
    this.container = container;
  }

  init() {

    for (let i = 0; i < WAYPOINTS_COUNT; i++) {
      render(new TripEventsItemView(), this.TripEventsListView.getElement());
    }
    render(new SortView(), this.TripEventsView.getElement());
    render(new EditFormView(), this.TripEventsListView.getElement(), RenderPosition.AFTERBEGIN);
    render(this.TripEventsListView, this.TripEventsView.getElement());
    render(this.TripEventsView, this.container);
  }
}
