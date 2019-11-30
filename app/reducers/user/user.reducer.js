import {
    SET_USER_ID
} from './user.action';

const initialState = {
    userId: null,
};

class UserReducer {
    reducer = (state = initialState, action ) => {
        switch (action.type) {
            case SET_USER_ID: {
                return {...state, userId: action.userId};
            }
            default: {
                return state;
            }
        }
    };
}

export default new UserReducer();
