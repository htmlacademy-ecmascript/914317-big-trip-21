import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { editPoint } from '../../components/view/edit-point.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

export default class EditPoint extends AbstractStatefulView {

  #pointModel = null;
  #handleRollUpClick = null;
  #handleFormSubmit = null;
  #datepickerStart = null;
  #datepickerEnd = null;

  constructor({ pointModel, onRollUpClick, onFormSubmit }) {
    super();
    this.#handleRollUpClick = onRollUpClick;
    this.#handleFormSubmit = onFormSubmit;

    this._setState(EditPoint.parsePointToState(pointModel));

    this._restoreHandlers();

  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  #startDateChangeHandler = ([userDate]) => {
    this.updateElement({
      startTime: userDate,
    });
  };

  #endDateChangeHandler = ([userDate]) => {
    this.updateElement({
      endTime: userDate,
    });
  };

  #setDatepicker() {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('input[id="event-start-time-1"]'),
      {
        dateFormat: 'Y-m-d H:I',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.startTime,
        onChange: this.#startDateChangeHandler,
      },
    );

    this.#datepickerStart = flatpickr(
      this.element.querySelector('input[id="event-end-time-1"]'),
      {
        dateFormat: 'Y-m-d H:I',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.endTime,
        onChange: this.#endDateChangeHandler,
      },
    );
  }

  _restoreHandlers() {
    //обработчики событий снаружи
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editRollUpHandler);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#formSubmitHandler);


    //внутренние обработчики событий
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#editInputDestination);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#editInputPrice);

    const typeItemsElements = this.element.querySelectorAll('.event__type-item');
    typeItemsElements.forEach((typeItemElement) => typeItemElement.addEventListener('click', this.#eventTypeItemClick));

    this.#setDatepicker();

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

  static parsePointToState(pointModel) {
    return {
      ...pointModel,
      newDestination: '',
      newPrice: 0,
      newEventType: '',
    };
  }

  static parseStateToPoint(stateModel) {
    const pointModel = { ...stateModel };

    if (pointModel.destination.name !== stateModel.newDestination && stateModel.newDestination !== '') {
      pointModel.destination.name = stateModel.newDestination;
    }

    if (pointModel.price !== stateModel.newPrice && stateModel.newPrice !== 0) {
      pointModel.price = stateModel.newPrice;
    }

    if (pointModel.eventType !== stateModel.newEventType && stateModel.newEventType !== '') {
      pointModel.eventType = stateModel.newEventType;
    }

    delete pointModel.newDestination;
    delete pointModel.newPrice;
    delete pointModel.newEventType;

    return pointModel;
  }

  reset(point) {
    this.updateElement(EditPoint.parsePointToState(point));
  }

  #editInputDestination = (evt) => {
    evt.preventDefault();
    this._setState({
      newDestination: evt.target.value,
    });
  };

  #editInputPrice = (evt) => {
    evt.preventDefault();
    this._setState({
      newPrice: evt.target.value,
    });
  };

  #editRollUpHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollUpClick();
  };

  get template() {
    return editPoint(this._state);
  }

}
