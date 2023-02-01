import {offersByType } from '../mock/mock.js';
import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offersByType = offersByType;

  get offersByType() {
    return this.#offersByType;
  }
}
