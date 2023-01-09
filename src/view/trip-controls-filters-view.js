import AbstractView from '../framework/view/abstract-view.js';

function createTemplate() {
  return (
    `<div class="trip-main__trip-controls  trip-controls">
            <div class="trip-controls__filters">
            </div>
     </div>`
  );}

export default class TripControlsFiltersView extends AbstractView {

  get template() {
    return createTemplate();
  }
}
