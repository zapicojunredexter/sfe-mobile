import {
    SET_USER
} from './user.action';

const initialState = {
    user: null,
};

class UserReducer {
    reducer = (state = initialState, action ) => {
        switch (action.type) {
            case SET_USER: {
                return {...state, user: action.user};
            }
            default: {
                return state;
            }
        }
    };
}

export default new UserReducer();
