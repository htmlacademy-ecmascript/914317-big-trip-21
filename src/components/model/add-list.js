import AbstractView from '../../framework/view/abstract-view.js';
import { createList } from '../../components/view/add-list.js';

export default class UList extends AbstractView {

  get template() {
    return createList();
  }
}
