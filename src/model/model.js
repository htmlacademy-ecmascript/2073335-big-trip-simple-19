import { getRandomPoint } from '../mock/mock.js';

const POINTS_COUNT = 3;

export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomPoint);

  getPoints(){
    return this.points;
  }
}
