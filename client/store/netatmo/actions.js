import moment from 'moment';
import {appConfigured, setLocale} from "../application/actions";
import api from '../../../config/api.json';
import NetatmoStationData from '../../DTO/NetatmoStationData';

const NETATMO_API_ROOT_URL = api.netatmo.api_url;
const NETATMO_API_CLIENT_ID = api.netatmo.client_id;
const NETATMO_API_CLIENT_SECRET = api.netatmo.client_secret;


export const AUTH_REQUEST = '@@netatmo/AUTH_REQUEST';
export const AUTH_SUCCESS = '@@netatmo/AUTH_SUCCESS';
export const AUTH_FAILURE = '@@netatmo/AUTH_FAILURE';

export const requestAuth = () => {
    return {
        type: AUTH_REQUEST
    }
};

export const successAuth = (json) => {
    return {
        type: AUTH_SUCCESS,
        payload: json,
        receivedAt: Date.now()
    }
};

export const failureAuth = (error) => {
    return {
        type: AUTH_FAILURE,
        error: error
    }
};

export const fetchAuth = (email, password) => {
    return (dispatch) => {
        dispatch(requestAuth());

        const params = new URLSearchParams();
        params.append('client_id', NETATMO_API_CLIENT_ID);
        params.append('client_secret', NETATMO_API_CLIENT_SECRET);
        params.append('grant_type', 'password');
        params.append('scope', 'read_station');
        params.append('username', email);
        params.append('password', password);

        return fetch(`${NETATMO_API_ROOT_URL}oauth2/token`, {method: 'POST', body: params})
            .then(response => {
                if (!response.ok) throw response;
                return response.json()
            })
            .then(json => {
                window.localStorage.setItem('NetatmoRefreshToken', json.refresh_token);
                window.localStorage.setItem('NetatmoExpireIn', moment().unix() + json.expire_in);
                window.localStorage.setItem('appIsConfigured', 'true');
                dispatch(successAuth(json));
                dispatch(appConfigured(true));
            })
            .catch(error => {
                error.json().then(errorMessage => {
                    dispatch(failureAuth(errorMessage))
                })
            });

    }
};


export const REFRESH_TOKEN_REQUEST = '@@netatmo/REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = '@@netatmo/REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = '@@netatmo/REFRESH_TOKEN_FAILURE';

export const requestRefreshToken = () => {
    return {
        type: REFRESH_TOKEN_REQUEST
    }
};

export const successRefreshToken = (json) => {
    return {
        type: REFRESH_TOKEN_SUCCESS,
        payload: json,
        receivedAt: Date.now()
    }
};

export const failureRefreshToken = (error) => {
    return {
        type: REFRESH_TOKEN_FAILURE,
        error: error
    }
};

export const fetchRefreshToken = () => {
    return (dispatch, getState) => {
        dispatch(requestRefreshToken());

        const params = new URLSearchParams();
        params.append('client_id', NETATMO_API_CLIENT_ID);
        params.append('client_secret', NETATMO_API_CLIENT_SECRET);
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', window.localStorage.getItem('NetatmoRefreshToken'));

        return fetch(`${NETATMO_API_ROOT_URL}oauth2/token`, {method: 'POST', body: params})
            .then(response => {
                if (!response.ok) throw response;
                return response.json()
            })
            .then(json => {
                window.localStorage.setItem('NetatmoRefreshToken', json.refresh_token);
                window.localStorage.setItem('NetatmoExpireIn', moment().unix() + json.expire_in);
                dispatch(successRefreshToken(json));
            })
            .catch(error => {
                error.json().then(errorMessage => {
                    dispatch(failureRefreshToken(errorMessage))
                })
            });
    }
};

export const STATION_DATA_REQUEST = '@@netatmo/STATION_DATA_REQUEST';
export const STATION_DATA_SUCCESS = '@@netatmo/STATION_DATA_SUCCESS';
export const STATION_DATA_FAILURE = '@@netatmo/STATION_DATA_FAILURE';
export const STATION_DATA_UPTODATE = '@@netatmo/STATION_DATA_UPTODATE';

export const requestStationData = () => {
    return {
        type: STATION_DATA_REQUEST
    }
};

export const successStationData = (json) => {
    return {
        type: STATION_DATA_SUCCESS,
        payload: json,
        receivedAt: Date.now()
    }
};

export const failureStationData = (error) => {
    return {
        type: STATION_DATA_FAILURE,
        error: error
    }
};

export const updateToDateStationData = () => {
    return {
        type: STATION_DATA_UPTODATE
    }
};

export const fetchStationData = () => {
    return (dispatch, getState) => {
        dispatch(requestStationData());

        // If no access token or refresh token is soon expired
        if (!getState().netatmo.access_token || moment.unix(Number(getState().netatmo.access_token_expire_in)).diff(moment(), 'minute') < 10) {
            // Fetch a new access token from refresh token and then fetch station data
            dispatch(fetchRefreshToken()).then(() => {
                return fetch(`${NETATMO_API_ROOT_URL}api/getstationsdata?access_token=${getState().netatmo.access_token}`)
                    .then(response => {
                        if (!response.ok) throw response;
                        return response.json()
                    })
                    .then(json => {
                        const data = new NetatmoStationData(json.body.devices[0]);
                        dispatch(successStationData(data))
                        dispatch(setLocale(json.body.user.administrative.lang));
                    })
                    .catch(error => {
                        error.json().then(errorMessage => {
                            dispatch(failureStationData(errorMessage))
                        })
                    });
            });
        } else {
            // Fetch new data only if last data stored is bigger than 10 minutes
            if (moment().diff(moment.unix(Number(getState().netatmo.station_data.last_status_store)), 'minute') > 10) {
                return fetch(`${NETATMO_API_ROOT_URL}api/getstationsdata?access_token=${getState().netatmo.access_token}`)
                    .then(response => {
                        if (!response.ok) throw response;
                        return response.json()
                    })
                    .then(json => {
                        const data = new NetatmoStationData(json.body.devices[0]);
                        dispatch(successStationData(data))
                    })
                    .catch(error => {
                        error.json().then(errorMessage => {
                            dispatch(failureStationData(errorMessage))
                        })
                    });
            } else {
                dispatch(updateToDateStationData())
            }

        }
    }
};


export const MEASURE_MAIN_REQUEST = '@@netatmo/MEASURE_MAIN_REQUEST';
export const MEASURE_MAIN_SUCCESS = '@@netatmo/MEASURE_MAIN_SUCCESS';
export const MEASURE_MAIN_FAILURE = '@@netatmo/MEASURE_MAIN_FAILURE';

export const requestMainMeasure = () => {
    return {
        type: MEASURE_MAIN_REQUEST
    }
};

export const successMainMeasure = (labels, data) => {
    return {
        type: MEASURE_MAIN_SUCCESS,
        data: data,
        labels: labels,
        receivedAt: Date.now()
    }
};

export const failureMainMeasure = (error) => {
    return {
        type: MEASURE_MAIN_FAILURE,
        error: error
    }
};

export const fetchMainMeasure = (device, module, type) => {
    return (dispatch, getState) => {
        dispatch(requestMainMeasure());

        const date_begin = moment().subtract(12, 'hours').unix();
        const date_end = moment().unix();

        return fetch(`${NETATMO_API_ROOT_URL}api/getmeasure?access_token=${getState().netatmo.access_token}&device_id=${device}&module_id=${module}&scale=30min&type=${type}&date_begin=${date_begin}&date_end=${date_end}&optimize=true`)
            .then(response => {
                if (!response.ok) throw response;
                return response.json()
            })
            .then(json => {
                let beg_time = json.body[0].beg_time;
                const step_time = json.body[0].step_time;

                let data = [], labels = [];

                json.body[0].value.map(value => {
                    let label = moment.unix(beg_time).format('HH:mm');
                    labels = [...labels, label];
                    data = [...data, value[0]];
                    beg_time = beg_time + step_time;
                });
                dispatch(successMainMeasure(labels, data))
            })
            .catch(error => {
                error.json().then(errorMessage => {
                    dispatch(failureMainMeasure(errorMessage))
                })
            });
    }
};


export const MEASURE_OUTDOOR_REQUEST = '@@netatmo/MEASURE_OUTDOOR_REQUEST';
export const MEASURE_OUTDOOR_SUCCESS = '@@netatmo/MEASURE_OUTDOOR_SUCCESS';
export const MEASURE_OUTDOOR_FAILURE = '@@netatmo/MEASURE_OUTDOOR_FAILURE';

export const requestOutdoorMeasure = () => {
    return {
        type: MEASURE_OUTDOOR_REQUEST
    }
};

export const successOutdoorMeasure = (labels, data) => {
    return {
        type: MEASURE_OUTDOOR_SUCCESS,
        data: data,
        labels: labels,
        receivedAt: Date.now()
    }
};

export const failureOutdoorMeasure = (error) => {
    return {
        type: MEASURE_OUTDOOR_FAILURE,
        error: error
    }
};

export const fetchoutdoorMeasure = (device, module, type) => {
    return (dispatch, getState) => {
        dispatch(requestOutdoorMeasure());

        const date_begin = moment().subtract(12, 'hours').unix();
        const date_end = moment().unix();

        return fetch(`${NETATMO_API_ROOT_URL}api/getmeasure?access_token=${getState().netatmo.access_token}&device_id=${device}&module_id=${module}&scale=30min&type=${type}&date_begin=${date_begin}&date_end=${date_end}&optimize=true`)
            .then(response => {
                if (!response.ok) throw response;
                return response.json()
            })
            .then(json => {
                let beg_time = json.body[0].beg_time;
                const step_time = json.body[0].step_time;

                let data = [], labels = [];

                json.body[0].value.map(value => {
                    let label = moment.unix(beg_time).format('HH:mm');
                    labels = [...labels, label];
                    data = [...data, value[0]];
                    beg_time = beg_time + step_time;
                });
                dispatch(successOutdoorMeasure(labels, data))
            })
            .catch(error => {
                error.json().then(errorMessage => {
                    dispatch(failureOutdoorMeasure(errorMessage))
                })
            });
    }
};


export const MEASURE_WIND_REQUEST = '@@netatmo/MEASURE_WIND_REQUEST';
export const MEASURE_WIND_SUCCESS = '@@netatmo/MEASURE_WIND_SUCCESS';
export const MEASURE_WIND_FAILURE = '@@netatmo/MEASURE_WIND_FAILURE';

export const requestWindMeasure = () => {
    return {
        type: MEASURE_WIND_REQUEST
    }
};

export const successWindMeasure = (labels, data) => {
    return {
        type: MEASURE_WIND_SUCCESS,
        data: data,
        labels: labels,
        receivedAt: Date.now()
    }
};

export const failureWindMeasure = (error) => {
    return {
        type: MEASURE_WIND_FAILURE,
        error: error
    }
};

export const fetchWindMeasure = (device, module, type) => {
    return (dispatch, getState) => {
        dispatch(requestWindMeasure());

        const date_begin = moment().subtract(12, 'hours').unix();
        const date_end = moment().unix();

        return fetch(`${NETATMO_API_ROOT_URL}api/getmeasure?access_token=${getState().netatmo.access_token}&device_id=${device}&module_id=${module}&scale=30min&type=${type}&date_begin=${date_begin}&date_end=${date_end}&optimize=true`)
            .then(response => {
                if (!response.ok) throw response;
                return response.json()
            })
            .then(json => {
                let beg_time = json.body[0].beg_time;
                const step_time = json.body[0].step_time;

                let data = [], labels = [];

                json.body[0].value.map(value => {
                    let label = moment.unix(beg_time).format('HH:mm');
                    labels = [...labels, label];
                    data = [...data, value[0]];
                    beg_time = beg_time + step_time;
                });
                dispatch(successWindMeasure(labels, data))
            })
            .catch(error => {
                error.json().then(errorMessage => {
                    dispatch(failureWindMeasure(errorMessage))
                })
            });
    }
};


export const MEASURE_RAIN_REQUEST = '@@netatmo/MEASURE_RAIN_REQUEST';
export const MEASURE_RAIN_SUCCESS = '@@netatmo/MEASURE_RAIN_SUCCESS';
export const MEASURE_RAIN_FAILURE = '@@netatmo/MEASURE_RAIN_FAILURE';

export const requestRainMeasure = () => {
    return {
        type: MEASURE_RAIN_REQUEST
    }
};

export const successRainMeasure = (labels, data) => {
    return {
        type: MEASURE_RAIN_SUCCESS,
        data: data,
        labels: labels,
        receivedAt: Date.now()
    }
};

export const failureNRainMeasure = (error) => {
    return {
        type: MEASURE_RAIN_FAILURE,
        error: error
    }
};

export const fetchRainMeasure = (device, module, type) => {
    return (dispatch, getState) => {
        dispatch(requestRainMeasure());

        const date_begin = moment().subtract(12, 'hours').unix();
        const date_end = moment().unix();

        return fetch(`${NETATMO_API_ROOT_URL}api/getmeasure?access_token=${getState().netatmo.access_token}&device_id=${device}&module_id=${module}&scale=30min&type=${type}&date_begin=${date_begin}&date_end=${date_end}&optimize=true`)
            .then(response => {
                if (!response.ok) throw response;
                return response.json()
            })
            .then(json => {
                let beg_time = json.body[0].beg_time;
                const step_time = json.body[0].step_time;

                let data = [], labels = [];

                json.body[0].value.map(value => {
                    let label = moment.unix(beg_time).format('HH:mm');
                    labels = [...labels, label];
                    data = [...data, value[0]];
                    beg_time = beg_time + step_time;
                });
                dispatch(successRainMeasure(labels, data))
            })
            .catch(error => {
                error.json().then(errorMessage => {
                    dispatch(failureNRainMeasure(errorMessage))
                })
            });
    }
};


export const MEASURE_INDOOR_REQUEST = '@@netatmo/MEASURE_INDOOR_REQUEST';
export const MEASURE_INDOOR_SUCCESS = '@@netatmo/MEASURE_INDOOR_SUCCESS';
export const MEASURE_INDOOR_FAILURE = '@@netatmo/MEASURE_INDOOR_FAILURE';

export const requestIndoorMeasure = () => {
    return {
        type: MEASURE_INDOOR_REQUEST
    }
};

export const successIndoorMeasure = (labels, data) => {
    return {
        type: MEASURE_INDOOR_SUCCESS,
        data: data,
        labels: labels,
        receivedAt: Date.now()
    }
};

export const failureIndooMeasure = (error) => {
    return {
        type: MEASURE_INDOOR_FAILURE,
        error: error
    }
};

export const fetchIndoorMeasure = (device, module, type) => {
    return (dispatch, getState) => {
        dispatch(requestIndoorMeasure());

        const date_begin = moment().subtract(12, 'hours').unix();
        const date_end = moment().unix();

        return fetch(`${NETATMO_API_ROOT_URL}api/getmeasure?access_token=${getState().netatmo.access_token}&device_id=${device}&module_id=${module}&scale=30min&type=${type}&date_begin=${date_begin}&date_end=${date_end}&optimize=true`)
            .then(response => {
                if (!response.ok) throw response;
                return response.json()
            })
            .then(json => {
                let beg_time = json.body[0].beg_time;
                const step_time = json.body[0].step_time;

                let data = [], labels = [];

                json.body[0].value.map(value => {
                    let label = moment.unix(beg_time).format('HH:mm');
                    labels = [...labels, label];
                    data = [...data, value[0]];
                    beg_time = beg_time + step_time;
                });
                dispatch(successIndoorMeasure(labels, data))
            })
            .catch(error => {
                error.json().then(errorMessage => {
                    dispatch(failureIndooMeasure(errorMessage))
                })
            });
    }
};