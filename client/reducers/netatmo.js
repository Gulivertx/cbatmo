import {
    NETATMO_AUTH_REQUEST,
    NETATMO_AUTH_SUCCESS,
    NETATMO_AUTH_FAILURE,
    NETATMO_REFRESH_TOKEN_REQUEST,
    NETATMO_REFRESH_TOKEN_SUCCESS,
    NETATMO_REFRESH_TOKEN_FAILURE,
    NETATMO_STATION_DATA_REQUEST,
    NETATMO_STATION_DATA_SUCCESS,
    NETATMO_STATION_DATA_FAILURE,
    NETATMO_STATION_DATA_UPTODATE,
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
    NETATMO_MEASURE_NAMODULE4_FAILURE,
    NETATMO_CHANGE_ACCESS_TOKEN,
    NETATMO_CHANGE_REFRESH_TOKEN,
    NETATMO_CHANGE_EXPIRE_IN
} from "../actions";

const defaultState = {
    accessToken: '',
    refreshToken: '',
    expireIn: 0,
    isFirstFetch: true,
    isFetchingStation: false,
    stationData: {},
    stationLastUpdated: null,
    isFetchingAuth: false,
    authResult: {},
    isFetchingRefreshToken: false,
    refreshTokenResult: {},
    isFirstFetchNAMain: true,
    isFetchingNAMain: false,
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

const netatmo = (state = defaultState, action) => {
    let stateValue = {};

    switch (action.type) {
        /** NETATMO CHANGE TOKENS **/
        case NETATMO_CHANGE_ACCESS_TOKEN:
            stateValue.accessToken = action.value;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_CHANGE_REFRESH_TOKEN:
            stateValue.refreshToken = action.value;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_CHANGE_EXPIRE_IN:
            stateValue.expireIn = action.value;
            state = Object.assign({}, state, stateValue);
            break;

            /** NETATMO AUTH **/
        case NETATMO_AUTH_REQUEST:
            stateValue.isFetchingAuth = true;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_AUTH_SUCCESS:
            stateValue.isFetchingAuth = false;
            stateValue.authResult = action.data;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_AUTH_FAILURE:
            stateValue.isFetchingAuth = false;
            state = Object.assign({}, state, stateValue);
            break;

        /** NETATMO REFRESH TOKEN **/
        case NETATMO_REFRESH_TOKEN_REQUEST:
            stateValue.isFetchingRefreshToken = true;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_REFRESH_TOKEN_SUCCESS:
            stateValue.isFetchingRefreshToken = false;
            stateValue.refreshTokenResult = action.data;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_REFRESH_TOKEN_FAILURE:
            stateValue.isFetchingRefreshToken = false;
            state = Object.assign({}, state, stateValue);
            break;

        /** NETATMO STATION DATA **/
        case NETATMO_STATION_DATA_REQUEST:
            stateValue.isFetchingStation = true;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_STATION_DATA_SUCCESS:
            stateValue.isFetchingStation = false;
            stateValue.isFirstFetch = false;
            stateValue.stationData = action.data;
            stateValue.stationLastUpdated = action.receivedAt;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_STATION_DATA_FAILURE:
            stateValue.isFetchingStation = false;
            state = Object.assign({}, state, stateValue);
            break;

        case NETATMO_STATION_DATA_UPTODATE:
            stateValue.isFetchingStation = false;
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

export default netatmo