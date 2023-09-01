import PagePresenter from '../page/page-presenter.js';
import RoutePointModel from '../src/model/route-point-model.js';

const routePointModel = new RoutePointModel();

const pagePresenter = new PagePresenter({pointModel: routePointModel});
pagePresenter.init();
