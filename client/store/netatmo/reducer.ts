/**
 * Netatmo reducer
 * NAMain = MAIN module
 * NAModule1 = OUTDOOR module
 * NAModule2 = WIND module
 * NAModule3 = RAIN module
 * NAModule4 = INDOOR module
 */
import { Reducer } from "redux";
import moment from 'moment';
import { INetatmoState, NetatmoActionTypes } from "./types";

const initialState: INetatmoState = {
    client_id: '',
    client_secret: '',
    username: '',
    password: '',

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
    first_fetch: true,

    // MAIN module history
    loading_main: false,
    measure_main_errors: undefined,
    measure_main_data: [],

    // OUTDOOR module history (namodule1)
    loading_outdoor: false,
    measure_outdoor_errors: undefined,
    measure_outdoor_data: [],

    // WIND module history (namodule2)
    loading_wind: false,
    measure_wind_errors: undefined,
    measure_wind_data: [],

    // Rain module history (namodule3)
    loading_rain: true,
    measure_rain_errors: undefined,
    measure_rain_data: [],

    // INDOOR module history (namodule4)
    loading_indoor: true,
    measure_indoor_errors: undefined,
    measure_indoor_data: [],
};

const reducer: Reducer<INetatmoState> = (state = initialState, action) => {
    switch (action.type) {
        /** NETATMO AUTH **/
        case NetatmoActionTypes.AUTH_REQUEST:
            return { ...state, loading_auth: true };

        case NetatmoActionTypes.AUTH_SUCCESS:
            return { ...state,
                loading_auth: false,
                auth_errors: undefined,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                access_token_expire_in: moment().unix() + action.payload.expire_in
            };

        case NetatmoActionTypes.AUTH_FAILURE:
            return { ...state, loading_auth: false, auth_errors: action.error };

        /** NETATMO REFRESH TOKEN **/
        case NetatmoActionTypes.REFRESH_TOKEN_REQUEST:
            return { ...state, loading_auth: true };

        case NetatmoActionTypes.REFRESH_TOKEN_SUCCESS:
            return { ...state,
                loading_auth: false,
                auth_errors: undefined,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                access_token_expire_in: moment().unix() + action.payload.expire_in
            };

        case NetatmoActionTypes.REFRESH_TOKEN_FAILURE:
            return { ...state, loading_auth: false, auth_errors: action.error };

        /** NETATMO STATION DATA **/
        case NetatmoActionTypes.STATION_DATA_REQUEST:
            return { ...state, loading_station_data: true };

        case NetatmoActionTypes.STATION_DATA_SUCCESS:
            return { ...state,
                loading_station_data: true,
                station_data: action.payload,
                station_data_last_updated: action.receivedAt,
                station_data_errors: undefined,
                first_fetch: false
            };

        case NetatmoActionTypes.STATION_DATA_FAILURE:
            return { ...state, loading_station_data: true, station_data_errors: action.error };

        /** NETATMO MEASURE DATA **/
        case NetatmoActionTypes.MEASURE_MAIN_REQUEST:
            return { ...state, loading_main: true };

        case NetatmoActionTypes.MEASURE_MAIN_SUCCESS:
            return { ...state,
                loading_indoor: false,
                measure_main_data: action.payload,
                measure_main_errors: undefined
            };

        case NetatmoActionTypes.MEASURE_MAIN_FAILURE:
            return { ...state, loading_main: false, measure_main_errors: action.error };

        case NetatmoActionTypes.MEASURE_OUTDOOR_REQUEST:
            return { ...state, loading_outdoor: true };

        case NetatmoActionTypes.MEASURE_OUTDOOR_SUCCESS:
            return { ...state,
                loading_outdoor: false,
                measure_outdoor_data: action.payload,
                measure_outdoor_errors: undefined
            };

        case NetatmoActionTypes.MEASURE_OUTDOOR_FAILURE:
            return { ...state, loading_outdoor: false, measure_outdoor_errors: action.error };

        case NetatmoActionTypes.MEASURE_WIND_REQUEST:
            return { ...state, loading_wind: true };

        case NetatmoActionTypes.MEASURE_WIND_SUCCESS:
            return { ...state,
                loading_wind: false,
                measure_outdoor_data: action.payload,
                measure_wind_errors: undefined
            };

        case NetatmoActionTypes.MEASURE_WIND_FAILURE:
            return { ...state, loading_wind: false, measure_wind_errors: action.error };

        case NetatmoActionTypes.MEASURE_RAIN_REQUEST:
            return { ...state, loading_rain: true };

        case NetatmoActionTypes.MEASURE_RAIN_SUCCESS:
            return { ...state,
                loading_rain: false,
                measure_rain_data: action.payload,
                measure_rain_errors: undefined
            };

        case NetatmoActionTypes.MEASURE_RAIN_FAILURE:
            return { ...state, loading_rain: false, measure_rain_errors: action.error };

        case NetatmoActionTypes.MEASURE_INDOOR_REQUEST:
            return { ...state, loading_indoor: true };

        case NetatmoActionTypes.MEASURE_INDOOR_SUCCESS:
            return { ...state,
                loading_indoor: false,
                measure_indoor_data: action.payload,
                measure_indoor_errors: undefined
            };

        case NetatmoActionTypes.MEASURE_INDOOR_FAILURE:
            return { ...state, loading_indoor: false, measure_indoor_errors: action.error };

        default:
            return state;
    }
};

export {reducer as netatmoReducer}
