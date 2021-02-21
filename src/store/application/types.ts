import UserData from "../../apis/netatmo/models/UserData";
import DevicesName = Cbatmo.DevicesName;

export enum ApplicationActionTypes {
    SET_IS_STARTING = '@@APP/SET_IS_STARTING',
    USER_INFO = '@@APP/USER_INFO',
    DEVICE_ORIENTATION = '@@APP/DEVICE_ORIENTATION',
    SET_DEVICES_NAME = '@@APP/SET_DEVICES_NAME'
}

export type Orientation = 'portrait' | 'landscape';

export interface IApplicationInfoState {
    readonly name: string
    readonly description: string
    readonly version: string
    readonly author: string
}

// The complete state for the store
export interface IApplicationState {
    readonly phone?: string
    readonly tablet?: string
    readonly mobile?: string
    readonly orientation?: Orientation
    readonly isConfigured: boolean
    readonly isStarting: boolean
    readonly info: IApplicationInfoState
    readonly user: UserData|undefined
    readonly netatmo_devices: DevicesName[]
}
