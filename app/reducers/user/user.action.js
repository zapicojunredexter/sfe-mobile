export const SET_USER = 'SET_USER';

class UserAction {
    setUser = user => dispatch => 
        dispatch({
            type : SET_USER,
            user
        });
}

export default new UserAction();
