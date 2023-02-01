import PointListPresenter from './presenter/point-list-presenter.js';
import PointsModel from './model/points-model.js';
//import MainPresenter from './presenter/main-presenter.js';
//import { generateFilters } from './mock/filter.js';
import TripDestinationsModel from './model/trip-destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-event-button-view.js';
import { render } from './framework/render.js';


const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
//const mainEventsElement = document.querySelector('.trip-events');
const pageBodyElement = document.querySelector('.page-body__page-main');
const pageBodyContainerElement = pageBodyElement.querySelector('.page-body__container');

const filterModel = new FilterModel();
const pointsModel = new PointsModel();
const tripDestinationModel = new TripDestinationsModel();
const offersModel = new OffersModel();

const pointListPresenter = new PointListPresenter({
  container: pageBodyContainerElement,
  pointsModel,
  tripDestinationModel,
  offersModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filterPresenter = new FilterPresenter({
  container: tripFiltersElement,
  filterModel,
  pointsModel
});

const newPointButtonView = new NewPointButtonView ({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonView.element.disabled = false;
}

function handleNewPointButtonClick() {
  pointListPresenter.createPoint();
  newPointButtonView.element.disabled = true;
}
render(newPointButtonView, tripMainElement);

//Решила отказаться от мейнпрезентера. Этот закоментированный код  и лишние файлы удалю после правок если будут
//const mainPresenter = new MainPresenter({container: headerElement, filters});
//render(new NewEventButtonView(), tripMainElement);
//mainPresenter.init();
filterPresenter.init();
pointListPresenter.init();
