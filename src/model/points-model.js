import { getRandomPoint, tripDestinations, offersByType } from '../mock/mock.js';

const TASK_COUNT = 10;

export default class PointsModel {
  points = Array.from({ length: TASK_COUNT }, getRandomPoint);
  tripDestinations = tripDestinations;
  offersByType = offersByType;

  getPoints() {
    return this.points;
  }

  getTripDestinations() {
    return this.tripDestinations;
  }

  getOffersByType() {
    return this.offersByType;
  }
}
