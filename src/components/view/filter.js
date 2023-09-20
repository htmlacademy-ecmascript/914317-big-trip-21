function createFilters({type}){
  return `<div class="trip-filters__filter">
                  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}">
                  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
                </div>
               `;
}

export { createFilters };
