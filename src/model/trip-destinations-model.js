import {tripDestinations} from '../mock/mock.js';


export default class TripDestinationsModel {
  #tripDestination = tripDestinations;

  get tripDestination() {
    return this.#tripDestination;
  }
}
