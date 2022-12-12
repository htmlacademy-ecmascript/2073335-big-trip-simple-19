import EditFormView from '../view/edit-form-view.js';
import {render, RenderPosition} from '../render.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';

const WAYPOINTS_COUNT = 3;

export default class BoardPresenter {
  boardComponent = new TripEventsListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {


    for (let i = 0; i < WAYPOINTS_COUNT; i++) {
      render(new TripEventsItemView(), this.boardComponent.getElement(), RenderPosition.AFTERBEGIN);
    }
    render(new EditFormView(), this.boardComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(this.boardComponent, this.boardContainer);

  }
}
