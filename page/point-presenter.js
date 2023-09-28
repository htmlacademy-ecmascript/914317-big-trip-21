import { render, replace, remove } from '../src/framework/render.js';
import PointItself from '../src/components/model/point-Itself.js';
import EditPoint from '../src/components/model/edit-point.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {

  //модели данных
  #pointModel = null;

  //компоненты
  #ulLstComponentElement = null;
  #pointComponent = null;
  #pointEditComponent = null;

  //события
  #onDataChange = null;
  #onModeChange = null;

  //служебное
  #mode = Mode.DEFAULT;

  constructor({ ulLstComponentElement, onDataChange, onModeChange }) {
    this.#ulLstComponentElement = ulLstComponentElement;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  /** обработчик события 'клик' для поля "Избранное" */
  #onFavouriteClickHandle = () => {
    this.#onDataChange({ ...this.#pointModel, isFavourite: !this.#pointModel.isFavourite });
  };

  /** закрыть все открытые для редактирования точки */
  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#pointModel);
      this.#replaceEditToPoint();
    }
  }

  /**отрисовка точки маршрута*/
  renderPoint(point) {

    this.#pointModel = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#pointEditComponent;

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this.#pointEditComponent.reset(this.#pointModel);
        this.#replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    this.#pointComponent = new PointItself({
      pointModel: this.#pointModel,
      onRollDownClick: () => {
        this.#replacePointToEdit();
        document.addEventListener('keydown', escKeyDownHandler);
      },
      onFavouriteClick: this.#onFavouriteClickHandle
    });

    this.#pointEditComponent = new EditPoint({
      pointModel: this.#pointModel,
      onRollUpClick: () => {
        this.#replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormSubmit: this.#handleFormSubmit
    });

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#ulLstComponentElement);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);

  }

  #handleFormSubmit = (point) =>{
    this.#onDataChange(point);
    this.#replaceEditToPoint();
  };

  /**смена точки маршрута на форму редактирования*/
  #replacePointToEdit() {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#onModeChange();
    this.#mode = Mode.EDITING;
  }

  /**смена формы редактирования на точку маршрута*/
  #replaceEditToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  /**удаление компонента точки маршрута и связанной с ним точки редактирования*/
  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

}
