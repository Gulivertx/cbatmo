import {INetatmoNAMain} from "../../models/NetatmoNAMain";
import {Types} from "../../models/NetatmoChartsData";

export enum NetatmoActionTypes {
    AUTH_REQUEST = '@@netatmo/AUTH_REQUEST',
    AUTH_SUCCESS = '@@netatmo/AUTH_SUCCESS',
    AUTH_FAILURE = '@@netatmo/AUTH_FAILURE',

    REFRESH_TOKEN_REQUEST = '@@netatmo/REFRESH_TOKEN_REQUEST',
    REFRESH_TOKEN_SUCCESS = '@@netatmo/REFRESH_TOKEN_SUCCESS',
    REFRESH_TOKEN_FAILURE = '@@netatmo/REFRESH_TOKEN_FAILURE',

    STATION_DATA_REQUEST = '@@netatmo/STATION_DATA_REQUEST',
    STATION_DATA_SUCCESS = '@@netatmo/STATION_DATA_SUCCESS',
    STATION_DATA_FAILURE = '@@netatmo/STATION_DATA_FAILURE',

    MEASURE_REQUEST = '@@netatmo/MEASURE_REQUEST',
    MEASURE_SUCCESS = '@@netatmo/MEASURE_SUCCESS',
    MEASURE_FAILURE = '@@netatmo/MEASURE_FAILURE',

    MEASURE_RAIN_REQUEST = '@@netatmo/MEASURE_RAIN_REQUEST',
    MEASURE_RAIN_SUCCESS = '@@netatmo/MEASURE_RAIN_SUCCESS',
    MEASURE_RAIN_FAILURE = '@@netatmo/MEASURE_RAIN_FAILURE',
}

// The complete state for the store
export interface INetatmoState {
    readonly client_id: string
    readonly client_secret: string
    readonly username: string
    readonly password: string

    readonly loading_auth: boolean
    readonly loading_refresh_token: boolean
    readonly auth_errors: any|undefined
    readonly access_token: string|null
    readonly refresh_token: string|null
    readonly access_token_expire_in: number

    readonly loading_station_data: boolean
    readonly station_data_last_updated: number
    readonly station_data_errors: any
    readonly station_data: INetatmoNAMain|undefined
    readonly first_fetch: boolean

    readonly loading_measure: boolean
    readonly measure_data: []
    readonly measure_errors: any|undefined
    readonly selected_module: string
    readonly selected_types: Types[]
    readonly selected_timelapse: '12h'|'1d'|'1m'

    readonly loading_rain_measure: boolean
    readonly measure_rain_data: []
    readonly measure_rain_errors: any|undefined
}
