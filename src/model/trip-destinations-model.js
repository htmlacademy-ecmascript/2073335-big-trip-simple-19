import {tripDestinations} from '../mock/mock.js';
import Observable from '../framework/observable.js';

export default class TripDestinationsModel extends Observable {
  #tripDestinations = tripDestinations;

  get tripDestinations() {
    return this.#tripDestinations;
  }
}
