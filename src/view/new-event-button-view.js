import AbstractView from '../framework/view/abstract-view.js';

function createTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class NewEventButtonView extends AbstractView {

  get template() {
    return createTemplate();
  }
}
