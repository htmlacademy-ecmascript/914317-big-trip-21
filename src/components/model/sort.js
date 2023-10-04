import AbstractView from '../../framework/view/abstract-view.js';
import { createSort } from '../../components/view/sort.js';

export default class Sort extends AbstractView {

  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({currentSortType,onSortTypeChange}){
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click',this.#sortTypeChangeHandler);
  }


  #sortTypeChangeHandler = (evt) =>{
    if (evt.target.tagName !== 'INPUT'){
      return;
    }
    this.#handleSortTypeChange(evt.target.dataset.sortType);

  };

  get template() {
    return createSort(this.#currentSortType);
  }
}
