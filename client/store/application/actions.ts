import { Action } from 'redux'
import { ApplicationState } from '../index'
import { ThunkAction } from 'redux-thunk'
import { ApplicationActionTypes, IApplicationInfoState, IUserState } from './types'

/** Application actions **/
export const appConfigured = (value: boolean) => {
    return {
        type: ApplicationActionTypes.APP_CONFIGURED,
        payload: value
    }
};

/** REQUEST APP INFO **/
export const requestInfo = () => {
    return {
        type: ApplicationActionTypes.INFO_REQUEST
    }
};

export const successInfo = (json: IApplicationInfoState) => {
    return {
        type: ApplicationActionTypes.INFO_SUCCESS,
        payload: json,
        receivedAt: Date.now()
    }
};

// Todo types
export const failureInfo = (error: any) => {
    return {
        type: ApplicationActionTypes.INFO_FAILURE,
        payload: error
    }
};

export const fetchInfo = (): ThunkAction<void, ApplicationState, null, Action<string>> => {
    return (dispatch) => {
        dispatch(requestInfo());

        return fetch('/info')
            .then(response => {
                if (!response.ok) throw response;
                return response.json()
            })
            .then(json => {
                dispatch(successInfo(json))
            })
            .catch(error => {
                // Todo types
                error.json().then((errorMessage: any) => {
                    dispatch(failureInfo(errorMessage))
                })
            });
    }
};

export const setUserInfo = (user: IUserState) => {
    return {
        type: ApplicationActionTypes.USER_INFO,
        payload: user
    }
};
