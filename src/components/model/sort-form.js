import AbstractView from '../../framework/view/abstract-view.js';
import {createSortForm} from '../../components/view/sort-form.js';

export default class SortForm extends AbstractView {

  get template(){
    return createSortForm();
  }
}
