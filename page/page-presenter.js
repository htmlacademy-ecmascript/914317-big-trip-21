import { render, replace, remove } from '../src/framework/render.js';
import { generateFilter } from '../src/mock/filter.js';
import Filters from '../src/components/model/filter.js';
import Sort from '../src/components/model/sort.js';
// import AddNewPoint from '../src/components/model/add-new-point.js';
import EditPoint from '../src/components/model/edit-point.js';
import UList from '../src/components/model/add-list.js';
import FilterForm from '../src/components/model/fiter-form.js';
import PointItself from '../src/components/model/point-Itself.js';

export default class PagePresenter {
  #routePointModel = null;
  #pointModels = null;

  #filtredModel = null;

  #tripEvents = null;
  #controlsFilters = null;

  #filterComponent = null;
  #filterFormComponent = new FilterForm();
  #sortComponent = new Sort();
  #ulLstComponent = null;

  constructor({ pointModel, controlsFilters, tripEvents }) {
    this.#routePointModel = pointModel;
    this.#tripEvents = tripEvents;
    this.#controlsFilters = controlsFilters;
  }

  init() {

    //1. получаем модель данных
    this.#pointModels = [...this.#routePointModel.getRoutePoints()];

    //1.1 получаем массив объектов "название фильтра - массив отфильтрованных точек маршрута"
    this.#filtredModel = generateFilter(this.#pointModels);

    //2. рендерим фильтры
    //2.1 сначала отрендерим форму-обертку для фильтров
    this.#renderFilterForm();

    for (let i = 0; i < this.#filtredModel.length; i++) {
      this.#renderFilter(this.#filtredModel[i]);
    }

    //3. рендерим сортировку
    this.#renderSort();

    //4. рендерим список
    this.#renderUlList();

    //5. рендерим элементы списка
    for (let i = 0; i < this.#pointModels.length; i++) {
      this.#renderPoint(this.#pointModels[i], this.#ulLstComponent.element);
    }

  }

  /*рендер обертки-формы фильтров
 */
  #renderFilterForm() {
    render(this.#filterFormComponent, this.#controlsFilters);
  }

  /*отрисовка каждого фильтра
  */
  #renderFilter(filtredModelElement) {

    const renderPage = () => {
      remove(this.#ulLstComponent);
      this.#renderUlList();
      for (let i = 0; i < filtredModelElement.points.length; i++) {
        this.#renderPoint(filtredModelElement.points[i], this.#ulLstComponent.element);
      }
    };

    this.#filterComponent = new Filters({
      filtredModelElement: filtredModelElement,
      onFilterClick: () => {
        renderPage();
      }
    });
    render(this.#filterComponent, this.#filterFormComponent.element);
  }

  /*рендер сортировки
 */
  #renderSort() {
    render(this.#sortComponent, this.#tripEvents);
  }

  /*рендер обертки-списка Ul для точек маршрута
 */
  #renderUlList() {
    this.#ulLstComponent = new UList();
    render(this.#ulLstComponent, this.#tripEvents);
  }

  /*отрисовка точки маршрута
  */
  #renderPoint(point, uList) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointItself({
      pointModel: point,
      onRollDownClick: () => {
        replacePointToEdit();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditPoint({
      onRollUpClick: () => {
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
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
