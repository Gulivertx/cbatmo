import moment from "moment";

import DarkskyData from '../../DTO/DarkskyData';

export const REQUEST = '@@darksky/REQUEST';
export const SUCCESS = '@@darksky/SUCCESS';
export const FAILURE = '@@darksky/FAILURE';
export const DATA_UP_TO_DATE = '@@darksky/DATA_UP_TO_DATE';

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

export const updateToDateData = () => {
    return {
        type: DATA_UP_TO_DATE
    }
};

export const fetchDarksky = () => {
    return (dispatch, getState) => {
        dispatch(requestData());

        if (getState().darksky.updated_at === null || getState().darksky.updated_at !== null && moment(moment()).diff(getState().darksky.updated_at, 'minute') >= 10) {
            console.log('Update Dark sky:', moment(moment()).diff(getState().darksky.updated_at, 'minute'));

            // Take latitude and longitude from Netatmo station
            const lat = getState().netatmo.station_data.place.latitude;
            const lng = getState().netatmo.station_data.place.longitude;
            const locale = getState().application.locale;

            return fetch(`/darksky/${lat}/${lng}/${locale}/si`)
                .then(response => {
                    if (!response.ok) throw response;
                    return response.json()
                })
                .then(json => {
                    const data = new DarkskyData(json);
                    dispatch(successData(data))
                })
                .catch(error => {
                    error.json().then(errorMessage => {
                        dispatch(failureData(errorMessage))
                    })
                });
        } else {
            console.log('Dark sky data is up to date', moment(getState().darksky.updated_at).diff(moment(), 'minute'));
            dispatch(updateToDateData())
        }
    }
};
