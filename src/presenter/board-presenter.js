import EditFormView from '../view/edit-form-view.js';
import {render, RenderPosition} from '../render.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import TripEventsView from '../view/trip-events-view.js';

export default class BoardPresenter {
  tripEventsView = new TripEventsView();
  tripEventsListView = new TripEventsListView();


  constructor({container, pointsModel}) {
    this.container = container;
    this.pointsModel = pointsModel;

  }

  init() {
    this.pointsModels = this.pointsModel.points;
    this.pointsDestinations = this.pointsModel.tripDestinations;
    this.pointOffersByTypes = this.pointsModel.offersByType;

    this.pointsModels.forEach((event) => {
      render(new TripEventsItemView({ point: event, tripDestinations: this.pointsDestinations, tripTypes: this.pointOffersByTypes}), this.tripEventsListView.getElement());
    });

    render(new SortView(), this.tripEventsView.getElement());
    render(new EditFormView({point: this.pointsModels[0], tripDestinations: this.pointsDestinations, tripTypes: this.pointOffersByTypes}), this.tripEventsListView.getElement(), RenderPosition.AFTERBEGIN);
    render(this.tripEventsListView, this.tripEventsView.getElement());
    render(this.tripEventsView, this.container);
  }
}

