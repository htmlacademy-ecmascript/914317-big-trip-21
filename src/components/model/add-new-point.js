import { createElement } from '../../render.js';
import { addNewPoint } from '../../components/view/add-new-point.js';

export default class AddNewPoint {

  getTemplate(){
    return addNewPoint();
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
