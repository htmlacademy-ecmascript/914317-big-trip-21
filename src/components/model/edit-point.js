import { createElement } from '../../render.js';
import { editPoint } from '../../components/view/edit-point.js';


export default class EditPoint {

  getTemplate(){
    return editPoint();
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
