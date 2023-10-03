import AddNewPoint from '../src/components/model/add-new-point.js';
import { remove, render, RenderPosition } from '../src/framework/render.js';
// import {nanoid} from 'nanoid';


export default class AddPointPresenter {
  #container = null;
  #onDataChange = null;
  #onNewEventClose = null;
  #newEventComponent = null;

  constructor({container, onDataChange, onNewEventClose}) {
    this.#container = container;
    this.#onDataChange = onDataChange;
    this.#onNewEventClose = onNewEventClose;
  }

  init() {
    if (this.#newEventComponent !== null) {
      return;
    }

    this.#newEventComponent = new AddNewPoint();
    render(this.#newEventComponent, this.#container.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);

  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  // #handleFormSubmit = (task) => {
  //   this.#handleDataChange(
  //     UserAction.ADD_TASK,
  //     UpdateType.MINOR,
  //     {id: nanoid(), ...task},
  //   );
  //   this.destroy();
  // };

  // #handleDeleteClick = () => {
  //   this.destroy();
  // };

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
