import {filter} from '../../src/utils/filter.js';

function generateFilter(routePoints){
  return Object.entries(filter).map(
    ([filterType,filterForPoints])=>({
      type: filterType,
      points: routePoints.filter(filterForPoints)
    })
  );
}

export {generateFilter};
