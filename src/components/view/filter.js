function createFilterTemplate({type}) {
  return `<div class="trip-filters__filter">
            <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}">
           <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
          </div>
          `;
}

function createFilters(filtredModel){

  const filtersTemplate = filtredModel.map((filter) => createFilterTemplate(filter)).join('');

  return `<form class="trip-filters" action="#" method="get">
               <button class="visually-hidden" type="submit">Accept filter</button>
                 ${filtersTemplate}
               </form>`;
}

export { createFilters };
