import AbstractView from '../../framework/view/abstract-view.js';
import { addNewPoint } from '../../components/view/add-new-point.js';

export default class AddNewPoint extends AbstractView{

  get template(){
    return addNewPoint();
  }

}
