import { getRandomRoutePoint } from '../mock/route-point.js';

const MODELS_COUNT = 5;

export default class RoutePointModel {
  routePoints = Array.from({length: MODELS_COUNT}, getRandomRoutePoint);

  getRoutePoints(){
    return this.routePoints;
  }

}
