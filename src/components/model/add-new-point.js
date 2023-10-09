import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { addNewPoint } from '../../components/view/add-new-point.js';

const emptyPoint = {
  'base_price': 0,
  'date_from': '',
  'date_to': '',
  'destination': '',
  'is_favorite': false,
  'offers': [],
  'type': ''
};
export default class AddNewPoint extends AbstractStatefulView {

  #pointModel = null;

  constructor({ pointModel }) {
    super();
    this.#pointModel = pointModel;
    this._setState(emptyPoint);
  }

  get template() {
    return addNewPoint(this.#pointModel.destinations, this.#pointModel.offers);
  }

}
