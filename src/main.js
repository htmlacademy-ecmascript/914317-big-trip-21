import {render} from '../src/framework/render.js';
import PagePresenter from '../page/page-presenter.js';
import RoutePointModel from '../src/model/route-point-model.js';
import FilterModel from '../src/model/filter-model.js';
import FilterPresenter from '../page/filter-presenter.js';
import NewEventBtn from '../src/components/model/new-event-btn-model.js';


const controlsFilters = document.querySelector('.trip-controls__filters');

const tripEvents = document.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');

const routePointModel = new RoutePointModel();
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

render(newEventBtnComponent,tripMain);
filterPresenter.init();
pagePresenter.init();
