import AbstractView from '../../framework/view/abstract-view.js';
import { createNewEventBtn } from '../../components/view/new-event-btn-view';

export default class newEventBtn extends AbstractView {

  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

  get template() {
    return createNewEventBtn();
  }
}
