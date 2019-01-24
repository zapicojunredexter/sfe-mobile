import { createSelector } from 'reselect';

const filterList = store => store.filters;

export const getFilterList = createSelector(
  [filterList],
  filters => filters && filters.toJS(),
);
