import {ApplicationActionTypes, Orientation} from './types'
import {IUserData} from "../../apis/netatmo/models/UserData";

/** Application actions **/
export const setIsStarting = (value: boolean) => {
    return {
        type: ApplicationActionTypes.SET_IS_STARTING,
        payload: value
    }
};

export const setUserInfo = (user: IUserData) => {
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
