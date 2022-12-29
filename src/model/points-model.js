import { getRandomPoint, tripDestinations, offersByType } from '../mock/mock.js';

const WAYPOINTS_COUNT = 3;

export default class PointsModel {
  #points = Array.from({ length: WAYPOINTS_COUNT }, getRandomPoint);
  #tripDestinations = tripDestinations;
  #offersByType = offersByType;

  get points() {
    return this.#points;
  }

  get tripDestinations() {
    return this.#tripDestinations;
  }

  get offersByType() {
    return this.#offersByType;
  }
}
