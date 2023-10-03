import { getRandomRoutePoint } from '../mock/route-point.js';
import Observable from '../framework/observable.js';

const MODELS_COUNT = 5;

export default class RoutePointModel extends Observable{
  #routePoints = Array.from({length: MODELS_COUNT}, getRandomRoutePoint);

  get points(){
    return this.#routePoints;
  }

  updatePoint(updateType, update) {
    const index = this.#routePoints.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#routePoints = [
      ...this.#routePoints.slice(0, index),
      update,
      ...this.#routePoints.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#routePoints = [
      update,
      ...this.#routePoints,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#routePoints.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#routePoints = [
      ...this.#routePoints.slice(0, index),
      ...this.#routePoints.slice(index + 1),
    ];

    this._notify(updateType);
  }

}
