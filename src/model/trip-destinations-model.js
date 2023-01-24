import {tripDestinations} from '../mock/mock.js';


export default class TripDestinationsModel {
  #tripDestinations = tripDestinations;

  get tripDestinations() {
    return this.#tripDestinations;
  }
}
