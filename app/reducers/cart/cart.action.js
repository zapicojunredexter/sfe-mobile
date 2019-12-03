export const ADD_CART_ITEM = 'ADD_CART_ITEM';

export const CLEAR_CART = 'CLEAR_CART';

export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';

class UserAction {
    addCartItem = item => dispatch => 
        dispatch({
            type : ADD_CART_ITEM,
            item
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
}

export default new UserAction();
