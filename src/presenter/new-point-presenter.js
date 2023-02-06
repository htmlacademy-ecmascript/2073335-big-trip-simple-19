import {remove, render, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';
import EditFormView from '../view/edit-form-view.js';

export default class NewPointPresenter {
  #container = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #newPointView = null;

  constructor({container, onDataChange, onDestroy}) {
    this.#container = container;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init({tripDestinations, allOffers, }) {
    if (this.#newPointView !== null) {
      return;
    }

    this.#newPointView = new EditFormView({
      onFormSubmit: this.#handleFormSubmit,
      onResetClick: this.#handleResetClick,
      tripDestinations,
      allOffers
    });

    render(this.#newPointView, this.#container, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler, {once: true});
  }

  destroy() {
    if (this.#newPointView === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#newPointView);
    this.#newPointView = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#newPointView.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#newPointView.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#newPointView.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleResetClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key?.startsWith('Esc')) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
