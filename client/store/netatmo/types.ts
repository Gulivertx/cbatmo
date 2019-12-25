import {INetatmoNAMain} from "../../models/NetatmoNAMain";
import {IDarkskyData} from "../../models/DarkskyData";

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

    MEASURE_MAIN_REQUEST = '@@netatmo/MEASURE_MAIN_REQUEST',
    MEASURE_MAIN_SUCCESS = '@@netatmo/MEASURE_MAIN_SUCCESS',
    MEASURE_MAIN_FAILURE = '@@netatmo/MEASURE_MAIN_FAILURE',

    MEASURE_OUTDOOR_REQUEST = '@@netatmo/MEASURE_OUTDOOR_REQUEST',
    MEASURE_OUTDOOR_SUCCESS = '@@netatmo/MEASURE_OUTDOOR_SUCCESS',
    MEASURE_OUTDOOR_FAILURE = '@@netatmo/MEASURE_OUTDOOR_FAILURE',

    MEASURE_WIND_REQUEST = '@@netatmo/MEASURE_WIND_REQUEST',
    MEASURE_WIND_SUCCESS = '@@netatmo/MEASURE_WIND_SUCCESS',
    MEASURE_WIND_FAILURE = '@@netatmo/MEASURE_WIND_FAILURE',

    MEASURE_RAIN_REQUEST = '@@netatmo/MEASURE_RAIN_REQUEST',
    MEASURE_RAIN_SUCCESS = '@@netatmo/MEASURE_RAIN_SUCCESS',
    MEASURE_RAIN_FAILURE = '@@netatmo/MEASURE_RAIN_FAILURE',

    MEASURE_INDOOR_REQUEST = '@@netatmo/MEASURE_INDOOR_REQUEST',
    MEASURE_INDOOR_SUCCESS = '@@netatmo/MEASURE_INDOOR_SUCCESS',
    MEASURE_INDOOR_FAILURE = '@@netatmo/MEASURE_INDOOR_FAILURE',
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
    readonly station_data_errors: any|undefined
    readonly station_data: INetatmoNAMain|undefined
    readonly first_fetch: boolean

    readonly loading_main: boolean
    readonly measure_main_data: []
    readonly measure_main_errors: any|undefined

    readonly loading_outdoor: boolean
    readonly measure_outdoor_data: []
    readonly measure_outdoor_errors: any|undefined

    readonly loading_wind: boolean
    readonly measure_wind_data: []
    readonly measure_wind_errors: any|undefined

    readonly loading_rain: boolean
    readonly measure_rain_data: []
    readonly measure_rain_errors: any|undefined

    readonly loading_indoor: boolean
    readonly measure_indoor_data: []
    readonly measure_indoor_errors: any|undefined
}
