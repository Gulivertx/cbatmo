import {ApplicationActionTypes, Orientation} from './types'
import UserData from "../../apis/netatmo/models/UserData";
import DevicesName = Cbatmo.DevicesName;

/** Application actions **/
export const setIsStarting = (value: boolean) => {
    return {
        type: ApplicationActionTypes.SET_IS_STARTING,
        payload: value
    }
};

export const setUserInfo = (user: UserData) => {
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

export const setDevicesName = (devices: DevicesName[]) => {
    return {
        type: ApplicationActionTypes.SET_DEVICES_NAME,
        payload: devices
    }
};

