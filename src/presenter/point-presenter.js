import { UserAction, UpdateType } from '../const.js';
import { render, replace, remove } from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import TripEventItemView from '../view/trip-events-item-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #container = null;
  #tripEventItemView = null;
  #editFormView = null;
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

    const prevTripEventItemView = this.#tripEventItemView;
    const prevEditFormView = this.#editFormView;

    this.#tripEventItemView = new TripEventItemView({
      point,
      tripDestinations,
      allOffers,
      onEventRollupClick: this.#handleOpenForm,

    });

    this.#editFormView = new EditFormView({
      point,
      tripDestinations,
      allOffers,
      onFormSubmit: this.#handleSubmitForm,
      onRollupClick: this.#handleCloseForm,
      onResetClick: this.#handleResetClick,
    });

    if (prevTripEventItemView === null || prevEditFormView === null) {
      render(this.#tripEventItemView, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripEventItemView, prevTripEventItemView);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripEventItemView, prevEditFormView);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevTripEventItemView);
    remove(prevEditFormView);
  }

  destroy() {
    remove(this.#tripEventItemView);
    remove(this.#editFormView);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editFormView.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editFormView.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editFormView.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#tripEventItemView.shake();
      return;
    }

    const resetFormState = () => {
      this.#editFormView.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editFormView.shake(resetFormState);
  }


  #replaceCardToForm() {
    this.#handleModeChange();
    replace(this.#editFormView, this.#tripEventItemView);
    this.#mode = Mode.EDITING;
    document.addEventListener('keydown', this.#escKeyDownHandler);

  }


  #replaceFormToCard() {
    replace(this.#tripEventItemView, this.#editFormView);
    this.#mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this.#escKeyDownHandler);

  }

  #handleCloseForm = () => {
    this.#editFormView.reset(this.#point);
    this.#replaceFormToCard();
  };

  #handleSubmitForm = (point) => {
    this.#handlePointChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point
    );
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

  #escKeyDownHandler = (evt) => {
    if (evt.key?.startsWith('Esc')) {
      evt.preventDefault();
      this.#editFormView.reset(this.#point);
      this.#replaceFormToCard();
    }
  };
}
