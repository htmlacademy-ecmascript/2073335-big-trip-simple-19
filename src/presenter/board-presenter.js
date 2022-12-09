import NewFormView from '../view/creation-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import WaypointListView from '../view/waypoint-list-view.js';
import {render} from '../render.js';


const WAYPOINTS_COUNT = 3;

export default class BoardPresenter {
  boardComponent = new WaypointListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new EditFormView(), this.boardComponent.getElement(), 'afterbegin');
    render(this.boardComponent, this.boardContainer);


    for (let i = 0; i < WAYPOINTS_COUNT; i++) {
      render(new NewFormView(), this.boardComponent.getElement(), 'afterbegin');

    }
  }
}
