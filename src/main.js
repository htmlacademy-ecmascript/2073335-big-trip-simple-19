import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import MainPresenter from './presenter/main-presenter.js';

const header = document.querySelector('.page-header__container');
const pageBody = document.querySelector('.page-body__page-main');

const pageBodyContainerElement = pageBody.querySelector('.page-body__container');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({container: pageBodyContainerElement, pointsModel});
const mainPresenter = new MainPresenter({container: header});


mainPresenter.init();
boardPresenter.init();
