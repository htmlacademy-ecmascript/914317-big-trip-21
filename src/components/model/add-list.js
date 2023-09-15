import AbstractView from '../../framework/view/abstract-view';
import { createList } from '../../components/view/add-list.js';

export default class UList extends AbstractView {

  get template() {
    return createList();
  }
}
