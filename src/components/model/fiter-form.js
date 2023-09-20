import AbstractView from '../../framework/view/abstract-view.js';
import {createFilterForm} from '../../components/view/filter-form.js';

export default class FilterForm extends AbstractView {
  get template(){
    return createFilterForm();
  }
}
