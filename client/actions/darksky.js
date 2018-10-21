import fetch from 'cross-fetch';
import api from '../../config/api.json';

const DARKSKY_API_ROOT_URL = api.dark_sky.api_url;
const DARKSKY_API_SECRET_ID = api.dark_sky.secret_key;
const CORS_ANYWHERE = api.dark_sky.cors_anywhere;

export const DARKSKY_REQUEST = 'DARKSKY_REQUEST';
export const DARKSKY_SUCCESS = 'DARKSKY_SUCCESS';
export const DARKSKY_FAILURE = 'DARKSKY_FAILURE';

export const requestDarksky = () => {
    return {
        type: DARKSKY_REQUEST
    }
};

export const successDarksky = (json) => {
    return {
        type: DARKSKY_SUCCESS,
        data: json,
        receivedAt: Date.now()
    }
};

export const failureDarksky = (error) => {
    return {
        type: DARKSKY_FAILURE,
        error: error
    }
};

export const fetchDarksky = () => {
    return (dispatch, getState) => {
        dispatch(requestDarksky());

        // TODO take lang and units from config
        // TODO remove Cors Anywhere
        const lat = getState().darksky.latitude;
        const lng = getState().darksky.longitude;

        return fetch(`${CORS_ANYWHERE}${DARKSKY_API_ROOT_URL}${DARKSKY_API_SECRET_ID}/${lat},${lng}?exclude=hourly,flags&lang=en&units=si`)
            .then(
                response => response.json(),
                error => dispatch(failureDarksky(error))
            )
            .then(
                json => {
                    dispatch(successDarksky(json))
                }
            )
    }
};

export const SET_DARKSKY_LAT_LNG = 'SET_DARKSKY_LAT_LNG';

export const setLatLng = (lat, lng) => {
    window.localStorage.setItem('DarkskyLat', lat);
    window.localStorage.setItem('DarkskyLng', lng);

    return {
        type: SET_DARKSKY_LAT_LNG,
        lat: lat,
        lng: lng
    }
};
