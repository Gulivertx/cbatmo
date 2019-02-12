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


export const NETATMO_MEASURE_NAMAIN_REQUEST = 'NETATMO_MEASURE_NAMAIN_REQUEST';
export const NETATMO_MEASURE_NAMAIN_SUCCESS = 'NETATMO_MEASURE_NAMAIN_SUCCESS';
export const NETATMO_MEASURE_NAMAIN_FAILURE = 'NETATMO_MEASURE_NAMAIN_FAILURE';

export const requestNetatmoNAMainMeasure = () => {
    return {
        type: NETATMO_MEASURE_NAMAIN_REQUEST
    }
};

export const successNetatmoNAMainMeasure = (labels, data) => {
    return {
        type: NETATMO_MEASURE_NAMAIN_SUCCESS,
        data: data,
        labels: labels,
        receivedAt: Date.now()
    }
};

export const failureNetatmoNAMainMeasure = (error) => {
    return {
        type: NETATMO_MEASURE_NAMAIN_FAILURE,
        error: error
    }
};

export const fetchNetatmoNAMainMeasure = (device, module, type) => {
    return (dispatch, getState) => {
        dispatch(requestNetatmoNAMainMeasure());

        const date_begin = moment().subtract(12, 'hours').unix();
        const date_end = moment().unix();

        return fetch(`${NETATMO_API_ROOT_URL}api/getmeasure?access_token=${getState().netatmo.accessToken}&device_id=${device}&module_id=${module}&scale=30min&type=${type}&date_begin=${date_begin}&date_end=${date_end}&optimize=true`)
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
                dispatch(successNetatmoNAMainMeasure(labels, data))
            })
            .catch(error => {
                error.json().then(errorMessage => {
                    dispatch(failureNetatmoNAMainMeasure(errorMessage))
                })
            });
    }
};


export const NETATMO_MEASURE_NAMODULE1_REQUEST = 'NETATMO_MEASURE_NAMODULE1_REQUEST';
export const NETATMO_MEASURE_NAMODULE1_SUCCESS = 'NETATMO_MEASURE_NAMODULE1_SUCCESS';
export const NETATMO_MEASURE_NAMODULE1_FAILURE = 'NETATMO_MEASURE_NAMODULE1_FAILURE';

export const requestNetatmoNAModule1Measure = () => {
    return {
        type: NETATMO_MEASURE_NAMODULE1_REQUEST
    }
};

export const successNetatmoNAModule1Measure = (labels, data) => {
    return {
        type: NETATMO_MEASURE_NAMODULE1_SUCCESS,
        data: data,
        labels: labels,
        receivedAt: Date.now()
    }
};

export const failureNetatmoNAModule1Measure = (error) => {
    return {
        type: NETATMO_MEASURE_NAMODULE1_FAILURE,
        error: error
    }
};

export const fetchNetatmoNAModule1Measure = (device, module, type) => {
    return (dispatch, getState) => {
        dispatch(requestNetatmoNAModule1Measure());

        const date_begin = moment().subtract(12, 'hours').unix();
        const date_end = moment().unix();

        return fetch(`${NETATMO_API_ROOT_URL}api/getmeasure?access_token=${getState().netatmo.accessToken}&device_id=${device}&module_id=${module}&scale=30min&type=${type}&date_begin=${date_begin}&date_end=${date_end}&optimize=true`)
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
                dispatch(successNetatmoNAModule1Measure(labels, data))
            })
            .catch(error => {
                error.json().then(errorMessage => {
                    dispatch(failureNetatmoNAModule1Measure(errorMessage))
                })
            });
    }
};


export const NETATMO_MEASURE_NAMODULE2_REQUEST = 'NETATMO_MEASURE_NAMODULE2_REQUEST';
export const NETATMO_MEASURE_NAMODULE2_SUCCESS = 'NETATMO_MEASURE_NAMODULE2_SUCCESS';
export const NETATMO_MEASURE_NAMODULE2_FAILURE = 'NETATMO_MEASURE_NAMODULE2_FAILURE';

export const requestNetatmoNAModule2Measure = () => {
    return {
        type: NETATMO_MEASURE_NAMODULE2_REQUEST
    }
};

export const successNetatmoNAModule2Measure = (labels, data) => {
    return {
        type: NETATMO_MEASURE_NAMODULE2_SUCCESS,
        data: data,
        labels: labels,
        receivedAt: Date.now()
    }
};

export const failureNetatmoNAModule2Measure = (error) => {
    return {
        type: NETATMO_MEASURE_NAMODULE2_FAILURE,
        error: error
    }
};

export const fetchNetatmoNAModule2Measure = (device, module, type) => {
    return (dispatch, getState) => {
        dispatch(requestNetatmoNAModule2Measure());

        const date_begin = moment().subtract(12, 'hours').unix();
        const date_end = moment().unix();

        return fetch(`${NETATMO_API_ROOT_URL}api/getmeasure?access_token=${getState().netatmo.accessToken}&device_id=${device}&module_id=${module}&scale=30min&type=${type}&date_begin=${date_begin}&date_end=${date_end}&optimize=true`)
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
                dispatch(successNetatmoNAModule2Measure(labels, data))
            })
            .catch(error => {
                error.json().then(errorMessage => {
                    dispatch(failureNetatmoNAModule2Measure(errorMessage))
                })
            });
    }
};


export const NETATMO_MEASURE_NAMODULE3_REQUEST = 'NETATMO_MEASURE_NAMODULE3_REQUEST';
export const NETATMO_MEASURE_NAMODULE3_SUCCESS = 'NETATMO_MEASURE_NAMODULE3_SUCCESS';
export const NETATMO_MEASURE_NAMODULE3_FAILURE = 'NETATMO_MEASURE_NAMODULE3_FAILURE';

export const requestNetatmoNAModule3Measure = () => {
    return {
        type: NETATMO_MEASURE_NAMODULE3_REQUEST
    }
};

export const successNetatmoNAModule3Measure = (labels, data) => {
    return {
        type: NETATMO_MEASURE_NAMODULE3_SUCCESS,
        data: data,
        labels: labels,
        receivedAt: Date.now()
    }
};

export const failureNetatmoNAModule3Measure = (error) => {
    return {
        type: NETATMO_MEASURE_NAMODULE3_FAILURE,
        error: error
    }
};

export const fetchNetatmoNAModule3Measure = (device, module, type) => {
    return (dispatch, getState) => {
        dispatch(requestNetatmoNAModule3Measure());

        const date_begin = moment().subtract(12, 'hours').unix();
        const date_end = moment().unix();

        return fetch(`${NETATMO_API_ROOT_URL}api/getmeasure?access_token=${getState().netatmo.accessToken}&device_id=${device}&module_id=${module}&scale=30min&type=${type}&date_begin=${date_begin}&date_end=${date_end}&optimize=true`)
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
                dispatch(successNetatmoNAModule3Measure(labels, data))
            })
            .catch(error => {
                error.json().then(errorMessage => {
                    dispatch(failureNetatmoNAModule3Measure(errorMessage))
                })
            });
    }
};


export const NETATMO_MEASURE_NAMODULE4_REQUEST = 'NETATMO_MEASURE_NAMODULE4_REQUEST';
export const NETATMO_MEASURE_NAMODULE4_SUCCESS = 'NETATMO_MEASURE_NAMODULE4_SUCCESS';
export const NETATMO_MEASURE_NAMODULE4_FAILURE = 'NETATMO_MEASURE_NAMODULE4_FAILURE';

export const requestNetatmoNAModule4Measure = () => {
    return {
        type: NETATMO_MEASURE_NAMODULE4_REQUEST
    }
};

export const successNetatmoNAModule4Measure = (labels, data) => {
    return {
        type: NETATMO_MEASURE_NAMODULE4_SUCCESS,
        data: data,
        labels: labels,
        receivedAt: Date.now()
    }
};

export const failureNetatmoNAModule4Measure = (error) => {
    return {
        type: NETATMO_MEASURE_NAMODULE4_FAILURE,
        error: error
    }
};

export const fetchNetatmoNAModule4Measure = (device, module, type) => {
    return (dispatch, getState) => {
        dispatch(requestNetatmoNAModule4Measure());

        const date_begin = moment().subtract(12, 'hours').unix();
        const date_end = moment().unix();

        return fetch(`${NETATMO_API_ROOT_URL}api/getmeasure?access_token=${getState().netatmo.accessToken}&device_id=${device}&module_id=${module}&scale=30min&type=${type}&date_begin=${date_begin}&date_end=${date_end}&optimize=true`)
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
                dispatch(successNetatmoNAModule4Measure(labels, data))
            })
            .catch(error => {
                error.json().then(errorMessage => {
                    dispatch(failureNetatmoNAModule4Measure(errorMessage))
                })
            });
    }
};