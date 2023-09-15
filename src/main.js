import PagePresenter from '../page/page-presenter.js';
import RoutePointModel from '../src/model/route-point-model.js';

const controlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const routePointModel = new RoutePointModel();

const pagePresenter = new PagePresenter({pointModel: routePointModel,controlsFilters,tripEvents});
pagePresenter.init();
