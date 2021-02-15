import {INetatmoNAMain} from "../../models/NetatmoNAMain";

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

    MEASURES_REQUEST = '@@netatmo/MEASURES_REQUEST',
    MEASURES_SUCCESS = '@@netatmo/MEASURES_SUCCESS',
    MEASURES_FAILURE = '@@netatmo/MEASURES_FAILURE',

    CHANGE_SELECTED_TYPE = '@@netatmo/CHANGE_SELECTED_TYPE',

    CHANGE_SELECTED_INSIDE_MODULE = '@@netatmo/CHANGE_SELECTED_INSIDE_MODULE'
}

// The complete state for the store
export interface INetatmoState {
    readonly loading_auth: boolean
    readonly loading_refresh_token: boolean
    readonly auth_errors: any|undefined

    readonly loading_station_data: boolean
    readonly station_data_last_updated: number
    readonly station_data_errors: any
    readonly station_data: INetatmoNAMain|undefined
    readonly first_fetch: boolean

    readonly selected_indoor_module: 0|1|2

    readonly loading_measure: boolean
    readonly measure_data: []
    readonly measure_errors: any|undefined
    readonly selected_module: string
    readonly selected_types: Netatmo.data_type[]
    readonly selected_timelapse: Netatmo.timelapse

    readonly loading_rain_measure: boolean
    readonly measure_rain_data: []
    readonly measure_rain_errors: any|undefined

    readonly loading_indoor_measure: boolean
    readonly measure_indoor_data: []
    readonly measure_indoor_errors: any|undefined
    readonly selected_indoor_type: Netatmo.data_type

    readonly loading_indoor_second_measure: boolean
    readonly measure_indoor_second_data: []
    readonly measure_indoor_second_errors: any|undefined
    readonly selected_indoor_second_type: Netatmo.data_type

    readonly loading_indoor_third_measure: boolean
    readonly measure_indoor_third_data: []
    readonly measure_indoor_third_errors: any|undefined
    readonly selected_indoor_third_type: Netatmo.data_type

    readonly loading_outdoor_measure: boolean
    readonly measure_outdoor_data: []
    readonly measure_outdoor_errors: any|undefined
    readonly selected_outdoor_type: Netatmo.data_type

    readonly loading_station_measure: boolean
    readonly measure_station_data: []
    readonly measure_station_errors: any|undefined
    readonly selected_station_type: Netatmo.data_type
}
