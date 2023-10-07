import {render} from '../src/framework/render.js';
import PagePresenter from '../src/page/page-presenter.js';
import RoutePointModel from '../src/model/route-point-model.js';
import FilterModel from '../src/model/filter-model.js';
import FilterPresenter from '../src/page/filter-presenter.js';
import NewEventBtn from '../src/components/model/new-event-btn-model.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic hS791S44wcl20a2j';
const END_POINT = 'https://21.objects.pages.academy/big-trip';

const controlsFilters = document.querySelector('.trip-controls__filters');

const tripEvents = document.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');

const routePointModel = new RoutePointModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: controlsFilters,
  filterModel:filterModel,
  routePointModel:routePointModel
});

const pagePresenter = new PagePresenter({
  pointModel: routePointModel,
  controlsFilters,
  tripEvents,
  filterModel,
  onNewEventClose: newEventBtnClose,
});

const newEventBtnComponent = new NewEventBtn({
  onClick: newEventBtnClick
});

function newEventBtnClose(){
  newEventBtnComponent.element.disabled = false;
}

function newEventBtnClick(){
  pagePresenter.createEvent();
  newEventBtnComponent.element.disabled = true;
}

filterPresenter.init();
pagePresenter.init();
routePointModel.init().finally(
  () => {
    render(newEventBtnComponent,tripMain);
  }
);
