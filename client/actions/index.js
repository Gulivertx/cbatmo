export * from './darksky';
export * from './netatmo';

/** First application SETTINGS actions **/
export const APP_SETTINGS_STEP = 'APP_SETTINGS_STEP';

export const changeAppSettingsStep = step => {
    return {
        type: APP_SETTINGS_STEP,
        value: step
    }
};

export const CHANGE_APP_IS_CONFIGURED = 'CHANGE_APP_IS_CONFIGURED';

export const changeAppIsConfigured = bool => {
    return {
        type: CHANGE_APP_IS_CONFIGURED,
        value: bool
    }
};

export const CHANGE_HOMESCRREN_OPEN = 'CHANGE_HOMESCREEN_OPEN';

export const changeHomescreenOpen = bool => {
    return {
        type: CHANGE_HOMESCRREN_OPEN,
        value: bool
    }
};

/** REQUEST APP INFO **/
export const APP_INFO_REQUEST = 'APP_INFO_REQUEST';
export const APP_INFO_SUCCESS = 'APP_INFO_SUCCESS';
export const APP_INFO_FAILURE = 'APP_INFO_FAILURE';

export const requestAppInfo = () => {
    return {
        type: APP_INFO_REQUEST
    }
};

export const successAppInfo = (json) => {
    return {
        type: APP_INFO_SUCCESS,
        data: json,
        receivedAt: Date.now()
    }
};

export const failureAppInfo = (error) => {
    return {
        type: APP_INFO_FAILURE,
        data: error
    }
};

export const fetchAppInfo = () => {
    return (dispatch, getState) => {
        dispatch(requestAppInfo());

        return fetch('/info')
            .then(
                response => response.json(),
                error => dispatch(failureAppInfo(error))
            )
            .then(
                json => {
                    dispatch(successAppInfo(json))
                }
            )
    }
};

