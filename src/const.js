const FilterType = {
  Everything : 'everything',
  Future : 'future',
  Present : 'present',
  Past : 'past'
};

const SortType = {
  DAY : 'day',
  TIME : 'time',
  PRICE : 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export {FilterType, SortType, UserAction, UpdateType};
