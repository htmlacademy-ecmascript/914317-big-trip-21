import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { editPoint } from '../../components/view/edit-point.js';


export default class EditPoint extends AbstractStatefulView {

  #pointModel = null;
  #handleRollUpClick = null;
  #handleFormSubmit = null;

  constructor({pointModel, onRollUpClick, onFormSubmit }) {
    super();
    this.#handleRollUpClick = onRollUpClick;
    this.#handleFormSubmit = onFormSubmit;

    this._setState(EditPoint.parsePointToState(pointModel));

    this._restoreHandlers();

  }

  _restoreHandlers(){
    //обработчики событий снаружи
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editRollUpHandler);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#formSubmitHandler);


    //внутренние обработчики событий
    this.element.querySelector('.event__input--destination').addEventListener('input',this.#editInputDestination);
    this.element.querySelector('.event__input--price').addEventListener('input',this.#editInputPrice);

    const typeItemsElements = this.element.querySelectorAll('.event__type-item');
    typeItemsElements.forEach((typeItemElement) => typeItemElement.addEventListener('click', this.#eventTypeItemClick));

  }

  #eventTypeItemClick = (evt) => {
    evt.preventDefault();
    this.updateElement({
      eventType: this.element.querySelector(`[id="${evt.target.htmlFor}"]`).value,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPoint.parseStateToPoint(this._state));
  };

  static parsePointToState(pointModel){
    return {...pointModel,
      newDestination: '',
      newPrice: 0,
      newEventType: '',
    };
  }

  static parseStateToPoint(stateModel){
    const pointModel = {...stateModel};

    if (pointModel.destination.name !== stateModel.newDestination && stateModel.newDestination !== ''){
      pointModel.destination.name = stateModel.newDestination;
    }

    if (pointModel.price !== stateModel.newPrice && stateModel.newPrice !== 0){
      pointModel.price = stateModel.newPrice;
    }

    if (pointModel.eventType !== stateModel.newEventType && stateModel.newEventType !== ''){
      pointModel.eventType = stateModel.newEventType;
    }

    delete pointModel.newDestination;
    delete pointModel.newPrice;
    delete pointModel.newEventType;

    return pointModel;
  }

  reset(point){
    this.updateElement(EditPoint.parsePointToState(point));
  }

  #editInputDestination = (evt) =>{
    evt.preventDefault();
    this._setState({
      newDestination: evt.target.value,
    });
  };

  #editInputPrice = (evt) =>{
    evt.preventDefault();
    this._setState({
      newPrice: evt.target.value,
    });
  };

  #editRollUpHandler = (evt) =>{
    evt.preventDefault();
    this.#handleRollUpClick();
  };

  get template() {
    return editPoint(this._state);
  }

}
