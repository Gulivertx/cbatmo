import moment from "moment";

export const DARKSKY_REQUEST = 'DARKSKY_REQUEST';
export const DARKSKY_SUCCESS = 'DARKSKY_SUCCESS';
export const DARKSKY_FAILURE = 'DARKSKY_FAILURE';
export const DARKSKY_DATA_UP_TO_DATE = 'DARKSKY_DATA_UP_TO_DATE';

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

export const updateToDateDarkSkyData = () => {
    return {
        type: DARKSKY_DATA_UP_TO_DATE
    }
};

export const fetchDarksky = () => {
    return (dispatch, getState) => {
        dispatch(requestDarksky());

        if (getState().darksky.lastUpdated === null || getState().darksky.lastUpdated !== null && moment(moment()).diff(getState().darksky.lastUpdated, 'minute') >= 10 ) {
            console.log('Update Dark sky:', moment(moment()).diff(getState().darksky.lastUpdated, 'minute'));

            // Take latitude and longitude from Netatmo station
            const lat = getState().netatmo.stationData.place.location[1];
            const lng = getState().netatmo.stationData.place.location[0];

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
        } else {
            console.log('Dark sky data is up to date', moment(getState().darksky.lastUpdated).diff(moment(), 'minute'));
            dispatch(updateToDateDarkSkyData())
        }
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
