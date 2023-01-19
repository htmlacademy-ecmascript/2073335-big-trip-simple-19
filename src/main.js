import PointListPresenter from './presenter/point-list-presenter.js';
import PointsModel from './model/points-model.js';
import MainPresenter from './presenter/main-presenter.js';
import { generateFilters } from './mock/filter.js';
import TripDestinationsModel from './model/trip-destinations-model.js';
import OffersModel from './model/offers-model.js';


const headerElement = document.querySelector('.page-header__container');
const pageBodyElement = document.querySelector('.page-body__page-main');
const pageBodyContainerElement = pageBodyElement.querySelector('.page-body__container');


const pointsModel = new PointsModel();
const tripDestinationModel = new TripDestinationsModel();
const offersModel = new OffersModel();
const filters = generateFilters(pointsModel.points);

const pointListPresenter = new PointListPresenter({container: pageBodyContainerElement, pointsModel, tripDestinationModel, offersModel});
const mainPresenter = new MainPresenter({container: headerElement, filters});

mainPresenter.init();
pointListPresenter.init();
