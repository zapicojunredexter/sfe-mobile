import NavigationReducer from '../modules/navigation.with.redux/navigation.reducer';
import SystemReducer from './system/system.reducer';
import UserReducer from './user/user.reducer';
export const immutableRecords = [];

export const persistedList = ['userStore'];

export default {
  systemStore: SystemReducer.reducer,
  userStore: UserReducer.reducer,
  navigation: NavigationReducer.reducer,
//   memos: MemosReducer.reducer,
//   filters: FiltersReducer.reducer,
};
