import AbstractView from '../../framework/view/abstract-view.js';
import { createFilters } from '../../components/view/filter.js';

export default class Filters extends AbstractView {

  #filtredModelElement = null;
  #handleClick = null;

  constructor({filtredModelElement, onFilterClick}){
    super();

    this.#filtredModelElement = filtredModelElement;
    this.#handleClick = onFilterClick;

    this.element.querySelector(`#filter-${filtredModelElement.type}`).addEventListener('click',this.#clickHandler);
  }

  get template() {
    return createFilters(this.#filtredModelElement);
  }

  #clickHandler = (evt) =>{
    evt.preventDefault();
    this.#handleClick();
  };

}
