import { render, replace } from '../src/framework/render.js';
import Filters from '../src/components/model/filter.js';
import Sort from '../src/components/model/sort.js';
// import AddNewPoint from '../src/components/model/add-new-point.js';
import EditPoint from '../src/components/model/edit-point.js';
import UList from '../src/components/model/add-list.js';
import PointItself from '../src/components/model/point-Itself.js';

export default class PagePresenter {
  #routePointModel = null;
  #pointModels = null;
  #tripEvents = null;
  #controlsFilters = null;

  #filterComponent = new Filters();
  #sortComponent = new Sort();

  constructor({ pointModel, controlsFilters, tripEvents }) {
    this.#routePointModel = pointModel;
    this.#tripEvents = tripEvents;
    this.#controlsFilters = controlsFilters;
  }

  init() {

    this.#pointModels = [...this.#routePointModel.getRoutePoints()];

    render(this.#filterComponent, this.#controlsFilters);
    render(this.#sortComponent, this.#tripEvents);
    render(new UList(), this.#tripEvents);

    const uList = document.querySelector('.trip-events__list');

    for (let i = 0; i < this.#pointModels.length; i++) {
      this.#renderPoint(this.#pointModels[i], uList);
    }

  }

  #renderPoint(point, uList) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape'){
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown',escKeyDownHandler);
      }
    };

    const pointComponent = new PointItself({
      pointModel: point,
      onRollDownClick: () => {
        replacePointToEdit();
        document.addEventListener('keydown',escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditPoint({
      onRollUpClick: () => {
        replaceEditToPoint();
        document.removeEventListener('keydown',escKeyDownHandler);
      }
    });

    function replacePointToEdit() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceEditToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, uList);
  }

}
