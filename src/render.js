const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
}

function render(component, container, place = '') {
  if (place === ''){
    place = RenderPosition.BEFOREEND;
  } else {
    place = RenderPosition[place];
  }
  container.insertAdjacentElement(place, component.getElement());
}

export {RenderPosition, createElement, render};
