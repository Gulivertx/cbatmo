import {IUserData} from "../../apis/netatmo/models/UserData";

export enum ApplicationActionTypes {
    SET_IS_STARTING = '@@APP/SET_IS_STARTING',
    USER_INFO = '@@APP/USER_INFO',
    DEVICE_ORIENTATION = '@@APP/DEVICE_ORIENTATION',
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
    readonly user: IUserData
}
