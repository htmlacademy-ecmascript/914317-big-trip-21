import { render } from '../src/render.js';
import Filters from '../src/components/model/filter.js';
import Sort from '../src/components/model/sort.js';
import AddNewPoint from '../src/components/model/add-new-point.js';
import EditPoint from '../src/components/model/edit-point.js';
import PointItself from '../src/components/model/point-Itself.js';


const controlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

export default class PagePresenter {

  constructor({pointModel}){
    this.routePointModel = pointModel;
  }

  init() {

    this.pointModels = [...this.routePointModel.getRoutePoints()];

    render(new Filters(), controlsFilters);
    render(new Sort(), tripEvents);
    render(new EditPoint(), tripEvents);
    render(new AddNewPoint(), tripEvents);

    for (let i = 0; i < this.pointModels.length; i++){
      render(new PointItself(this.pointModels[i]), tripEvents);
    }

  }

}
