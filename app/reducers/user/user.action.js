export const SET_USER_ID = 'SET_USER_ID';

class UserAction {
    setUserId = userId => dispatch => 
        dispatch({
            type : SET_USER_ID,
            userId
        });
}

export default new UserAction();
