import { render, remove } from '../src/framework/render.js';
import { updateItem, sortDay, sortTime, sortPrice } from '../src/utils/util.js';
import { generateFilter } from '../src/mock/filter.js';
import { SortType } from '../src/const.js';
import Filters from '../src/components/model/filter.js';
import Sort from '../src/components/model/sort.js';
import UList from '../src/components/model/add-list.js';
import FilterForm from '../src/components/model/fiter-form.js';
import PointPresenter from '../page/point-presenter.js';

export default class PagePresenter {

  //модели данных
  #routePointModel = null;
  #pointModels = null;
  #filtredModel = null;

  //родители для компонентов
  #tripEvents = null;
  #controlsFilters = null;

  //компоненты
  #filterComponent = null;
  #filterFormComponent = new FilterForm();
  #sortComponent = null;
  #ulLstComponent = null;

  //презентеры
  #pointsPresenters = new Map();

  //служебное
  #currentSortType = SortType.DAY;
  #sourcedPointModels = [];

  constructor({ pointModel, controlsFilters, tripEvents }) {
    this.#routePointModel = pointModel;
    this.#tripEvents = tripEvents;
    this.#controlsFilters = controlsFilters;
  }

  /** запуск отрисовки страницы */
  init() {

    //1. получаем модель данных
    this.#pointModels = [...this.#routePointModel.getRoutePoints()];

    //1.1 сохраняем модель данных в исходном виде
    this.#sourcedPointModels = [...this.#pointModels];

    //1.2 получаем массив объектов "название фильтра - массив отфильтрованных точек маршрута"
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
    this.#renderPoints();

  }

  /** запуск рендера точек маршрута */
  #renderPoints() {
    for (let i = 0; i < this.#pointModels.length; i++) {
      this.#renderPoint(this.#pointModels[i], this.#ulLstComponent.element);
    }
  }

  /**отрисовка отдельной точки маршрута*/
  #renderPoint(point) {

    const pointPresenter = new PointPresenter(
      {
        ulLstComponentElement: this.#ulLstComponent.element,
        onDataChange: this.#handlePointClick,
        onModeChange: this.#handleModeChange
      }
    );
    pointPresenter.renderPoint(point);

    this.#pointsPresenters.set(point.id, pointPresenter);
  }


  /** обработчик события 'клик' для обновления точки маршрута */
  #handlePointClick = (updatedPoint) => {

    //обновляем текущую модель данных
    this.#pointModels = updateItem(this.#pointModels, updatedPoint);

    //обновляем исходную модель данных
    this.#sourcedPointModels = updateItem(this.#sourcedPointModels, updatedPoint);

    //обновляем презентеры точек маршрута
    this.#pointsPresenters.get(updatedPoint.id).renderPoint(updatedPoint);
  };


  /**обработчик смены режима точки маршрута "редактирование-просмотр"*/
  #handleModeChange = () => {
    this.#pointsPresenters.forEach((pointPresenter) => pointPresenter.resetView());
  };


  /**рендер компонента сортировки*/
  #renderSort() {
    this.#sortComponent = new Sort({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripEvents);
  }


  /** сортировка точек маршрута */
  #sortPoints(sortType) {

    switch (sortType) {
      case SortType.DAY:
        this.#pointModels.sort(sortDay);
        break;
      case SortType.TIME:
        this.#pointModels.sort(sortTime);
        break;
      case SortType.PRICE:
        this.#pointModels.sort(sortPrice);
        break;
      default:
        this.#pointModels = [...this.#sourcedPointModels];
    }

    this.#currentSortType = sortType;
  }


  /**обработчик нажатия на кнопку сортировки */
  #handleSortTypeChange = (sortType) => {

    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoints();

  };


  /**рендер обертки-формы фильтров*/
  #renderFilterForm() {
    render(this.#filterFormComponent, this.#controlsFilters);
  }

  /**отрисовка каждого фильтра*/
  #renderFilter(filtredModelElement) {

    const renderPage = () => {
      remove(this.#ulLstComponent);
      this.#renderUlList();
      for (let i = 0; i < filtredModelElement.points.length; i++) {
        this.#renderPoint(filtredModelElement.points[i]);
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


  /**рендер обертки-списка Ul для точек маршрута*/
  #renderUlList() {
    this.#ulLstComponent = new UList();
    render(this.#ulLstComponent, this.#tripEvents);
  }


  /** очистка списка от точек маршрута */
  #clearPointList() {
    this.#pointsPresenters.forEach((pointPresenter) => pointPresenter.destroy());
    this.#pointsPresenters.clear();
  }

}
