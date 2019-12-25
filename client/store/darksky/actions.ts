import { Action } from 'redux'
import { ApplicationState } from '../index'
import { ThunkAction } from 'redux-thunk'
import moment from "moment";
import { DarkskyActionTypes } from "./types";
import DarkskyData from '../../models/DarkskyData';

export const requestData = () => {
    return {
        type: DarkskyActionTypes.REQUEST
    }
};

// Todo types
export const successData = (json: any) => {
    return {
        type: DarkskyActionTypes.SUCCESS,
        payload: json,
        receivedAt: Date.now()
    }
};

// Todo types
export const failureData = (error: any) => {
    return {
        type: DarkskyActionTypes.FAILURE,
        error: error
    }
};

export const fetchDarksky = (): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch, getState) => {
        if (getState().darksky.updated_at === null || getState().darksky.updated_at !== null && moment(moment()).diff(getState().darksky.updated_at, 'minute') >= 10) {
            dispatch(requestData());

            // Take latitude and longitude from Netatmo station
            const lat = getState().netatmo.station_data?.place.latitude;
            const lng = getState().netatmo.station_data?.place.longitude;
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
                    error.json().then((errorMessage: any) => {
                        dispatch(failureData(errorMessage))
                    })
                });
        } else {
            console.debug('No new Darksky data to fetch')
        }
    }
};
