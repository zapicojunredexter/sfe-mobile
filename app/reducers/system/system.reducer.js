import System from './system.record';
import {
    SET_TIMESTAMP_OFFSET,
    SET_HAS_INTERNET,
    SET_CURRENT_LOCATION,
    SET_API
} from './system.action';

class SystemReducer {
    reducer = (state = System, action ) => {
        switch (action.type) {
            case SET_TIMESTAMP_OFFSET: {
                return {...state, timestampOffset : action.timestampOffset};
            }
            case SET_HAS_INTERNET: {
                return {...state, hasInternet : action.hasInternet};
            }
            case SET_CURRENT_LOCATION: {
                return {...state, currentLocation : action.location};
            }
            case SET_API: {
                return {...state, api : action.api};
            }
            default: {
                return state;
            }
        }
    };
}

export default new SystemReducer();
