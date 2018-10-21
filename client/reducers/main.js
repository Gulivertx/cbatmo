import {
    APP_SETTINGS_STEP,
    CHANGE_APP_IS_CONFIGURED,
    CHANGE_HOMESCRREN_OPEN,
    APP_INFO_REQUEST,
    APP_INFO_SUCCESS,
    APP_INFO_FAILURE
} from "../actions";

const defaultState = {
    isAppConfigured: !!window.localStorage.getItem('appIsConfigured'),
    isNetatmoAuth: !!window.localStorage.getItem('NetatmoAccessToken'),
    isSwissWeatherAuth: !!window.localStorage.getItem('SwissWeatherCity'),
    isLoading: true,
    appSettingsStep: 1,
    homeScreenOpen: false,
    appInfo: {
        name: '',
        description: '',
        version: '',
        author: '',
    },
    isFetchingAppInfo: false
};

const main = (state = defaultState, action) => {
    let stateValue = {};

    switch (action.type) {
        case APP_SETTINGS_STEP:
            stateValue.appSettingsStep = action.value;
            state = Object.assign({}, state, stateValue);
            break;

        case CHANGE_APP_IS_CONFIGURED:
            stateValue.isAppConfigured = action.value;
            state = Object.assign({}, state, stateValue);
            break;

        case CHANGE_HOMESCRREN_OPEN:
            stateValue.homeScreenOpen = action.value;
            state = Object.assign({}, state, stateValue);
            break;

        /** CBSCREEN APP SERVER INFO **/
        case APP_INFO_REQUEST:
            stateValue.isFetchingAppInfo = true;
            state = Object.assign({}, state, stateValue);
            break;

        case APP_INFO_SUCCESS:
            console.log(action.data)
            stateValue.isFetchingAppInfo = false;
            stateValue.appInfo = action.data;
            state = Object.assign({}, state, stateValue);
            break;

        case APP_INFO_FAILURE:
            stateValue.isFetchingAppInfo = false;
            state = Object.assign({}, state, stateValue);
            break;

        default:
            break;
    }

    return state;
};

export default main