import {FilterType} from '../../src/const.js';
import { isDatePast, isDateFuture, isDatePresent} from '../../src/utils/util.js';

const filter = {
  [FilterType.Everything]: (routePoints) => (routePoints),
  [FilterType.Future]: (routePoint) => isDateFuture(routePoint.startTime),
  [FilterType.Present]: (routePoint) => isDatePresent(routePoint.startTime),
  [FilterType.Past]:(routePoint) => isDatePast(routePoint.startTime)
};

export {filter};
