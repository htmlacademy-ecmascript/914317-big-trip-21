import AddNewPoint from '../components/model/add-new-point.js';
import { remove, render, RenderPosition } from '../framework/render.js';

export default class AddPointPresenter {
  #container = null;
  #onDataChange = null;
  #onNewEventClose = null;
  #newEventComponent = null;
  #routePointModel = null;

  constructor({routePointModel, container, onDataChange, onNewEventClose}) {
    this.#routePointModel = routePointModel;
    this.#container = container;
    this.#onDataChange = onDataChange;
    this.#onNewEventClose = onNewEventClose;
  }

  init() {
    if (this.#newEventComponent !== null) {
      return;
    }

    this.#newEventComponent = new AddNewPoint(
      {
        pointModel: this.#routePointModel
      }
    );
    render(this.#newEventComponent, this.#container.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);

  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  destroy(){
    if(this.#newEventComponent === null){
      return;
    }

    this.#onNewEventClose();
    remove(this.#newEventComponent);
    this.#newEventComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }
}
