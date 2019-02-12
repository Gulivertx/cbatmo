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
    NETATMO_MEASURE_NAMAIN_REQUEST,
    NETATMO_MEASURE_NAMAIN_SUCCESS,
    NETATMO_MEASURE_NAMAIN_FAILURE,
    NETATMO_MEASURE_NAMODULE1_REQUEST,
    NETATMO_MEASURE_NAMODULE1_SUCCESS,
    NETATMO_MEASURE_NAMODULE1_FAILURE,
    NETATMO_MEASURE_NAMODULE2_REQUEST,
    NETATMO_MEASURE_NAMODULE2_SUCCESS,
    NETATMO_MEASURE_NAMODULE2_FAILURE,
    NETATMO_MEASURE_NAMODULE3_REQUEST,
    NETATMO_MEASURE_NAMODULE3_SUCCESS,
    NETATMO_MEASURE_NAMODULE3_FAILURE,
    NETATMO_MEASURE_NAMODULE4_REQUEST,
    NETATMO_MEASURE_NAMODULE4_SUCCESS,
    NETATMO_MEASURE_NAMODULE4_FAILURE
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

    main_module: {},
    outdoor_module: {},
    wind_module: {},
    rain_module: {},
    indoor_module: {},

    loading_main: false,
    measureDataNAMain: [],
    measureLabelsNAMain: [],
    isFirstFetchNAModule1: true,
    isFetchingNAModule1: false,
    measureDataNAModule1: [],
    measurelabelsNAModule1: [],
    isFirstFetchNAModule2: true,
    isFetchingNAModule2: false,
    measureDataNAModule2: [],
    measurelabelsNAModule2: [],
    isFirstFetchNAModule3: true,
    isFetchingNAModule3: false,
    measureDataNAModule3: [],
    measurelabelsNAModule3: [],
    isFirstFetchNAModule4: true,
    isFetchingNAModule4: false,
    measureDataNAModule4: [],
    measurelabelsNAModule4: []
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
            console.log(action.payload)
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
        case NETATMO_MEASURE_NAMAIN_REQUEST:
            stateValue.isFetchingNAMain = true;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_MEASURE_NAMAIN_SUCCESS:
            stateValue.isFirstFetchNAMain = false;
            stateValue.isFetchingNAMain = false;
            stateValue.measureDataNAMain = action.data;
            stateValue.measureLabelsNAMain = action.labels;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_MEASURE_NAMAIN_FAILURE:
            stateValue.isFetchingNAMain = false;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_MEASURE_NAMODULE1_REQUEST:
            stateValue.isFetchingNAModule1 = true;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_MEASURE_NAMODULE1_SUCCESS:
            stateValue.isFirstFetchNAModule1 = false;
            stateValue.isFetchingNAModule1 = false;
            stateValue.measureDataNAModule1 = action.data;
            stateValue.measurelabelsNAModule1 = action.labels;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_MEASURE_NAMODULE1_FAILURE:
            stateValue.isFetchingNAModule1 = false;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_MEASURE_NAMODULE2_REQUEST:
            stateValue.isFetchingNAModule2 = true;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_MEASURE_NAMODULE2_SUCCESS:
            stateValue.isFirstFetchNAModule2 = false;
            stateValue.isFetchingNAModule2 = false;
            stateValue.measureDataNAModule2 = action.data;
            stateValue.measurelabelsNAModule2 = action.labels;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_MEASURE_NAMODULE2_FAILURE:
            stateValue.isFetchingNAModule2 = false;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_MEASURE_NAMODULE3_REQUEST:
            stateValue.isFetchingNAModule3 = true;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_MEASURE_NAMODULE3_SUCCESS:
            stateValue.isFirstFetchNAModule3 = false;
            stateValue.isFetchingNAModule3 = false;
            stateValue.measureDataNAModule3 = action.data;
            stateValue.measurelabelsNAModule3 = action.labels;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_MEASURE_NAMODULE3_FAILURE:
            stateValue.isFetchingNAModule3 = false;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_MEASURE_NAMODULE4_REQUEST:
            stateValue.isFetchingNAModule4 = true;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_MEASURE_NAMODULE4_SUCCESS:
            stateValue.isFirstFetchNAModule4 = false;
            stateValue.isFetchingNAModule4 = false;
            stateValue.measureDataNAModule4 = action.data;
            stateValue.measurelabelsNAModule4 = action.labels;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_MEASURE_NAMODULE4_FAILURE:
            stateValue.isFetchingNAModule4 = false;
            state = Object.assign({}, state, stateValue);
            break;

        default:
            break;
    }

    return state;
};

export {reducer as netatmoReducer}