import {
    ADD_CART_ITEM,
    CLEAR_CART,
    REMOVE_CART_ITEM,
    SET_STORE,
} from './cart.action';

const initialState = {
    store: null,
    cartItems: {
    },
};

class UserReducer {
    reducer = (state = initialState, action ) => {
        switch (action.type) {
            case SET_STORE: {
                return {
                    ...state,
                    store: action.store
                };
            }
            case ADD_CART_ITEM: {
                return {
                    ...state,
                    cartItems: {
                        ...state.cartItems,
                        [action.item.id]: action.item
                    },
                };
            }
            case REMOVE_CART_ITEM: {
                const cartItemsArray = Object.values(state.cartItems);
                const newCartItems = cartItemsArray.reduce((acc, cur) => {
                    if(cur.id === action.itemId) {
                        return acc;
                    }
                    return {
                        ...acc,
                        [cur.id]: cur,
                    };
                }, {});
                return {
                    ...state,
                    cartItems: newCartItems,
                };
            }
            case CLEAR_CART: {
                return {
                    ...initialState,
                };
            }
            default: {
                return state;
            }
        }
    };
}

export default new UserReducer();
