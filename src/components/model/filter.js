import AbstractView from '../../framework/view/abstract-view.js';
import { createFilters } from '../../components/view/filter.js';

export default class Filters extends AbstractView{

  get template(){
    return createFilters();
  }

}
