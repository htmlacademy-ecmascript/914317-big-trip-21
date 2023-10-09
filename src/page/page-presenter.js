import { render, remove } from '../framework/render.js';
import { sortDay, sortTime, sortPrice } from '../utils/util.js';
import { SortType, FilterType, UserAction, UpdateType } from '../const.js';
import Sort from '../components/model/sort.js';
import UList from '../components/model/add-list.js';
import PointPresenter from '../page/point-presenter.js';
import AddPointPresenter from '../page/add-point-presenter.js';
import { filter } from '../utils/filter.js';
//import LoadingView from '../view/loading-view.js';
export default class PagePresenter {

  //модели данных
  #routePointModel = null;
  #filterModel = null;

  //родители для компонентов
  #tripEvents = null;
  #controlsFilters = null;

  //компоненты
  #filterComponent = null;
  #sortComponent = null;
  #ulLstComponent = null;

  //презентеры
  #pointsPresenters = new Map();
  #AddPointPresenter = null;

  //служебное
  #currentSortType = SortType.DAY;
  #onNewEventClose = null;
  #isLoading = true;

  constructor({ pointModel, controlsFilters, tripEvents, filterModel, onNewEventClose }) {
    this.#routePointModel = pointModel;
    this.#tripEvents = tripEvents;
    this.#controlsFilters = controlsFilters;
    this.#filterModel = filterModel;
    this.#onNewEventClose = onNewEventClose;

    this.#routePointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#ulLstComponent = new UList();

    this.#AddPointPresenter = new AddPointPresenter({
      routePointModel: this.#routePointModel,
      container: this.#ulLstComponent,
      onDataChange: this.#handleViewAction,
      onNewEventClose: onNewEventClose
    });

  }

  createEvent() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.Everything);
    this.#AddPointPresenter.init();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#routePointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#routePointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#routePointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPageMinor();
        this.#renderPageMinor();
        break;
      case UpdateType.MAJOR:
        this.#clearPage();
        this.#renderPage();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#clearPage();
        this.#renderPage();
        break;
    }
  };

  get points() {

    const filterType = this.#filterModel.filter;
    const routePoints = this.#routePointModel.points;
    const filteredPoints = filter[filterType](routePoints);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortDay);
      case SortType.TIME:
        return filteredPoints.sort(sortTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPrice);
    }
    return filteredPoints;
  }


  /** запуск отрисовки страницы */
  init() {

    this.#renderPage();

  }

  #renderPageMinor() {

    //рендерим список
    this.#renderList();
  }

  #renderPage() {

    //рендерим сортировку
    this.#renderSort();

    //рендерим список
    this.#renderList();
  }

  #renderList() {
    //4. рендерим список
    this.#renderUlList();

    //5. рендерим элементы списка
    this.#renderPoints();
  }

  /**отрисовка отдельной точки маршрута*/
  #renderPoint(point) {

    const pointPresenter = new PointPresenter(
      {
        ulLstComponentElement: this.#ulLstComponent.element,
        onDataChange: this.#handleViewAction,
        onModeChange: this.#handleModeChange
      }
    );
    pointPresenter.renderPoint(point);

    this.#pointsPresenters.set(point.id, pointPresenter);
  }

  /** запуск рендера точек маршрута */
  #renderPoints() {
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i], this.#ulLstComponent.element);
    }
  }


  /**обработчик смены режима точки маршрута "редактирование-просмотр"*/
  #handleModeChange = () => {
    this.#AddPointPresenter.destroy();
    this.#pointsPresenters.forEach((pointPresenter) => pointPresenter.resetView());
  };


  /**рендер компонента сортировки*/
  #renderSort() {
    this.#sortComponent = new Sort({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripEvents);
  }


  /**обработчик нажатия на кнопку сортировки */
  #handleSortTypeChange = (sortType) => {

    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPageMinor();
    this.#renderPageMinor();

  };

  /**рендер обертки-списка Ul для точек маршрута*/
  #renderUlList() {
    render(this.#ulLstComponent, this.#tripEvents);
  }

  /**очистка страницы */
  #clearPage() {
    this.#AddPointPresenter.destroy();
    this.#pointsPresenters.forEach((pointPresenter) => pointPresenter.destroy());
    this.#pointsPresenters.clear();

    remove(this.#filterComponent);
    remove(this.#sortComponent);
    remove(this.#ulLstComponent);

    this.#currentSortType = SortType.DAY;
  }

  #clearPageMinor() {
    this.#AddPointPresenter.destroy();
    this.#pointsPresenters.forEach((pointPresenter) => pointPresenter.destroy());
    this.#pointsPresenters.clear();

    remove(this.#ulLstComponent);

  }

}
