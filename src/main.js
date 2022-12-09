import FiltersView from './view/filter-view.js';
import { render,} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import SortView from './view/sort-view.js';

const bodyElement = document.querySelector('.page-body');
const filtersElement = bodyElement.querySelector('.trip-controls__filters');
const sortElement = bodyElement.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: sortElement});

render(new SortView(), sortElement);
render(new FiltersView(), filtersElement);

boardPresenter.init();
