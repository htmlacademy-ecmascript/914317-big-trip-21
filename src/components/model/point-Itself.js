import AbstractView from '../../framework/view/abstract-view.js';
import { createPointItself } from '../../components/view/point-itself.js';

export default class PointItself extends AbstractView {

  #pointModel = null;
  #handleRollDownClick = null;

  constructor({pointModel,onRollDownClick}){
    super();
    this.#pointModel = pointModel;
    this.#handleRollDownClick = onRollDownClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click',this.#editRollDownHandler);
  }

  #editRollDownHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollDownClick();
  };

  get template(){
    return createPointItself(this.#pointModel);
  }

}
