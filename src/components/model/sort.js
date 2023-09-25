import AbstractView from '../../framework/view/abstract-view.js';
import { createSort } from '../../components/view/sort.js';

export default class Sort extends AbstractView {

  #handleSortTypeChange = null;

  constructor({onSortTypeChange}){
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click',this.#sortTypeChangeHandler);
  }


  #sortTypeChangeHandler = (evt) =>{
    if (evt.target.tagName !== 'INPUT'){
      return;
    }

    //evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);

  };

  get template() {
    return createSort();
  }
}
