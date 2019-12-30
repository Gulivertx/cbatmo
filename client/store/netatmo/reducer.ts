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
    station_data: undefined,
    first_fetch: true,

    loading_measure: false,
    measure_errors: undefined,
    measure_data: [],
    selected_module: '',
    selected_types: [],

    loading_rain_measure: false,
    measure_rain_errors: undefined,
    measure_rain_data: []
};

const reducer: Reducer<INetatmoState> = (state = initialState, action) => {
    if (typeof state === 'undefined') {
        // No preloadedState from server. Use local state.
        state = { ...initialState }
    } else {
        // PreloadedState supplied by the server, but it's not merged with our local initial state yet.
        state = { ...initialState, ...state }
    }

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
                loading_station_data: false,
                station_data: action.payload,
                station_data_last_updated: action.receivedAt,
                station_data_errors: undefined,
                first_fetch: false
            };

        case NetatmoActionTypes.STATION_DATA_FAILURE:
            return { ...state, loading_station_data: false, station_data_errors: action.error };

        /** NETATMO MEASURE DATA **/
        case NetatmoActionTypes.MEASURE_REQUEST:
            return { ...state, loading_measure: true };

        case NetatmoActionTypes.MEASURE_SUCCESS:
            return { ...state,
                loading_measure: false,
                measure_data: action.payload,
                selected_module: action.module,
                selected_types: action.types,
                measure_errors: undefined
            };

        case NetatmoActionTypes.MEASURE_FAILURE:
            return { ...state, loading_measure: false, measure_errors: action.error };

        /** NETATMO MEASURE RAIN DATA **/
        case NetatmoActionTypes.MEASURE_RAIN_REQUEST:
            return { ...state, loading_rain_measure: true };

        case NetatmoActionTypes.MEASURE_RAIN_SUCCESS:
            return { ...state,
                loading_rain_measure: false,
                measure_rain_data: action.payload,
                measure_rain_errors: undefined
            };

        case NetatmoActionTypes.MEASURE_RAIN_FAILURE:
            return { ...state, loading_rain_measure: false, measure_rain_errors: action.error };

        default:
            return state;
    }
};

export {reducer as netatmoReducer}
