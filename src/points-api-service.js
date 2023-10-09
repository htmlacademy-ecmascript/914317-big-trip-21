import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({ url: 'points' })
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: 'offers' })
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({ url: 'destinations' })
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}/`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptPointsToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }


  async deletePoint(point) {

    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;

  }

  #adaptPointsToServer(point) {
    const adaptedPoint = {
      ...point,
      'date_from': point.startTime instanceof Date ? point.startTime.toISOString() : null,
      'date_to': point.endTime instanceof Date ? point.endTime.toISOString() : null,
      'is_favorite': point.isFavourite,
      'type': point.eventType,
      'base_price': +point.price,
    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint.startTime;
    delete adaptedPoint.endTime;
    delete adaptedPoint.isFavourite;
    delete adaptedPoint.eventType;
    delete adaptedPoint.price;

    delete adaptedPoint.availableOffers;
    delete adaptedPoint.availableDestinations;

    return adaptedPoint;
  }

}
