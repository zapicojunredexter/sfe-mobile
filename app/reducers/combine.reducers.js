import NavigationReducer from '../modules/navigation.with.redux/navigation.reducer';
import SystemReducer from './system/system.reducer';
import UserReducer from './user/user.reducer';
import CartReducer from './cart/cart.reducer';
export const immutableRecords = [];

export const persistedList = ['userStore'];

export default {
  systemStore: SystemReducer.reducer,
  userStore: UserReducer.reducer,
  cartStore: CartReducer.reducer,
  navigation: NavigationReducer.reducer,
//   memos: MemosReducer.reducer,
//   filters: FiltersReducer.reducer,
};
