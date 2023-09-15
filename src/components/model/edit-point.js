import AbstractView from '../../framework/view/abstract-view.js';
import { editPoint } from '../../components/view/edit-point.js';


export default class EditPoint extends AbstractView {

  #handlerRollUpClick = null;

  constructor({ onRollUpClick }) {
    super();
    this.#handlerRollUpClick = onRollUpClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editRollUpHandler);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#editRollUpHandler);

  }

  #editRollUpHandler = (evt) =>{
    evt.preventDefault();
    this.#handlerRollUpClick();
  };

  get template() {
    return editPoint();
  }

}
