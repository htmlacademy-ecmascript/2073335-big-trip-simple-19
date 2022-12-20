import EditFormView from '../view/edit-form-view.js';
import {render, RenderPosition} from '../render.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import TripEventsView from '../view/trip-events-view.js';

export default class BoardPresenter {
  TripEventsView = new TripEventsView();
  TripEventsListView = new TripEventsListView();


  constructor({container, pointsModel}) {
    this.container = container;
    this.pointsModel = pointsModel;

  }

  init() {
    this.eventPoints = this.pointsModel.points;
    this.eventDestinations = this.pointsModel.tripDestinations;
    this.eventOffersByType = this.pointsModel.offersByType;

    this.eventPoints.forEach((event) => {
      render(new TripEventsItemView({ point: event, tripDestinations: this.eventDestinations, tripTypes: this.eventOffersByType}), this.TripEventsListView.getElement());
    });

    render(new SortView(), this.TripEventsView.getElement());
    render(new EditFormView({point: this.eventPoints[0], tripDestinations: this.eventDestinations, tripTypes: this.eventOffersByType}), this.TripEventsListView.getElement(), RenderPosition.AFTERBEGIN);
    render(this.TripEventsListView, this.TripEventsView.getElement());
    render(this.TripEventsView, this.container);
  }
}

