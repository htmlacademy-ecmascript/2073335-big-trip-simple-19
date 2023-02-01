import { UserAction, UpdateType } from '../const.js';
import { render, replace, remove } from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import TripEventItemView from '../view/trip-events-item-view.js';
import {isDatesEqual} from '../utils/common.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #container = null;
  #pointCardView = null;
  #pointFormView = null;
  #point = null;

  #handleModeChange = null;
  #handlePointChange = null;

  #mode = Mode.DEFAULT;

  constructor({container, onDataChange, onModeChange}) {
    this.#container = container;
    this.#handlePointChange = onDataChange;
    this.#handleModeChange = onModeChange;

  }

  init({point, allOffers, tripDestinations}) {
    this.#point = point;

    const prevPointCardView = this.#pointCardView;
    const prevPointFormView = this.#pointFormView;

    this.#pointCardView = new TripEventItemView({
      point,
      tripDestinations,
      allOffers,
      onEventRollupClick: this.#handleOpenForm,

    });

    this.#pointFormView = new EditFormView({
      point,
      tripDestinations,
      allOffers,
      onFormSubmit: this.#handleSubmitForm,
      onRollupClick: this.#handleCloseForm,
      onResetClick: this.#handleResetClick,
    });

    if (prevPointCardView === null || prevPointFormView === null) {
      render(this.#pointCardView, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointCardView, prevPointCardView);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointFormView, prevPointFormView);


    }

    remove(prevPointCardView);
    remove(prevPointFormView);
  }

  destroy() {
    remove(this.#pointCardView);
    remove(this.#pointFormView);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointFormView.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm() {
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
    replace(this.#pointFormView, this.#pointCardView);
    document.addEventListener('keydown', this.#escKeyDownHandler);

  }


  #replaceFormToCard() {
    replace(this.#pointCardView, this.#pointFormView);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleCloseForm = () => {
    this.#pointFormView.reset(this.#point);
    this.#replaceFormToCard();
  };

  #handleSubmitForm = (point, tripDestinations, allOffers) => {
    const isMinor =
    !isDatesEqual(this.#point.dateFrom, point.dateFrom) ||
    !isDatesEqual(this.#point.dateTo, point.dateTo);

    this.#handlePointChange(
      UserAction.UPDATE_POINT,
      isMinor ? UpdateType.MINOR : UpdateType.PATCH,
      point,
      tripDestinations,
      allOffers
    );
    this.#replaceFormToCard();
  };

  #handleOpenForm = () => {
    this.#replaceCardToForm();
  };

  #handleResetClick = (point) => {
    this.#handlePointChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  //временно поменяла из-за ошибки
  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointFormView.reset(this.#point);
      this.#replaceFormToCard();
    }
  };
}
