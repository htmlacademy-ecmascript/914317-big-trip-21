import { render } from '../src/render.js';
import Filters from '../src/view/view-filter.js';
import Sort from '../src/view/view-sort.js';
import AddNewPoint from '../src/view/view-add-new-point.js';
import EditPoint from '../src/view/view-edit-point.js';
import PointItself from '../src/view/view-point.js';


const controlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

export default class PagePresenter {

  //отрисовал все компоненты по одному разу, кроме точек маршрута
  //не совсем понял - правильно или нет. но, если мыслю верно - сейчас надо просто отобразить - неважно как.
  //потому что согласно ТЗ - одновременно может быть открыта только одна форма создания/редактирования (п. 1.5)
  init() {
    render(new Filters(), controlsFilters);
    render(new Sort(), tripEvents);
    render(new EditPoint(), tripEvents);
    render(new AddNewPoint(), tripEvents);

    for (let i = 0; i < 3; i++){
      render(new PointItself(), tripEvents);
    }

  }

}
