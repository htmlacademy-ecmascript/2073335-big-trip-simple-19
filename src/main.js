import PointListPresenter from './presenter/point-list-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-event-button-view.js';
import { render } from './framework/render.js';
import PointApiService from './api-service.js';

const AUTHORIZATION = 'Basic bq4po49baal4pi6l';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';

const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const pageBodyElement = document.querySelector('.page-body__page-main');
const pageBodyContainerElement = pageBodyElement.querySelector('.page-body__container');

const filterModel = new FilterModel();
const pointsModel = new PointsModel({
  pointsApiService: new PointApiService(END_POINT, AUTHORIZATION)
});

const pointListPresenter = new PointListPresenter({
  container: pageBodyContainerElement,
  pointsModel,
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
pointsModel.init()
  .finally(() => {
    render(newPointButtonView, tripMainElement);
  });

filterPresenter.init();
pointListPresenter.init();
