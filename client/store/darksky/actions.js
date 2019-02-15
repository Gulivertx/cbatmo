import moment from "moment";

import DarkskyData from '../../DTO/DarkskyData';

export const REQUEST = '@@darksky/REQUEST';
export const SUCCESS = '@@darksky/SUCCESS';
export const FAILURE = '@@darksky/FAILURE';

export const requestData = () => {
    return {
        type: REQUEST
    }
};

export const successData = (json) => {
    return {
        type: SUCCESS,
        data: json,
        receivedAt: Date.now()
    }
};

export const failureData = (error) => {
    return {
        type: FAILURE,
        error: error
    }
};

export const fetchDarksky = () => {
    return (dispatch, getState) => {
        if (getState().darksky.updated_at === null || getState().darksky.updated_at !== null && moment(moment()).diff(getState().darksky.updated_at, 'minute') >= 10) {
            dispatch(requestData());

            // Take latitude and longitude from Netatmo station
            const lat = getState().netatmo.station_data.place.latitude;
            const lng = getState().netatmo.station_data.place.longitude;
            const locale = getState().application.user.lang;
            const unit = getState().application.user.unit;

            return fetch(`/darksky/${lat}/${lng}/${locale}/${unit}`)
                .then(response => {
                    if (!response.ok) throw response;
                    return response.json()
                })
                .then(json => {
                    const data = new DarkskyData(json);
                    dispatch(successData(data))
                })
                .catch(error => {
                    console.error(error)
                    error.json().then(errorMessage => {
                        dispatch(failureData(errorMessage))
                    })
                });
        }
    }
};
