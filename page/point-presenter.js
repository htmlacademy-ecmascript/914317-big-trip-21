import { render, replace, remove } from '../src/framework/render.js';
import PointItself from '../src/components/model/point-Itself.js';
import EditPoint from '../src/components/model/edit-point.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {

  #ulLstComponentElement = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #onDataChange = null;
  #onModeChange = null;
  #mode = Mode.DEFAULT;

  #point = null;

  constructor({ulLstComponentElement,onDataChange, onModeChange}) {
    this.#ulLstComponentElement = ulLstComponentElement;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  #onFavouriteClickHandle = () => {
    this.#onDataChange({...this.#point, isFavourite: !this.#point.isFavourite});
  };


  resetView(){
    if (this.#mode !== Mode.DEFAULT){
      this.#replaceEditToPoint();
    }
  }

  /*отрисовка точки маршрута
  */
  renderPoint(point) {

    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#pointEditComponent;

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this.#replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    this.#pointComponent = new PointItself({
      pointModel: this.#point,
      onRollDownClick: () => {
        this.#replacePointToEdit();
        document.addEventListener('keydown', escKeyDownHandler);
      },
      onFavouriteClick: this.#onFavouriteClickHandle
    });

    this.#pointEditComponent = new EditPoint({
      onRollUpClick: () => {
        this.#replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    if (prevPointComponent === null || prevEditPointComponent === null){
      render(this.#pointComponent, this.#ulLstComponentElement);
      return;
    }

    if (this.#mode === Mode.DEFAULT){
      replace(this.#pointComponent,prevPointComponent);
    }

    if (this.#mode === Mode.EDITING){
      replace(this.#pointEditComponent,prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);

  }

  #replacePointToEdit() {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#onModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  destroy(){
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

}
