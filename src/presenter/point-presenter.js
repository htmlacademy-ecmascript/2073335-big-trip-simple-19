import { render, replace, remove } from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import TripEventItemView from '../view/trip-events-item-view.js';
//уточнить
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

  init(point) {
    this.#point = point;

    const prevCardView = this.#pointCardView;
    const prevCardEditView = this.#pointFormView;

    this.#pointCardView = new TripEventItemView({... point,
      onEventRollupClick: this.#handleOpenForm
    });

    this.#pointFormView = new EditFormView({... point,
      onFormSubmit: this.#handleSubmitForm,
      onRollupClick: this.#handleCloseForm
    });

    if (prevCardView === null || prevCardEditView === null) {
      render(this.#pointCardView, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointCardView, prevCardView);
      this.#mode = Mode.EDITING; }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointFormView, prevCardEditView);
      this.#mode = Mode.DEFAULT;

    }

    remove(prevCardView);
    remove(prevCardEditView);
  }

  destroy() {
    remove(this.#pointCardView);
    remove(this.#pointFormView);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm() {
    replace(this.#pointFormView, this.#pointCardView);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointCardView, this.#pointFormView);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleCloseForm = () => {
    this.#replaceFormToCard();
  };

  #handleSubmitForm = () => {
    this.#replaceFormToCard();
  };

  #handleOpenForm = () => {
    this.#handleModeChange();
    this.#replaceCardToForm();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key.startsWith('Esc')) {
      evt.preventDefault();
      this.#handleCloseForm();
    }
  };
}
