import {DARKSKY_REQUEST, DARKSKY_SUCCESS, DARKSKY_FAILURE, SET_DARKSKY_LAT_LNG} from "../actions";

const defaultState = {
    latitude: window.localStorage.getItem('DarkskyLat') || '',
    longitude: window.localStorage.getItem('DarkskyLng') || '',
    isFirstFetch: true,
    isFetching: false,
    data: {},
    lastUpdated: null
};

const darksky = (state = defaultState, action) => {
    let stateValue = {};

    switch (action.type) {
        case DARKSKY_REQUEST:
            stateValue.isFetching = true;
            state = Object.assign({}, state, stateValue);
            break;

        case DARKSKY_SUCCESS:
            stateValue.isFetching = false;
            stateValue.isFirstFetch = false;
            stateValue.data = action.data;
            stateValue.lastUpdated = action.receivedAt;
            state = Object.assign({}, state, stateValue);
            break;

        case DARKSKY_FAILURE:
            stateValue.isFetching = false;
            state = Object.assign({}, state, stateValue);
            break;

        case SET_DARKSKY_LAT_LNG:
            stateValue.latitude = action.lat;
            stateValue.longitude = action.lng;
            state = Object.assign({}, state, stateValue);
            break;

        default:
            break;
    }

    return state;
};

export default darksky