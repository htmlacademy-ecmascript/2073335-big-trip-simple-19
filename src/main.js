//import FiltersView from './view/filter-view.js';
import { render,} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import ButtonView from './view/button-view.js';

const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const boardPresenter = new BoardPresenter({boardContainer: tripEventsElement});

render(new ButtonView(), tripMainElement);
render(new FilterView(), tripControlsFiltersElement);

render(new SortView(), tripEventsElement);


boardPresenter.init();
