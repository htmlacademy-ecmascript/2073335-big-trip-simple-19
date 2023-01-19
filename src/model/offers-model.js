import {offersByType } from '../mock/mock.js';

export default class OffersModel {
  #offersByType = offersByType;

  get offersByType() {
    return this.#offersByType;
  }
}
