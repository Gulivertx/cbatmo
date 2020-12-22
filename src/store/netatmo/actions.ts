import { Action } from 'redux'
import { ApplicationState } from '../index'
import { ThunkAction } from 'redux-thunk'
import moment from 'moment';
import { setUserInfo } from "../application/actions";
import NetatmoNAMain from '../../models/NetatmoNAMain';
import NetatmoUserInformation from "../../models/NetatmoUserInformation";
import NetatmoChartsData from "../../models/NetatmoChartsData";
import { NetatmoActionTypes } from "./types";
import {ChartScales, DataTypes, Timelapse} from "../../types/netatmo";

const CALL_DELAY = 10;

export const requestAuth = () => {
    return {
        type: NetatmoActionTypes.AUTH_REQUEST
    }
};

export const successAuth = (json: any) => {
    return {
        type: NetatmoActionTypes.AUTH_SUCCESS,
        payload: json,
        receivedAt: Date.now()
    }
};

export const failureAuth = (error: any) => {
    return {
        type: NetatmoActionTypes.AUTH_FAILURE,
        error: error
    }
};

export const fetchAuth = (username: string, password: string, secret: string): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch, getState) => {
        dispatch(requestAuth());

        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('secret', secret);

        return fetch('/netatmo-auth', {method: 'POST', body: params})
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

export const successRefreshToken = (json: any) => {
    return {
        type: NetatmoActionTypes.REFRESH_TOKEN_SUCCESS,
        payload: json,
        receivedAt: Date.now()
    }
};

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

        const params = new URLSearchParams();
        params.append('refresh_token', current_refresh_token ? current_refresh_token : '');

        return fetch('/netatmo-refresh-token', {method: 'POST', body: params})
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

export const successStationData = (json: any) => {
    return {
        type: NetatmoActionTypes.STATION_DATA_SUCCESS,
        payload: json,
        receivedAt: Date.now()
    }
};

export const failureStationData = (error: any) => {
    return {
        type: NetatmoActionTypes.STATION_DATA_FAILURE,
        error: error
    }
};

export const fetchStationData = (): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch, getState) => {
        // If no access token or refresh token is soon expired
        if (!getState().netatmo.access_token || moment.unix(Number(getState().netatmo.access_token_expire_in)).diff(moment(), 'minute') < CALL_DELAY) {
            // Fetch a new access token from refresh token and then fetch station data
            dispatch(fetchRefreshToken());
        } else {
            // Fetch new data only if last data stored is bigger than 10 minutes
            if (getState().netatmo.station_data_last_updated === 0 || moment().diff(moment.unix(Number(getState().netatmo.station_data?.last_status_store)), 'minute') > CALL_DELAY) {
                dispatch(requestStationData());

                const params = new URLSearchParams();
                params.append('access_token', getState().netatmo.access_token as string);

                return fetch('/netatmo-station-data', {method: 'POST', body: params})
                    .then(response => {
                        if (!response.ok) throw response;
                        return response.json()
                    })
                    .then(json => {
                        const data = new NetatmoNAMain(json.body.devices[0], json.body.user);
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


export const requestMeasure = () => {
    return {
        type: NetatmoActionTypes.MEASURE_REQUEST
    }
};

export const successMeasure = (data: any, module: string, types: string[], timelapse: Timelapse) => {
    return {
        type: NetatmoActionTypes.MEASURE_SUCCESS,
        payload: data,
        module: module,
        types: types,
        timelapse: timelapse,
        receivedAt: Date.now()
    }
};

export const failureMeasure = (error: any) => {
    return {
        type: NetatmoActionTypes.MEASURE_FAILURE,
        error: error
    }
};

export const fetchMeasure = (device: string, module: string, types: string[], timelapse: Timelapse): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch, getState) => {
        // Get measure only if we have no data or if the last fetch is bigger than 10 minutes
        if (getState().netatmo.measure_data.length === 0 ||
            (getState().netatmo.selected_types[0] !== types[0] ||
            getState().netatmo.selected_module !== module) ||
            getState().netatmo.selected_timelapse !== timelapse ||
            moment().diff(moment.unix(Number(getState().netatmo.station_data?.last_status_store)), 'minute') > CALL_DELAY) {
            dispatch(requestMeasure());

            let date_begin: number;
            let scale: ChartScales;

            switch (timelapse) {
                case "12h":
                    date_begin = moment().subtract(720, 'minutes').unix();
                    scale = '30min';
                    break;
                case "1d":
                    date_begin = moment().subtract(1440, 'minutes').unix();
                    scale = '1hour';
                    break;
                case "1m":
                    date_begin = moment().subtract(1, 'months').unix();
                    scale = '1day';
                    break;
            }

            const date_end = moment().unix();

            const params = new URLSearchParams();
            params.append('access_token', getState().netatmo.access_token as string);
            params.append('device_id', device);
            params.append('module_id', module);
            params.append('scale', scale);
            params.append('type', types.toString());
            params.append('date_begin', date_begin.toString());
            params.append('date_end', date_end.toString());

            return fetch('/netatmo-measure', {method: 'POST', body: params})
                .then(response => {
                    if (!response.ok) throw response;
                    return response.json()
                })
                .then(json => {
                    const dataChart = new NetatmoChartsData(json.body, types, getState().application.user);
                    dispatch(successMeasure(dataChart.data, module, types, timelapse))
                })
                .catch(error => {
                    // Todo types
                    error.json().then((errorMessage: any) => {
                        dispatch(failureMeasure(errorMessage))
                    })
                });
        } else {
            console.debug('No new Netatmo measure data to fetch')
        }
    }
};


export const requestRainMeasure = () => {
    return {
        type: NetatmoActionTypes.MEASURE_RAIN_REQUEST
    }
};

export const successRainMeasure = (data: any) => {
    return {
        type: NetatmoActionTypes.MEASURE_RAIN_SUCCESS,
        payload: data,
        receivedAt: Date.now()
    }
};

export const failureNRainMeasure = (error: any) => {
    return {
        type: NetatmoActionTypes.MEASURE_RAIN_FAILURE,
        error: error
    }
};

export const fetchRainMeasure = (device: string, module: string): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch, getState) => {
        // Get measure only if we have no data or if the last fetch is bigger than 10 minutes
        if (getState().netatmo.measure_rain_data.length === 0 || moment().diff(moment.unix(Number(getState().netatmo.station_data?.last_status_store)), 'minute') > CALL_DELAY) {
            dispatch(requestRainMeasure());

            const params = new URLSearchParams();
            params.append('access_token', getState().netatmo.access_token as string);
            params.append('device_id', device);
            params.append('module_id', module);
            params.append('scale', '1hour');
            params.append('type', 'Rain');
            params.append('date_begin', moment().subtract(1440, 'minutes').unix().toString());
            params.append('date_end', moment().unix().toString());

            return fetch('/netatmo-measure', {method: 'POST', body: params})
                .then(response => {
                    if (!response.ok) throw response;
                    return response.json()
                })
                .then(json => {
                    const dataChart = new NetatmoChartsData(json.body, ['Rain'], getState().application.user);
                    dispatch(successRainMeasure(dataChart.data))
                })
                .catch(error => {
                    // Todo types
                    error.json().then((errorMessage: any) => {
                        dispatch(failureNRainMeasure(errorMessage))
                    })
                });
        } else {
            console.debug('No new Netatmo rain measure data to fetch')
        }
    }
};

export const requestMeasures = (module: string) => {
    return {
        type: NetatmoActionTypes.MEASURES_REQUEST,
        module: module
    }
};

export const successMeasures = (data: any, module: string, timelapse: Timelapse) => {
    return {
        type: NetatmoActionTypes.MEASURES_SUCCESS,
        payload: data,
        receivedAt: Date.now(),
        module: module
    }
};

export const failureMeasures = (error: any, module: string) => {
    return {
        type: NetatmoActionTypes.MEASURES_FAILURE,
        error: error,
        module: module
    }
};

export const fetchMeasures = (device: string, module: string, types: DataTypes[], timelapse: '12h'|'1d'|'1m', module_name: string): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch, getState) => {
        // Get measure only if we have no data or if the last fetch is bigger than 10 minutes
        if ((getState().netatmo.measure_station_data.length === 0 &&
            getState().netatmo.measure_outdoor_data.length === 0 &&
            getState().netatmo.measure_indoor_data.length === 0 &&
            getState().netatmo.measure_indoor_second_data.length === 0 &&
            getState().netatmo.measure_indoor_third_data.length === 0) ||
            moment().diff(moment.unix(Number(getState().netatmo.station_data?.last_status_store)), 'minute') > CALL_DELAY) {
            dispatch(requestMeasures(module_name));

            let date_begin: number;
            let scale: ChartScales;

            switch (timelapse) {
                case "12h":
                    date_begin = moment().subtract(720, 'minutes').unix();
                    scale = '30min';
                    break;
                case "1d":
                    date_begin = moment().subtract(1440, 'minutes').unix();
                    scale = '30min';
                    break;
                case "1m":
                    date_begin = moment().subtract(1, 'months').unix();
                    scale = '1day';
                    break;
            }

            const params = new URLSearchParams();
            params.append('access_token', getState().netatmo.access_token as string);
            params.append('device_id', device);
            params.append('module_id', module);
            params.append('scale', scale);
            params.append('type', types.toString());
            params.append('date_begin', date_begin.toString());
            params.append('date_end', moment().unix().toString());

            return fetch('/netatmo-measure', {method: 'POST', body: params})
                .then(response => {
                    if (!response.ok) throw response;
                    return response.json()
                })
                .then(json => {
                    const dataChart = new NetatmoChartsData(json.body, types, getState().application.user);
                    dispatch(successMeasures(dataChart.data, module_name, timelapse))
                })
                .catch(error => {
                    // Todo types
                    error.json().then((errorMessage: any) => {
                        dispatch(failureMeasures(errorMessage, module_name))
                    })
                });
        }
    }
};

export const onChangeSelectedType = (type: DataTypes, module: string) => {
    return {
        type: NetatmoActionTypes.CHANGE_SELECTED_TYPE,
        payload: type,
        module: module
    }
}

export const onChangeSelectedInsideModule = (module: number) => {
    return {
        type: NetatmoActionTypes.CHANGE_SELECTED_INSIDE_MODULE,
        payload: module,
    }
}
