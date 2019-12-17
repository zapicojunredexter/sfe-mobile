export const SET_STORE = 'SET_STORE';
export const ADD_CART_ITEM = 'ADD_CART_ITEM';

export const CLEAR_CART = 'CLEAR_CART';

export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';

export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';

class UserAction {
    setStore = store => dispatch => 
        dispatch({
            type : SET_STORE,
            store
        });
    addCartItem = item => dispatch => 
        dispatch({
            type : ADD_CART_ITEM,
            item: {
                ...item,
                orderQty: 1,
            }
        });
    removeCartItem = itemId => dispatch => 
        dispatch({
            type : REMOVE_CART_ITEM,
            itemId
        });
    clearCart = () => dispatch =>
        dispatch({
            type: CLEAR_CART
        })
    updateCartItem = (id, payload) => dispatch =>
        dispatch({
            type: UPDATE_CART_ITEM,
            id,
            payload
        })
}

export default new UserAction();
