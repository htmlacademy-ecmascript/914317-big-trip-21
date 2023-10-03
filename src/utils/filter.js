import {FilterType} from '../../src/const.js';
import { isDatePast, isDateFuture, isDatePresent} from '../../src/utils/util.js';

const filter = {
  [FilterType.Everything]: (routePoints) => (routePoints),
  [FilterType.Future]: (routePoints) => routePoints.filter((point) => isDateFuture(point.startTime)),
  [FilterType.Present]: (routePoints) => routePoints.filter((point) => isDatePresent(point.startTime)),
  [FilterType.Past]:(routePoints) => routePoints.filter((point) => isDatePast(point.startTime))
};

export {filter};
