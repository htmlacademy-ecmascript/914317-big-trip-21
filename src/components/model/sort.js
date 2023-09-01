import { createElement } from '../../render.js';
import { createSort } from '../../components/view/sort.js';

export default class Sort {

  getTemplate() {
    return createSort();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
