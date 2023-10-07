import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class RoutePointModel extends Observable {
  #routePoints = [];
  #offers = [];
  #destinations = [];
  #pointsApiService = null;

  constructor({ pointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      const pointsFromApi = await this.#pointsApiService.points;
      this.#routePoints = pointsFromApi.map(this.#adaptPointsToClient);

      const offersFromApi = await this.#pointsApiService.offers;
      this.#offers = offersFromApi.map(this.#adaptOffersToClient);

      const destinationsFromApi = await this.#pointsApiService.destinations;
      this.#destinations = destinationsFromApi;

      this.#routePoints.map((item) => {
        item['availableOffers'] = this.#offers;
        item['availableDestinations'] = this.#destinations;
      });


    } catch (err) {
      this.#routePoints = [];
    }
    this._notify(UpdateType.INIT);
  }

  #adaptPointsToClient(point) {
    const adaptedPoint = {
      ...point,
      startTime: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      endTime: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      price: point['base_price'],
      isFavourite: point['is_favorite'],
      eventType: point['type'],
    };

    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['type'];

    return adaptedPoint;
  }

  #adaptOffersToClient(offer) {
    const adaptedOffer = {
      ...offer
    };

    adaptedOffer.offers.forEach((offerArray) => {
      offerArray['name'] = offerArray['title'];
      delete offerArray['title'];
    });


    return adaptedOffer;
  }

  get points() {
    return this.#routePoints;
  }

  async updatePoint(updateType, update) {
    const index = this.#routePoints.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedTask = this.#adaptPointsToClient(response);
      this.#routePoints = [...this.#routePoints.map((item) => item.id === updatedTask.id ? {...item,...updatedTask} : item)];
      this._notify(updateType, updatedTask);
    } catch (err) {
      throw new Error('Can\'t update task');
    }

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
