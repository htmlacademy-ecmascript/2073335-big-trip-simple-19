import PointListPresenter from './presenter/point-list-presenter.js';
import PointsModel from './model/points-model.js';
import TripDestinationsModel from './model/trip-destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-event-button-view.js';
import { render } from './framework/render.js';


const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
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
  newPointButtonView.setEnable();
}

function handleNewPointButtonClick() {
  pointListPresenter.createPoint();
  newPointButtonView.setDisable();
}
render(newPointButtonView, tripMainElement);

filterPresenter.init();
pointListPresenter.init();
