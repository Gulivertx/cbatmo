import fetch from 'cross-fetch';

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
        const lat = getState().darksky.latitude;
        const lng = getState().darksky.longitude;

        return fetch(`/darksky/${lat}/${lng}/en/si`)
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
