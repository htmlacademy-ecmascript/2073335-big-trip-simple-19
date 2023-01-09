import {tripDestinations} from '../mock/mock.js';


export default class tripDestinationsModel {
  #tripDestinations = tripDestinations;

  get tripDestinations() {
    return this.#tripDestinations;
  }
}
