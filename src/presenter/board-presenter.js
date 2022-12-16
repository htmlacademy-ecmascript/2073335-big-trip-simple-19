import EditFormView from '../view/edit-form-view.js';
import {render, RenderPosition} from '../render.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import TripEventsView from '../view/trip-events-view.js';

//const WAYPOINTS_COUNT = 3;

export default class BoardPresenter {
  TripEventsView = new TripEventsView();
  TripEventsListView = new TripEventsListView();


  constructor({container, pointsModel}) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init() {

    this.listPoints = [...this.pointsModel.getPoints()];

    for (let i = 0; i < this.listPoints.length; i++) {
      render(new TripEventsItemView({point: this.listPoints[i]}), this.TripEventsListView.getElement());
    }
    render(new SortView(), this.TripEventsView.getElement());
    render(new EditFormView(this.listPoints[0]), this.TripEventsListView.getElement(), RenderPosition.AFTERBEGIN);
    render(this.TripEventsListView, this.TripEventsView.getElement());
    render(this.TripEventsView, this.container);
  }
}
