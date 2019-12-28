import { Action } from 'redux'
import { ApplicationState } from '../index'
import { ThunkAction } from 'redux-thunk'
import moment from 'moment';
import { setUserInfo } from "../application/actions";
import NetatmoNAMain from '../../models/NetatmoNAMain';
import NetatmoUserInformation from "../../models/NetatmoUserInformation";
import NetatmoChartsData from "../../models/NetatmoChartsData";
import { NetatmoActionTypes } from "./types";

const NETATMO_API_ROOT_URL = "https://api.netatmo.com/";

// TODO : build Express route to query the Netatmo API

export const requestAuth = () => {
    return {
        type: NetatmoActionTypes.AUTH_REQUEST
    }
};

// Todo types
export const successAuth = (json: any) => {
    return {
        type: NetatmoActionTypes.AUTH_SUCCESS,
        payload: json,
        receivedAt: Date.now()
    }
};

// Todo types
export const failureAuth = (error: any) => {
    return {
        type: NetatmoActionTypes.AUTH_FAILURE,
        error: error
    }
};

export const fetchAuth = (): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch, getState) => {
        dispatch(requestAuth());

        const { netatmo } = getState();

        const params = new URLSearchParams();
        params.append('client_id', netatmo.client_id);
        params.append('client_secret', netatmo.client_secret);
        params.append('grant_type', 'password');
        params.append('scope', 'read_station');
        params.append('username', netatmo.username);
        params.append('password', netatmo.password);

        return fetch(`${NETATMO_API_ROOT_URL}oauth2/token`, {method: 'POST', body: params})
            .then(response => {
                if (!response.ok) throw response;
                return response.json()
            })
            .then(json => {
                window.localStorage.setItem('NetatmoRefreshToken', json.refresh_token);
                window.localStorage.setItem('NetatmoExpireIn', moment().unix() + json.expire_in);
                //window.localStorage.setItem('appIsConfigured', 'true');
                dispatch(successAuth(json));
                //dispatch(appConfigured(true));
                console.log('Fetch station data')
                dispatch(fetchStationData());
            })
            .catch(error => {
                // Todo types
                error.json().then((errorMessage: any) => {
                    dispatch(failureAuth(errorMessage))
                })
            });

    }
};

export const requestRefreshToken = () => {
    return {
        type: NetatmoActionTypes.REFRESH_TOKEN_REQUEST
    }
};

// Todo types
export const successRefreshToken = (json: any) => {
    return {
        type: NetatmoActionTypes.REFRESH_TOKEN_SUCCESS,
        payload: json,
        receivedAt: Date.now()
    }
};

// Todo types
export const failureRefreshToken = (error: any) => {
    return {
        type: NetatmoActionTypes.REFRESH_TOKEN_FAILURE,
        error: error
    }
};

export const fetchRefreshToken = (): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch, getState) => {
        dispatch(requestRefreshToken());

        const current_refresh_token = window.localStorage.getItem('NetatmoRefreshToken');
        const { netatmo } = getState();

        const params = new URLSearchParams();
        params.append('client_id', netatmo.client_id);
        params.append('client_secret', netatmo.client_secret);
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', current_refresh_token ? current_refresh_token : '');

        return fetch(`${NETATMO_API_ROOT_URL}oauth2/token`, {method: 'POST', body: params})
            .then(response => {
                if (!response.ok) throw response;
                return response.json()
            })
            .then(json => {
                window.localStorage.setItem('NetatmoRefreshToken', json.refresh_token);
                window.localStorage.setItem('NetatmoExpireIn', moment().unix() + json.expire_in);
                dispatch(successRefreshToken(json));
                dispatch(fetchStationData());
            })
            .catch(error => {
                // Todo types
                error.json().then((errorMessage: any) => {
                    dispatch(failureRefreshToken(errorMessage))
                })
            });
    }
};

export const requestStationData = () => {
    return {
        type: NetatmoActionTypes.STATION_DATA_REQUEST
    }
};

// Todo types
export const successStationData = (json: any) => {
    return {
        type: NetatmoActionTypes.STATION_DATA_SUCCESS,
        payload: json,
        receivedAt: Date.now()
    }
};

// Todo types
export const failureStationData = (error: any) => {
    return {
        type: NetatmoActionTypes.STATION_DATA_FAILURE,
        error: error
    }
};

export const fetchStationData = (): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch, getState) => {
        // If no access token or refresh token is soon expired
        if (!getState().netatmo.access_token || moment.unix(Number(getState().netatmo.access_token_expire_in)).diff(moment(), 'minute') < 10) {
            // Fetch a new access token from refresh token and then fetch station data
            dispatch(fetchRefreshToken());
        } else {
            // Fetch new data only if last data stored is bigger than 10 minutes
            if (getState().netatmo.station_data_last_updated === 0 || moment().diff(moment.unix(Number(getState().netatmo.station_data?.last_status_store)), 'minute') > 10) {
                dispatch(requestStationData());

                return fetch(`${NETATMO_API_ROOT_URL}api/getstationsdata?access_token=${getState().netatmo.access_token}`)
                    .then(response => {
                        if (!response.ok) throw response;
                        return response.json()
                    })
                    .then(json => {
                        const data = new NetatmoNAMain(json.body.devices[0]);
                        const user = new NetatmoUserInformation(json.body.user);
                        dispatch(successStationData(data))
                        dispatch(setUserInfo(user))
                    })
                    .catch(error => {
                        // Todo types
                        error.json().then((errorMessage: any) => {
                            dispatch(failureStationData(errorMessage))
                        })
                    });
            } else {
                console.debug('No new Netatmo station data to fetch')
            }
        }
    }
};

export const requestMainMeasure = () => {
    return {
        type: NetatmoActionTypes.MEASURE_MAIN_REQUEST
    }
};

// Todo types
export const successMainMeasure = (data: any) => {
    return {
        type: NetatmoActionTypes.MEASURE_MAIN_SUCCESS,
        payload: data,
        receivedAt: Date.now()
    }
};

// Todo types
export const failureMainMeasure = (error: any) => {
    return {
        type: NetatmoActionTypes.MEASURE_MAIN_FAILURE,
        error: error
    }
};

export const fetchMainMeasure = (device: string, module: string, type: string, hours = 12): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch, getState) => {
        // Get measure only if we have no data or if the last fetch is bigger than 10 minutes
        if (getState().netatmo.measure_main_data.length === 0 || moment().diff(moment.unix(Number(getState().netatmo.station_data?.last_status_store)), 'minute') > 10) {
            dispatch(requestMainMeasure());

            const date_begin = moment().subtract(hours, 'hours').unix();
            const date_end = moment().unix();

            return fetch(`${NETATMO_API_ROOT_URL}api/getmeasure?access_token=${getState().netatmo.access_token}&device_id=${device}&module_id=${module}&scale=30min&type=${type}&date_begin=${date_begin}&date_end=${date_end}&optimize=false`)
                .then(response => {
                    if (!response.ok) throw response;
                    return response.json()
                })
                .then(json => {
                    // const dataChart = new NetatmoModuleChartData(json.body, type)
                    // dispatch(successMainMeasure(dataChart.data))
                })
                .catch(error => {
                    // Todo types
                    error.json().then((errorMessage: any) => {
                        dispatch(failureMainMeasure(errorMessage))
                    })
                });
        }
    }
};

export const requestOutdoorMeasure = () => {
    return {
        type: NetatmoActionTypes.MEASURE_OUTDOOR_REQUEST
    }
};

// Todo types
export const successOutdoorMeasure = (data: any) => {
    return {
        type: NetatmoActionTypes.MEASURE_OUTDOOR_SUCCESS,
        payload: data,
        receivedAt: Date.now()
    }
};

// Todo types
export const failureOutdoorMeasure = (error: any) => {
    return {
        type: NetatmoActionTypes.MEASURE_OUTDOOR_FAILURE,
        error: error
    }
};

export const fetchoutdoorMeasure = (device: string, module: string, type: string, hours = 12): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch, getState) => {
        // Get measure only if we have no data or if the last fetch is bigger than 10 minutes
        if (getState().netatmo.measure_outdoor_data.length === 0 || moment().diff(moment.unix(Number(getState().netatmo.station_data?.last_status_store)), 'minute') > 10) {
            dispatch(requestOutdoorMeasure());

            const date_begin = moment().subtract(hours, 'hours').unix();
            const date_end = moment().unix();

            return fetch(`${NETATMO_API_ROOT_URL}api/getmeasure?access_token=${getState().netatmo.access_token}&device_id=${device}&module_id=${module}&scale=30min&type=${type}&date_begin=${date_begin}&date_end=${date_end}&optimize=false`)
                .then(response => {
                    if (!response.ok) throw response;
                    return response.json()
                })
                .then(json => {
                    // const dataChart = new NetatmoModuleChartData(json.body, type)
                    // dispatch(successOutdoorMeasure(dataChart.data))
                })
                .catch(error => {
                    // Todo types
                    error.json().then((errorMessage: any) => {
                        dispatch(failureOutdoorMeasure(errorMessage))
                    })
                });
        }
    }
};

export const requestWindMeasure = () => {
    return {
        type: NetatmoActionTypes.MEASURE_WIND_REQUEST
    }
};

// Todo types
export const successWindMeasure = (data: any) => {
    return {
        type: NetatmoActionTypes.MEASURE_WIND_SUCCESS,
        payload: data,
        receivedAt: Date.now()
    }
};

// Todo types
export const failureWindMeasure = (error: any) => {
    return {
        type: NetatmoActionTypes.MEASURE_WIND_FAILURE,
        error: error
    }
};

export const fetchWindMeasure = (device: string, module: string, type: string, hours = 12): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch, getState) => {
        // Get measure only if we have no data or if the last fetch is bigger than 10 minutes
        if (getState().netatmo.measure_wind_data.length === 0 || moment().diff(moment.unix(Number(getState().netatmo.station_data?.last_status_store)), 'minute') > 10) {
            dispatch(requestWindMeasure());

            const date_begin = moment().subtract(hours, 'hours').unix();
            const date_end = moment().unix();

            return fetch(`${NETATMO_API_ROOT_URL}api/getmeasure?access_token=${getState().netatmo.access_token}&device_id=${device}&module_id=${module}&scale=30min&type=${type}&date_begin=${date_begin}&date_end=${date_end}&optimize=false`)
                .then(response => {
                    if (!response.ok) throw response;
                    return response.json()
                })
                .then(json => {
                    // const dataChart = new NetatmoModuleChartData(json.body, type)
                    // dispatch(successWindMeasure(dataChart.data))
                })
                .catch(error => {
                    // Todo types
                    error.json().then((errorMessage: any) => {
                        dispatch(failureWindMeasure(errorMessage))
                    })
                });
        }
    }
};

export const requestRainMeasure = () => {
    return {
        type: NetatmoActionTypes.MEASURE_RAIN_REQUEST
    }
};

// Todo types
export const successRainMeasure = (data: any) => {
    return {
        type: NetatmoActionTypes.MEASURE_RAIN_SUCCESS,
        payload: data,
        receivedAt: Date.now()
    }
};

// Todo types
export const failureNRainMeasure = (error: any) => {
    return {
        type: NetatmoActionTypes.MEASURE_RAIN_FAILURE,
        error: error
    }
};

export const fetchRainMeasure = (device: string, module: string): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch, getState) => {
        // Get measure only if we have no data or if the last fetch is bigger than 10 minutes
        if (getState().netatmo.measure_rain_data.length === 0 || moment().diff(moment.unix(Number(getState().netatmo.station_data?.last_status_store)), 'minute') > 10) {
            dispatch(requestRainMeasure());

            const date_begin = moment().subtract(23, 'hours').unix();
            const date_end = moment().unix();

            return fetch(`${NETATMO_API_ROOT_URL}api/getmeasure?access_token=${getState().netatmo.access_token}&device_id=${device}&module_id=${module}&scale=1hour&type=Rain&date_begin=${date_begin}&date_end=${date_end}&optimize=false`)
                .then(response => {
                    if (!response.ok) throw response;
                    return response.json()
                })
                .then(json => {
                    const dataChart = new NetatmoChartsData(json.body, 'Rain');
                    dispatch(successRainMeasure(dataChart.data))
                })
                .catch(error => {
                    // Todo types
                    error.json().then((errorMessage: any) => {
                        dispatch(failureNRainMeasure(errorMessage))
                    })
                });
        }
    }
};

export const requestIndoorMeasure = () => {
    return {
        type: NetatmoActionTypes.MEASURE_INDOOR_REQUEST
    }
};

// Todo types
export const successIndoorMeasure = (data: any) => {
    return {
        type: NetatmoActionTypes.MEASURE_INDOOR_SUCCESS,
        payload: data,
        receivedAt: Date.now()
    }
};

// Todo types
export const failureIndooMeasure = (error: any) => {
    return {
        type: NetatmoActionTypes.MEASURE_INDOOR_FAILURE,
        error: error
    }
};

export const fetchIndoorMeasure = (device: string, module: string, type: string, hours = 12): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch, getState) => {
        // Get measure only if we have no data or if the last fetch is bigger than 10 minutes
        if (getState().netatmo.measure_indoor_data.length === 0 || moment().diff(moment.unix(Number(getState().netatmo.station_data?.last_status_store)), 'minute') > 10) {
            dispatch(requestIndoorMeasure());

            const date_begin = moment().subtract(hours, 'hours').unix();
            const date_end = moment().unix();

            return fetch(`${NETATMO_API_ROOT_URL}api/getmeasure?access_token=${getState().netatmo.access_token}&device_id=${device}&module_id=${module}&scale=30min&type=${type}&date_begin=${date_begin}&date_end=${date_end}&optimize=false`)
                .then(response => {
                    if (!response.ok) throw response;
                    return response.json()
                })
                .then(json => {
                    // const dataChart = new NetatmoModuleChartData(json.body, type)
                    // dispatch(successIndoorMeasure(dataChart.data))
                })
                .catch(error => {
                    // Todo types
                    error.json().then((errorMessage: any) => {
                        dispatch(failureIndooMeasure(errorMessage))
                    })
                });
        }
    }
};
