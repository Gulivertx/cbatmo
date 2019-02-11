import moment from 'moment';
import {changeAppIsConfigured, changeAppSettingsStep} from "./index";
import api from '../../config/api.json';

const NETATMO_API_ROOT_URL = api.netatmo.api_url;
const NETATMO_API_CLIENT_ID = api.netatmo.client_id;
const NETATMO_API_CLIENT_SECRET = api.netatmo.client_secret;


export const NETATMO_AUTH_REQUEST = 'NETATMO_AUTH_REQUEST';
export const NETATMO_AUTH_SUCCESS = 'NETATMO_AUTH_SUCCESS';
export const NETATMO_AUTH_FAILURE = 'NETATMO_AUTH_FAILURE';

export const requestNetatmoAuth = () => {
    return {
        type: NETATMO_AUTH_REQUEST
    }
};

export const successNetatmoAuth = (json) => {
    return {
        type: NETATMO_AUTH_SUCCESS,
        data: json,
        receivedAt: Date.now()
    }
};

export const failureNetatmoAuth = (error) => {
    return {
        type: NETATMO_AUTH_FAILURE,
        error: error
    }
};

export const fetchNetatmoAuth = (email, password) => {
    return (dispatch) => {
        dispatch(requestNetatmoAuth());

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
                if (json.access_token) {
                    window.localStorage.setItem('NetatmoRefreshToken', json.refresh_token);
                    window.localStorage.setItem('NetatmoExpireIn', moment().unix() + json.expire_in);
                    window.localStorage.setItem('appIsConfigured', true);
                    dispatch(changeRefreshToken(json.refresh_token));
                    dispatch(changeExpireIn(moment().unix() + json.expire_in));
                    dispatch(changeAppIsConfigured(true));
                }
                dispatch(successNetatmoAuth(json));
            })
            .catch(error => {
                error.json().then(errorMessage => {
                    dispatch(failureNetatmoAuth(errorMessage))
                })
            });

    }
};


export const NETATMO_REFRESH_TOKEN_REQUEST = 'NETATMO_REFRESH_TOKEN_REQUEST';
export const NETATMO_REFRESH_TOKEN_SUCCESS = 'NETATMO_REFRESH_TOKEN_SUCCESS';
export const NETATMO_REFRESH_TOKEN_FAILURE = 'NETATMO_REFRESH_TOKEN_FAILURE';

export const requestNetatmoRefreshToken = () => {
    return {
        type: NETATMO_REFRESH_TOKEN_REQUEST
    }
};

export const successNetatmoRefreshToken = (json) => {
    return {
        type: NETATMO_REFRESH_TOKEN_SUCCESS,
        data: json,
        receivedAt: Date.now()
    }
};

export const failureNetatmoRefreshToken = (error) => {
    return {
        type: NETATMO_REFRESH_TOKEN_FAILURE,
        error: error
    }
};

export const fetchNetatmoRefreshToken = () => {
    return (dispatch, getState) => {
        dispatch(requestNetatmoRefreshToken());

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
                if (json.access_token) {
                    window.localStorage.setItem('NetatmoAccessToken', json.access_token);
                    window.localStorage.setItem('NetatmoRefreshToken', json.refresh_token);
                    window.localStorage.setItem('NetatmoExpireIn', moment().unix() + json.expire_in);
                    dispatch(changeAccessToken(json.access_token));
                    dispatch(changeRefreshToken(json.refresh_token));
                    dispatch(changeExpireIn(moment().unix() + json.expire_in));
                }
                dispatch(successNetatmoRefreshToken(json));
            })
            .catch(error => {
                error.json().then(errorMessage => {
                    dispatch(failureNetatmoRefreshToken(errorMessage))
                })
            });
    }
};

export const NETATMO_CHANGE_ACCESS_TOKEN = 'NETATMO_CHANGE_ACCESS_TOKEN';
export const NETATMO_CHANGE_REFRESH_TOKEN = 'NETATMO_CHANGE_REFRESH_TOKEN';
export const NETATMO_CHANGE_EXPIRE_IN = 'NETATMO_CHANGE_EXPIRE_IN';

export const changeAccessToken = (access_token) => {
    return {
        type: NETATMO_CHANGE_ACCESS_TOKEN,
        value: access_token
    }
};

export const changeRefreshToken = (refresh_token) => {
    return {
        type: NETATMO_CHANGE_REFRESH_TOKEN,
        value: refresh_token
    }
};

export const changeExpireIn = (expire_in) => {
    return {
        type: NETATMO_CHANGE_EXPIRE_IN,
        value: expire_in
    }
};


export const NETATMO_STATION_DATA_REQUEST = 'NETATMO_STATION_DATA_REQUEST';
export const NETATMO_STATION_DATA_SUCCESS = 'NETATMO_STATION_DATA_SUCCESS';
export const NETATMO_STATION_DATA_FAILURE = 'NETATMO_STATION_DATA_FAILURE';
export const NETATMO_STATION_DATA_UPTODATE = 'NETATMO_STATION_DATA_UPTODATE';
export const NETATMO_LOCALE = 'NETATMO_LOCALE';
export const NETATMO_FIRST_FETCH = 'NETATMO_FIRST_FETCH';

export const requestNetatmoStation = () => {
    return {
        type: NETATMO_STATION_DATA_REQUEST
    }
};

export const successNetatmoStation = (json) => {
    return {
        type: NETATMO_STATION_DATA_SUCCESS,
        data: json.body.devices[0],
        user: json.body.user,
        receivedAt: Date.now()
    }
};

export const failureNetatmoStation = (error) => {
    return {
        type: NETATMO_STATION_DATA_FAILURE,
        error: error
    }
};

export const updateToDateNetatmoStation = () => {
    return {
        type: NETATMO_STATION_DATA_UPTODATE
    }
};

export const updateNetatmoLocale = (locale) => {
    return {
        type: NETATMO_LOCALE,
        locale: locale
    }
};

export const updateFirstFetch = () => {
    return {
        type: NETATMO_FIRST_FETCH,
    }
};

export const fetchNetatmoStation = () => {
    return (dispatch, getState) => {
        dispatch(requestNetatmoStation());
        if (!getState().netatmo.accessToken || moment.unix(Number(getState().netatmo.expireIn)).diff(moment(), 'minute') < 10) {
            dispatch(fetchNetatmoRefreshToken()).then(() => {
                return fetch(`${NETATMO_API_ROOT_URL}api/getstationsdata?access_token=${getState().netatmo.accessToken}`)
                    .then(response => {
                        if (!response.ok) throw response;
                        return response.json()
                    })
                    .then(json => {
                        console.log('Station data:', json);
                        // Set locale only if this is the first netatmo fetch
                        // Wait 500 milliseconds before to continu to be sure that the value is set in redux store
                        if (getState().netatmo.isFirstFetch) {
                            dispatch(updateNetatmoLocale(json.body.user.administrative.lang));
                            setTimeout(() => {
                                dispatch(successNetatmoStation(json))
                            }, 500);
                            setTimeout(() => {
                                dispatch(updateFirstFetch())
                            }, 800); // To show UI after 1 second
                        } else {
                            dispatch(successNetatmoStation(json))
                        }
                    })
                    .catch(error => {
                        error.json().then(errorMessage => {
                            dispatch(failureNetatmoStation(errorMessage))
                        })
                    });
            });
        } else {
            // Fetch new data only if last data stored is bigger than 10 minutes
            if (moment().diff(moment.unix(Number(getState().netatmo.stationData.last_status_store)), 'minute') > 10) {
                return fetch(`${NETATMO_API_ROOT_URL}api/getstationsdata?access_token=${getState().netatmo.accessToken}`)
                    .then(response => {
                        if (!response.ok) throw response;
                        return response.json()
                    })
                    .then(json => {
                        console.log('Station data:', json)
                        dispatch(successNetatmoStation(json))
                    })
                    .catch(error => {
                        error.json().then(errorMessage => {
                            dispatch(failureNetatmoStation(errorMessage))
                        })
                    });
            } else {
                dispatch(updateToDateNetatmoStation())
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