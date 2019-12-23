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

export interface IUserState {
    readonly mail: string
    readonly lang: string
    readonly locale: string
    readonly pressure_unit: string
    readonly unit: string
    readonly windunit: string
}

// The complete state for the store
export interface IApplicationState {
    readonly isConfigured: boolean
    readonly info: IApplicationInfoState
    readonly user: IUserState
    readonly loading: boolean
}
