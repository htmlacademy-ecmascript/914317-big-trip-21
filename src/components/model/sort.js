import AbstractView from '../../framework/view/abstract-view.js';
import { createSort } from '../../components/view/sort.js';

export default class Sort extends AbstractView {

  get template() {
    return createSort();
  }
}
