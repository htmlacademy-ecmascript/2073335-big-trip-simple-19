import { render,} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterView from './view/filter-view.js';
import NewEventButtonView from './view/new-event-button-view.js';
import PointsModel from './model/model.js';

const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripMainElement = document.querySelector('.trip-main');
const pageBody = document.querySelector('.page-body__page-main');
const pageBodyContainerElement = pageBody.querySelector('.page-body__container');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({container: pageBodyContainerElement, pointsModel});


render(new NewEventButtonView(), tripMainElement);
render(new FilterView(), tripControlsFiltersElement);

boardPresenter.init();
