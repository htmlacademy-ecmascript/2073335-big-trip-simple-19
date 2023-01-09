import {offersByType } from '../mock/mock.js';

export default class offersModel {
  #offersByType = offersByType;

  get offersByType() {
    return this.#offersByType;
  }
}
