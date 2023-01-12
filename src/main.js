import PointListPresenter from './presenter/point-list-presenter.js';
import PointsModel from './model/points-model.js';
import MainPresenter from './presenter/main-presenter.js';
import { generateFilters } from './mock/filter.js';


const headerElement = document.querySelector('.page-header__container');
const pageBodyElement = document.querySelector('.page-body__page-main');
const pageBodyContainerElement = pageBodyElement.querySelector('.page-body__container');


const pointsModel = new PointsModel();
const filters = generateFilters(pointsModel.points);

const pointListPresenter = new PointListPresenter({container: pageBodyContainerElement, pointsModel});
const mainPresenter = new MainPresenter({container: headerElement, filters});

mainPresenter.init();
pointListPresenter.init();
