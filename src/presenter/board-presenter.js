import SortView from '../view/sort-view.js';
import NewFormView from '../view/creation-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import FilterView from '../view/filter-view.js';
import WaypointListView from '../view/waypoint-list-view.js';
import {render} from '../render.js';


const WAYPONTS_COUNT = 3;
//const tripEventsElement = document.querySelector('.trip-events');


export default class BoardPresenter {
  boardComponent = new WaypointListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new EditFormView(), this.boardComponent.getElement(), 'afterbegin');
    render(new FilterView(), this.boardComponent.getElement());
    render(new SortView(), this.boardComponent.getElement());
    render(this.boardComponent, this.boardContainer);


    for (let i = 0; i < WAYPONTS_COUNT; i++) {
      render(new NewFormView(), this.boardComponent.getElement(), 'afterbegin');

    }
  }
}
