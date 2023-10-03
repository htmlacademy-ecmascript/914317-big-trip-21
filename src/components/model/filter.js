import AbstractView from '../../framework/view/abstract-view.js';
import { createFilters } from '../view/filter.js';

export default class Filters extends AbstractView {

  #filtredModel = null;
  #onHandleClick = null;
  #currentFilter = null;

  constructor({filtredModel,currentFilterType, onFilterTypeChange}){
    super();

    this.#filtredModel = filtredModel;
    this.#currentFilter = currentFilterType;
    this.#onHandleClick = onFilterTypeChange;

    this.element.addEventListener('change',this.#clickHandler);
  }

  get template() {
    return createFilters(this.#filtredModel);
  }

  #clickHandler = (evt) =>{
    evt.preventDefault();
    this.#onHandleClick(evt.target.value);
  };

}
