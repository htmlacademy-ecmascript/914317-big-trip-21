import { createElement } from '../../render.js';
import { createFilters } from '../../components/view/filter.js';

export default class Filters {

  getTemplate(){
    return createFilters();
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
