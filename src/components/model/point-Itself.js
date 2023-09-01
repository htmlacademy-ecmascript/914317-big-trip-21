import { createElement } from '../../render.js';
import { createPointItself } from '../../components/view/point-itself.js';

export default class PointItself {

  constructor(pointModel){
    this.pointModel = pointModel;
  }

  getTemplate(){
    return createPointItself(this.pointModel);
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
