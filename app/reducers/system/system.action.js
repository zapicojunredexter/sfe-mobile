export const SET_TIMESTAMP_OFFSET = 'SET_TIMESTAMP_OFFSET';

export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION';

export const SET_HAS_INTERNET = 'SET_HAS_INTERNET';

export const SET_API = 'SET_API';

class SystemAction {
    setTimestampOffset = timestampOffset => dispatch =>
        dispatch({
            type: SET_TIMESTAMP_OFFSET,
            timestampOffset,
        });

    setCurrentLocation = location => dispatch => 
        dispatch({
            type : SET_CURRENT_LOCATION,
            location,
        });

    setAPI = api => dispatch => 
        dispatch({
            type : SET_API,
            api,
        });

    setHasInternet = hasInternet => dispatch => 
        dispatch({
            type : SET_HAS_INTERNET,
            hasInternet
        });

}

export default new SystemAction();
