import { Mode } from '../const.js';
import { render, replace, remove } from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import TripEventItemView from '../view/trip-events-item-view.js';

export default class PointPresenter {
  #pointsListContainer = null;
  #pointCardView = null;
  #pointEditView = null;
  #handlePointChange = null;
  #point = null;
  #mode = Mode.DEFAULT;
  #handleModeChange = null;

  constructor({pointsListContainer, onDataChange, onModeChange}) {
    this.#pointsListContainer = pointsListContainer;
    this.#handlePointChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key.startsWith('Esc')) {
      evt.preventDefault();
      this.#closeForm();
    }
  };

  init(point) {
    this.#point = point;

    const prevCardComponent = this.#pointCardView;
    const prevCardEditComponent = this.#pointEditView;

    this.#pointCardView = new TripEventItemView({... point,
      onEventRollupClick: this.#openForm
    });

    this.#pointEditView = new EditFormView({... point,
      onFormSubmit: this.#submitForm,
      onRollupClick: this.#closeForm
    });

    if (prevCardComponent === null || prevCardEditComponent === null) {
      render(this.#pointCardView, this.#pointsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointCardView, prevCardComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditView, prevCardEditComponent);
    }

    remove(prevCardComponent);
    remove(prevCardEditComponent);
  }

  destroy() {
    remove(this.#pointCardView);
    remove(this.#pointEditView);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm() {
    replace(this.#pointEditView, this.#pointCardView);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointCardView, this.#pointEditView);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #closeForm = () => {
    this.#replaceFormToCard();
  };

  #submitForm = (point) => {
    this.#handlePointChange(point);
    this.#replaceFormToCard();
  };

  #openForm = () => {
    this.#handleModeChange();
    this.#replaceCardToForm();
  };
}
