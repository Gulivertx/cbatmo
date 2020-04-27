import { Action } from 'redux'
import { ApplicationState } from '../index'
import { ThunkAction } from 'redux-thunk'
import moment from "moment";
import { OpenWeatherActionTypes } from "./types";
import OpenWeatherData from '../../models/OpenWeatherData';

export const requestData = () => {
    return {
        type: OpenWeatherActionTypes.REQUEST
    }
};

export const successData = (json: any) => {
    return {
        type: OpenWeatherActionTypes.SUCCESS,
        payload: json,
        receivedAt: Date.now()
    }
};

export const failureData = (error: any) => {
    return {
        type: OpenWeatherActionTypes.FAILURE,
        error: error
    }
};

export const fetchOpenWeather = (): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch, getState) => {
        if (getState().openweather.updated_at === null || getState().openweather.updated_at !== null && moment(moment()).diff(getState().openweather.updated_at, 'minute') >= 10) {
            dispatch(requestData());

            // Take latitude and longitude from Netatmo station
            const lat = getState().netatmo.station_data?.place.latitude;
            const lng = getState().netatmo.station_data?.place.longitude;
            const locale = getState().application.user.lang;
            const unit = getState().application.user.unit;

            return fetch(`/openweather/${lat}/${lng}/${locale}/${unit}`)
                .then(response => {
                    if (!response.ok) throw response;
                    return response.json()
                })
                .then(json => {
                    const data = new OpenWeatherData(json);
                    dispatch(successData(data))
                })
                .catch(error => {
                    console.error(error)
                    error.json().then((errorMessage: any) => {
                        dispatch(failureData(errorMessage))
                    })
                });
        } else {
            console.debug('No new OpenWeather data to fetch')
        }
    }
};
