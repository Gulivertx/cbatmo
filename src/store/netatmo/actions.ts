import { Action } from 'redux'
import {ApplicationState, AppThunk} from '../index'
import { ThunkAction } from 'redux-thunk'
import moment from 'moment';
import {setUserInfo, setIsStarting, setDevicesName} from "../application/actions";
import NetatmoChartsData from "../../models/NetatmoChartsData";
import { NetatmoActionTypes } from "./types";
import NetatmoClient from "../../apis/netatmo";
import {ApiStationDataResponse, User} from "../../apis/netatmo/interfaces/ApiStationData";
import {ApiTokenResponse} from "../../apis/netatmo/interfaces/ApiOAuth";
import StationData from "../../apis/netatmo/models/StationData";
import {measure_timelapse, type} from "../../apis/netatmo/types";
import graph_timelapse = Cbatmo.graph_timelapse;
import UserData from "../../apis/netatmo/models/UserData";

// This is the delay before next API call to refresh data
// Netatmo only refresh their API every 10 minutes so call less than 10 is not necessary
const API_REFRESH_DELAY: number = 10;

const netatmoClient = new NetatmoClient();

export const requestAuth = () => {
    return {
        type: NetatmoActionTypes.AUTH_REQUEST
    }
};

export const successAuth = () => {
    return {
        type: NetatmoActionTypes.AUTH_SUCCESS,
        receivedAt: Date.now()
    }
};

export const failureAuth = (error: any) => {
    return {
        type: NetatmoActionTypes.AUTH_FAILURE,
        error: error
    }
};

export const fetchAuth = (username: string, password: string, secret: string): AppThunk => async (dispatch, getState) => {
    dispatch(requestAuth());

    return netatmoClient.auth(username, password, secret)
        .then(() => {
            dispatch(successAuth());
            dispatch(fetchStationData());
        })
        .catch(error => {
            dispatch(failureAuth(error));
            throw error;
        })
};

export const requestRefreshToken = () => {
    return {
        type: NetatmoActionTypes.REFRESH_TOKEN_REQUEST
    }
};

export const successRefreshToken = () => {
    return {
        type: NetatmoActionTypes.REFRESH_TOKEN_SUCCESS,
        receivedAt: Date.now()
    }
};

export const failureRefreshToken = (error: any) => {
    return {
        type: NetatmoActionTypes.REFRESH_TOKEN_FAILURE,
        error: error
    }
};

export const fetchRefreshToken = (): AppThunk => async (dispatch, getState) => {
    dispatch(requestRefreshToken());

    return netatmoClient.refreshToken()
        .then(() => {
            dispatch(successRefreshToken());
            dispatch(fetchStationData());
        })
        .catch(error => {
            dispatch(failureRefreshToken(error))
        })
};

export const requestStationData = () => {
    return {
        type: NetatmoActionTypes.STATION_DATA_REQUEST
    }
};

export const successStationData = (stationData: StationData) => {
    return {
        type: NetatmoActionTypes.STATION_DATA_SUCCESS,
        stationData: stationData,
        receivedAt: Date.now()
    }
};

export const failureStationData = (error: any) => {
    return {
        type: NetatmoActionTypes.STATION_DATA_FAILURE,
        error: error
    }
};

export const fetchStationData = (): AppThunk => async (dispatch, getState) => {
    dispatch(requestStationData());

    return netatmoClient.fetchStationData()
        .then(resp => {
            if (resp) {
                const userData = netatmoClient.getUserInformation();
                const devicesName = netatmoClient.getDevicesName();

                const selected_device_id = getState().netatmo.selected_device ? getState().netatmo.selected_device as string : devicesName[0].id;
                const stationData = netatmoClient.getStationDataByDeviceId(selected_device_id);

                // Regitre some station information is application was starting only
                if (getState().application.isStarting) {
                    dispatch(setUserInfo(userData))
                    dispatch(setDevicesName(devicesName))
                    dispatch(successStationData(stationData))
                    dispatch(setIsStarting(false))
                } else {
                    dispatch(successStationData(stationData))
                }
            }
        })
        .catch(error => {
            console.log(error)
            dispatch(failureStationData(error))
        })
};


export const requestMeasure = () => {
    return {
        type: NetatmoActionTypes.MEASURE_REQUEST
    }
};

export const successMeasure = (data: any, module: string, types: string[], timelapse: Cbatmo.graph_timelapse) => {
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

export const fetchMeasure = (device: string, module: string, types: string[], timelapse: Cbatmo.graph_timelapse = '12h'): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch, getState) => {
        // Get measure only if we have no data or if the last fetch is bigger than 10 minutes
        if (getState().netatmo.measure_data.length === 0 ||
            (getState().netatmo.selected_types[0] !== types[0] ||
            getState().netatmo.selected_module !== module) ||
            getState().netatmo.selected_timelapse !== timelapse ||
            moment().diff(moment.unix(Number(getState().netatmo.station_data?.last_status_store)), 'minute') > API_REFRESH_DELAY) {
            dispatch(requestMeasure());

            let date_begin: number;
            let scale: measure_timelapse;

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
                default:
                    date_begin = moment().subtract(720, 'minutes').unix();
                    scale = '30min';
                    break;
            }

            const date_end = moment().unix();

            const params = new URLSearchParams();
            //params.append('access_token', getState().netatmo.access_token as string);
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
                    const dataChart = new NetatmoChartsData(json.body, types, getState().application.user as UserData);
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
        if (getState().netatmo.measure_rain_data.length === 0 || moment().diff(moment.unix(Number(getState().netatmo.station_data?.last_status_store)), 'minute') > API_REFRESH_DELAY) {
            dispatch(requestRainMeasure());

            const params = new URLSearchParams();
            //params.append('access_token', getState().netatmo.access_token as string);
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
                    const dataChart = new NetatmoChartsData(json.body, ['Rain'], getState().application.user as UserData);
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

export const successMeasures = (data: any, module: string, timelapse: Cbatmo.graph_timelapse) => {
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

export const fetchMeasures = (device: string, module: string, types: type[], timelapse: '12h'|'1d'|'1m', module_name: string): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch, getState) => {
        // Get measure only if we have no data or if the last fetch is bigger than 10 minutes
        if ((getState().netatmo.measure_station_data.length === 0 &&
            getState().netatmo.measure_outdoor_data.length === 0 &&
            getState().netatmo.measure_indoor1_data.length === 0 &&
            getState().netatmo.measure_indoor2_data.length === 0 &&
            getState().netatmo.measure_indoor3_data.length === 0) ||
            moment().diff(moment.unix(Number(getState().netatmo.station_data?.last_status_store)), 'minute') > API_REFRESH_DELAY) {
            dispatch(requestMeasures(module_name));

            let date_begin: number;
            let scale: measure_timelapse;

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
            //params.append('access_token', getState().netatmo.access_token as string);
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
                    const dataChart = new NetatmoChartsData(json.body, types, getState().application.user as UserData);
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

export const onChangeSelectedType = (type: type, module: string) => {
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

export const onChangeSelectedDevice = (home_id: string) => {
    const device = netatmoClient.getStationDataByDeviceId(home_id);
    console.log(device)

    return {
        type: NetatmoActionTypes.CHANGE_SELECTED_DEVICE,
        payload: device,
        home_id: home_id
    }
}
