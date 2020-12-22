import {ApplicationActionTypes, Orientation} from './types'
import {INetatmoUserInformation} from "../../models/NetatmoUserInformation";

/** Application actions **/
export const appConfigured = (value: boolean) => {
    return {
        type: ApplicationActionTypes.APP_CONFIGURED,
        payload: value
    }
};

export const setUserInfo = (user: INetatmoUserInformation) => {
    return {
        type: ApplicationActionTypes.USER_INFO,
        payload: user
    }
};

export const setOrientation = (orientation: Orientation) => {
    return {
        type: ApplicationActionTypes.DEVICE_ORIENTATION,
        payload: orientation
    }
};
