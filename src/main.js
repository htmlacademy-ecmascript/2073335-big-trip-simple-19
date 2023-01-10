import PointPresenter from './presenter/point-presenter.js';
import PointsModel from './model/points-model.js';
import MainPresenter from './presenter/main-presenter.js';
import { generateFilter } from './mock/filter.js';


const headerElement = document.querySelector('.page-header__container');
const pageBodyElement = document.querySelector('.page-body__page-main');
const pageBodyContainerElement = pageBodyElement.querySelector('.page-body__container');


const pointsModel = new PointsModel();
const filters = generateFilter(pointsModel.points);

const pointPresenter = new PointPresenter({container: pageBodyContainerElement, pointsModel});
const mainPresenter = new MainPresenter({container: headerElement, filters: filters});

mainPresenter.init();
pointPresenter.init();
