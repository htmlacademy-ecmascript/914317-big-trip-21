import FilterView from '../components/model/filter.js';
import {render, replace, remove} from '../framework/render.js';
import {FilterType, UpdateType} from '../const.js';

export default class FilterPresenter{

  #filterContainer = null;
  #filterModel = null;
  #routePointModel = null;

  #filterComponent = null;

  constructor({filterContainer, filterModel, routePointModel}){
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#routePointModel = routePointModel;

    this.#routePointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {

    return Object.values(FilterType).map((type) => ({
      type
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filtredModel:filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange,
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

}
