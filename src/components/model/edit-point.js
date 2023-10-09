import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { editPoint } from '../../components/view/edit-point.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

export default class EditPoint extends AbstractStatefulView {

  #pointModel = null;
  #handleRollUpClick = null;
  #handleFormSubmit = null;
  #handleFormDelete = null;
  #datepickerStart = null;
  #datepickerEnd = null;
  #dataList = new Map();

  constructor({ pointModel, onRollUpClick, onFormSubmit, onFormDelete }) {
    super();
    this.#handleRollUpClick = onRollUpClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormDelete = onFormDelete;

    this._setState(EditPoint.parsePointToState(pointModel));

    this.element.querySelector('.event__input--price').addEventListener('input', this.#handleInput);

    this._restoreHandlers();

  }

  #handleInput = (evt) => {
    evt.preventDefault();
    evt.target.value = evt.target.value.replace(/[^0-9, ]/g, '');
  };

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
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteHandler);


    //внутренние обработчики событий
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#editInputDestination);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#editInputPrice);

    const typeItemsElements = this.element.querySelectorAll('.event__type-item');
    typeItemsElements.forEach((typeItemElement) => typeItemElement.addEventListener('click', this.#eventTypeItemClick));

    const datalistItemsElements = this.element.querySelectorAll('.datalistItem');
    datalistItemsElements.forEach((typeItemElement) => this.#dataList.set(typeItemElement.value, typeItemElement.dataset.id));

    const offers = this.element.querySelectorAll('.event__offer-selector');
    offers.forEach((item) => item.addEventListener('click', this.#offerSelectorClick));

    this.element.querySelector('.event__input--destination').addEventListener('change', this.#datalistItemClick);

    this.#setDatepicker();

  }

  #offerSelectorClick = (evt) => {
    evt.preventDefault();
    evt.currentTarget.firstElementChild.checked = !evt.currentTarget.firstElementChild.checked;
  };

  #eventTypeItemClick = (evt) => {
    evt.preventDefault();
    this.updateElement({
      eventType: this.element.querySelector(`[id="${evt.target.htmlFor}"]`).value,
    });
  };


  #datalistItemClick = (evt) => {
    if (evt.currentTarget.value !== '') {
      evt.preventDefault();
      this.updateElement({
        destination: this.#dataList.get(evt.currentTarget.value),
      });
    }
  };


  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    const offerCheckbox = this.element.querySelectorAll('.event__offer-checkbox');

    const neededOffers = [];
    offerCheckbox.forEach((item) => {
      if (item.checked){
        neededOffers.push(item.dataset.id);
      }
    });

    this.updateElement({
      offers: neededOffers,
    });

    this.#handleFormSubmit(EditPoint.parseStateToPoint(this._state));
  };


  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormDelete(EditPoint.parseStateToPoint(this._state));
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

    if (pointModel.destination !== stateModel.newDestination && stateModel.newDestination !== '') {
      pointModel.destination = stateModel.newDestination;
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
      newDestination: this.#dataList.get(evt.currentTarget.value),
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
