import {INetatmoUserInformation} from "../../models/NetatmoUserInformation";

export enum ApplicationActionTypes {
    APP_CONFIGURED = '@@application/APP_CONFIGURED',
    USER_INFO = '@@application/USER_INFO',
    DEVICE_ORIENTATION = '@@application/DEVICE_ORIENTATION',
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
    readonly info: IApplicationInfoState
    readonly user: INetatmoUserInformation
    readonly loading: boolean
}
