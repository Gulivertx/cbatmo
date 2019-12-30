import {INetatmoUserInformation} from "../../models/NetatmoUserInformation";

export enum ApplicationActionTypes {
    APP_CONFIGURED = '@@application/APP_CONFIGURED',
    USER_INFO = '@@application/USER_INFO'
}

export interface IApplicationInfoState {
    readonly name: string
    readonly description: string
    readonly version: string
    readonly author: string
}

// The complete state for the store
export interface IApplicationState {
    readonly isConfigured: boolean
    readonly info: IApplicationInfoState
    readonly user: INetatmoUserInformation
    readonly loading: boolean
}
