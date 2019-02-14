/** Application actions **/
export const SETTINGS_STEP = '@@application/APP_SETTINGS_STEP';

export const settingsStep = step => {
    return {
        type: SETTINGS_STEP,
        value: step
    }
};

export const APP_CONFIGURED = '@@application/APP_CONFIGURED';

export const appConfigured = bool => {
    return {
        type: APP_CONFIGURED,
        value: bool
    }
};

export const HOMESCRREN_OPEN = '@@application/HOMESCRREN_OPEN';

export const homescreenOpen = bool => {
    return {
        type: HOMESCRREN_OPEN,
        value: bool
    }
};

/** REQUEST APP INFO **/
export const INFO_REQUEST = '@@application/INFO_REQUEST';
export const INFO_SUCCESS = '@@application/INFO_SUCCESS';
export const INFO_FAILURE = '@@application/INFO_FAILURE';

export const requestInfo = () => {
    return {
        type: INFO_REQUEST
    }
};

export const successInfo = (json) => {
    return {
        type: INFO_SUCCESS,
        data: json,
        receivedAt: Date.now()
    }
};

export const failureInfo = (error) => {
    return {
        type: INFO_FAILURE,
        data: error
    }
};

export const fetchInfo = () => {
    return (dispatch) => {
        dispatch(requestInfo());

        return fetch('/info')
            .then(response => {
                if (!response.ok) throw response;
                return response.json()
            })
            .then(json => {
                dispatch(successInfo(json))
            })
            .catch(error => {
                error.json().then(errorMessage => {
                    dispatch(failureInfo(errorMessage))
                })
            });
    }
};

export const USER_INFO = '@@application/USER_INFO';

export const setUserInfo = (user) => {
    return {
        type: USER_INFO,
        payload: user
    }
};
