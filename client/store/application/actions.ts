import { ApplicationActionTypes, IUserState } from './types'

/** Application actions **/
export const appConfigured = (value: boolean) => {
    return {
        type: ApplicationActionTypes.APP_CONFIGURED,
        payload: value
    }
};

export const setUserInfo = (user: IUserState) => {
    return {
        type: ApplicationActionTypes.USER_INFO,
        payload: user
    }
};
