import {
    APP_CONFIGURED,
    HOMESCRREN_OPEN,
    INFO_REQUEST,
    INFO_SUCCESS,
    INFO_FAILURE,
    SETTINGS_STEP,
    LOCALE
} from "./actions";

const defaultState = {
    isConfigured: !!window.localStorage.getItem('appIsConfigured'),
    isHomeScreenOpen: false,
    info: {
        name: '',
        description: '',
        version: '',
        author: '',
    },
    loading: false,
    locale: 'en',
    settingsStep: 1
};

const reducer = (state = defaultState, action) => {
    let stateValue = {};

    switch (action.type) {
        case SETTINGS_STEP:
            stateValue.settingsStep = action.value;
            state = Object.assign({}, state, stateValue);
            break;

        case APP_CONFIGURED:
            stateValue.isConfigured = action.value;
            state = Object.assign({}, state, stateValue);
            break;

        case HOMESCRREN_OPEN:
            stateValue.isHomeScreenOpen = action.value;
            state = Object.assign({}, state, stateValue);
            break;

        /** CBSCREEN APP SERVER INFO **/
        case INFO_REQUEST:
            stateValue.loading = true;
            state = Object.assign({}, state, stateValue);
            break;

        case INFO_SUCCESS:
            stateValue.loading = false;
            stateValue.info = action.data;
            state = Object.assign({}, state, stateValue);
            break;

        case INFO_FAILURE:
            stateValue.loading = false;
            state = Object.assign({}, state, stateValue);
            break;

        /** SET locale from Netatmo API **/
        case LOCALE:
            stateValue.locale = action.payload.includes('fr') ? 'fr' : 'en';
            state = Object.assign({}, state, stateValue);
            break;

        default:
            break;
    }

    return state;
};

export {reducer as applicationReducer}