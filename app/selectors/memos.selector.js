import { createSelector } from 'reselect';

const memoList = store => store.memos;
const filters = store => store.filters;

export const getMemoList = createSelector(
  [memoList],
  memo => memo && memo.toJS(),
);

const createArrayFromObject = (object: Object) => {
  const keys = Object.keys(object);

  return keys.map((key: string) => {
    const element = { [key]: object[key] };

    return element;
  });
};

export const getFilteredMemos = createSelector(
  [memoList, filters],
  (memos: Object, filterList: Object) => {
    const mutableFilters = filterList.toJS();
    const selectedFilters = createArrayFromObject(mutableFilters).filter(
      filter => Object.values(filter)[0],
    );

    if (selectedFilters.length === 0) {
      return memos.toJS();
    }
    const taggedMemos = memos.filter((memo: Object) => {
      let isTagged = true;

      selectedFilters.forEach((filter: Object) => {
        if (!memo.tags[Object.keys(filter)[0]]) {
          isTagged = false;
        }
      });

      return isTagged;
    });

    return taggedMemos.toJS();
  },
);
