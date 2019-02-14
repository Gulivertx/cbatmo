/**
 * Netatmo reducer
 * NAMain = MAIN module
 * NAModule1 = OUTDOOR module
 * NAModule2 = WIND module
 * NAModule3 = RAIN module
 * NAModule4 = INDOOR module
 */

import moment from 'moment';

import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILURE,
    STATION_DATA_REQUEST,
    STATION_DATA_SUCCESS,
    STATION_DATA_FAILURE,
    STATION_DATA_UPTODATE,
    MEASURE_MAIN_REQUEST,
    MEASURE_MAIN_SUCCESS,
    MEASURE_MAIN_FAILURE,
    MEASURE_OUTDOOR_REQUEST,
    MEASURE_OUTDOOR_SUCCESS,
    MEASURE_OUTDOOR_FAILURE,
    MEASURE_WIND_REQUEST,
    MEASURE_WIND_SUCCESS,
    MEASURE_WIND_FAILURE,
    MEASURE_RAIN_REQUEST,
    MEASURE_RAIN_SUCCESS,
    MEASURE_RAIN_FAILURE,
    MEASURE_INDOOR_REQUEST,
    MEASURE_INDOOR_SUCCESS,
    MEASURE_INDOOR_FAILURE
} from "./actions";

const defaultState = {
    loading_auth: false,
    loading_refresh_token: false,
    auth_errors: undefined,
    access_token: '',
    refresh_token: window.localStorage.getItem('NetatmoRefreshToken') || '',
    access_token_expire_in: 0,

    loading_station_data: true,
    station_data_last_updated: 0,
    station_data_errors: undefined,
    station_data: {},

    // MAIN module history
    loading_main: false,
    measure_main_errors: undefined,
    measure_main_data: [],
    measure_main_labels: [],

    // OUTDOOR module history (namodule1)
    loading_outdoor: false,
    measure_outdoor_errors: undefined,
    measure_outdoor_data: [],
    measure_outdoor_labels: [],

    // WIND module history (namodule2)
    loading_wind: false,
    measure_wind_errors: undefined,
    measure_wind_data: [],
    measure_wind_labels: [],

    // Rain module history (namodule3)
    loading_rain: true,
    measure_rain_errors: undefined,
    measure_rain_data: [],
    measure_rain_labels: [],

    // INDOOR module history (namodule4)
    loading_indoor: true,
    measure_indoor_errors: undefined,
    measure_indoor_data: [],
    measure_indoor_labels: []
};

const reducer = (state = defaultState, action) => {
    let stateValue = {};

    switch (action.type) {
        /** NETATMO AUTH **/
        case AUTH_REQUEST:
            stateValue.loading_auth = true;
            state = Object.assign({}, state, stateValue);
            break;

        case AUTH_SUCCESS:
            stateValue.loading_auth = false;
            stateValue.auth_errors = undefined;
            stateValue.access_token = action.payload.access_token;
            stateValue.refresh_token = action.payload.refresh_token;
            stateValue.access_token_expire_in = moment().unix() + action.payload.expire_in;
            state = Object.assign({}, state, stateValue);
            break;

        case AUTH_FAILURE:
            stateValue.loading_auth = false;
            stateValue.auth_errors = action.error;
            state = Object.assign({}, state, stateValue);
            break;

        /** NETATMO REFRESH TOKEN **/
        case REFRESH_TOKEN_REQUEST:
            stateValue.loading_auth = true;
            state = Object.assign({}, state, stateValue);
            break;

        case REFRESH_TOKEN_SUCCESS:
            stateValue.loading_auth = false;
            stateValue.auth_errors = undefined;
            stateValue.access_token = action.payload.access_token;
            stateValue.refresh_token = action.payload.refresh_token;
            stateValue.access_token_expire_in = moment().unix() + action.payload.expire_in;
            state = Object.assign({}, state, stateValue);
            break;

        case REFRESH_TOKEN_FAILURE:
            stateValue.loading_auth = false;
            stateValue.auth_errors = action.error;
            state = Object.assign({}, state, stateValue);
            break;

        /** NETATMO STATION DATA **/
        case STATION_DATA_REQUEST:
            stateValue.loading_station_data = true;
            state = Object.assign({}, state, stateValue);
            break;

        case STATION_DATA_SUCCESS:
            console.debug(action.payload);
            stateValue.loading_station_data = false;
            stateValue.station_data = action.payload;
            stateValue.station_data_last_updated = action.receivedAt;
            stateValue.station_data_errors = undefined;
            state = Object.assign({}, state, stateValue);
            break;

        case STATION_DATA_FAILURE:
            stateValue.loading_station_data = false;
            stateValue.station_data_errors = action.error;
            state = Object.assign({}, state, stateValue);
            break;

        case STATION_DATA_UPTODATE:
            stateValue.loading_station_data = false;
            state = Object.assign({}, state, stateValue);
            break;

        /** NETATMO MEASURE DATA **/
        case MEASURE_MAIN_REQUEST:
            stateValue.loading_main = true;
            state = Object.assign({}, state, stateValue);
            break;

        case MEASURE_MAIN_SUCCESS:
            stateValue.loading_main = false;
            stateValue.measure_main_data = action.data;
            stateValue.measure_main_labels = action.labels;
            stateValue.measure_main_errors = undefined;
            state = Object.assign({}, state, stateValue);
            break;

        case MEASURE_MAIN_FAILURE:
            stateValue.loading_main = false;
            stateValue.measure_main_errors = action.error;
            state = Object.assign({}, state, stateValue);
            break;


        case MEASURE_OUTDOOR_REQUEST:
            stateValue.loading_outdoor = true;
            state = Object.assign({}, state, stateValue);
            break;

        case MEASURE_OUTDOOR_SUCCESS:
            stateValue.loading_outdoor = false;
            stateValue.measure_outdoor_data = action.data;
            stateValue.measure_outdoor_labels = action.labels;
            stateValue.measure_outdoor_errors = undefined;
            state = Object.assign({}, state, stateValue);
            break;

        case MEASURE_OUTDOOR_FAILURE:
            stateValue.loading_outdoor = false;
            stateValue.measure_outdoor_errors = action.error;
            state = Object.assign({}, state, stateValue);
            break;

        case MEASURE_WIND_REQUEST:
            stateValue.loading_wind = true;
            state = Object.assign({}, state, stateValue);
            break;

        case MEASURE_WIND_SUCCESS:
            stateValue.loading_wind = false;
            stateValue.measure_outdoor_data = action.data;
            stateValue.measure_outdoor_labels = action.labels;
            stateValue.measure_wind_errors = undefined;
            state = Object.assign({}, state, stateValue);
            break;

        case MEASURE_WIND_FAILURE:
            stateValue.loading_wind = false;
            stateValue.measure_wind_errors = action.error;
            state = Object.assign({}, state, stateValue);
            break;

        case MEASURE_RAIN_REQUEST:
            stateValue.loading_rain = true;
            state = Object.assign({}, state, stateValue);
            break;

        case MEASURE_RAIN_SUCCESS:
            stateValue.loading_rain = false;
            stateValue.measure_rain_data = action.data;
            stateValue.measure_rain_labels = action.labels;
            stateValue.measure_rain_errors = undefined;
            state = Object.assign({}, state, stateValue);
            break;

        case MEASURE_RAIN_FAILURE:
            stateValue.loading_rain = false;
            stateValue.measure_rain_errors = action.error;
            state = Object.assign({}, state, stateValue);
            break;

        case MEASURE_INDOOR_REQUEST:
            stateValue.loading_indoor = true;
            state = Object.assign({}, state, stateValue);
            break;

        case MEASURE_INDOOR_SUCCESS:
            stateValue.loading_indoor = false;
            stateValue.measure_indoor_data = action.data;
            stateValue.measure_indoor_labels = action.labels;
            stateValue.measure_indoor_errors = undefined;
            state = Object.assign({}, state, stateValue);
            break;

        case MEASURE_INDOOR_FAILURE:
            stateValue.loading_indoor = false;
            stateValue.measure_indoor_errors = action.error;
            state = Object.assign({}, state, stateValue);
            break;

        default:
            break;
    }

    return state;
};

export {reducer as netatmoReducer}