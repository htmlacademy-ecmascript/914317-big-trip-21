import AbstractView from '../../framework/view/abstract-view.js';
import { createPointItself } from '../../components/view/point-itself.js';

export default class PointItself extends AbstractView {

  #pointModel = null;
  #handleRollDownClick = null;
  #onFavouriteClick = null;

  constructor({pointModel,onRollDownClick, onFavouriteClick}){
    super();
    this.#pointModel = pointModel;
    this.#handleRollDownClick = onRollDownClick;

    this.#onFavouriteClick = onFavouriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click',this.#editRollDownHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click',this.#onFavouriteClickHandler);
  }

  #editRollDownHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollDownClick();
  };

  #onFavouriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onFavouriteClick();
  };

  get template(){
    return createPointItself(this.#pointModel);
  }

}
