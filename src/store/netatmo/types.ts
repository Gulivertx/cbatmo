import StationData from "../../apis/netatmo/models/StationData";
import {measure_timelapse, type} from "../../apis/netatmo/types";

export enum NetatmoActionTypes {
    AUTH_REQUEST = '@@NETATMO/AUTH_REQUEST',
    AUTH_SUCCESS = '@@NETATMO/AUTH_SUCCESS',
    AUTH_FAILURE = '@@NETATMO/AUTH_FAILURE',

    REFRESH_TOKEN_REQUEST = '@@NETATMO/REFRESH_TOKEN_REQUEST',
    REFRESH_TOKEN_SUCCESS = '@@NETATMO/REFRESH_TOKEN_SUCCESS',
    REFRESH_TOKEN_FAILURE = '@@NETATMO/REFRESH_TOKEN_FAILURE',

    STATION_DATA_REQUEST = '@@NETATMO/STATION_DATA_REQUEST',
    STATION_DATA_SUCCESS = '@@NETATMO/STATION_DATA_SUCCESS',
    STATION_DATA_FAILURE = '@@NETATMO/STATION_DATA_FAILURE',

    MEASURE_REQUEST = '@@NETATMO/MEASURE_REQUEST',
    MEASURE_SUCCESS = '@@NETATMO/MEASURE_SUCCESS',
    MEASURE_FAILURE = '@@NETATMO/MEASURE_FAILURE',

    MEASURE_RAIN_REQUEST = '@@NETATMO/MEASURE_RAIN_REQUEST',
    MEASURE_RAIN_SUCCESS = '@@NETATMO/MEASURE_RAIN_SUCCESS',
    MEASURE_RAIN_FAILURE = '@@NETATMO/MEASURE_RAIN_FAILURE',

    MEASURES_REQUEST = '@@NETATMO/MEASURES_REQUEST',
    MEASURES_SUCCESS = '@@NETATMO/MEASURES_SUCCESS',
    MEASURES_FAILURE = '@@NETATMO/MEASURES_FAILURE',

    CHANGE_SELECTED_TYPE = '@@NETATMO/CHANGE_SELECTED_TYPE',

    CHANGE_SELECTED_INSIDE_MODULE = '@@NETATMO/CHANGE_SELECTED_INSIDE_MODULE',
    CHANGE_SELECTED_DEVICE = '@@NETATMO/CHANGE_SELECTED_DEVICE'
}

// The complete state for the store
export interface INetatmoState {
    readonly loading_auth: boolean
    readonly loading_refresh_token: boolean
    readonly auth_errors: any

    readonly loading_station_data: boolean
    readonly station_data_errors: any
    readonly station_data: StationData|undefined

    readonly selected_indoor_module: 0|1|2
    readonly selected_device: string|undefined

    readonly loading_measure: boolean
    readonly measure_data: []
    readonly measure_errors: any
    readonly selected_module: string
    readonly selected_types: type[]
    readonly selected_timelapse: Cbatmo.graph_timelapse

    readonly loading_rain_measure: boolean
    readonly measure_rain_data: []
    readonly measure_rain_errors: any|undefined

    readonly loading_indoor1_measure: boolean
    readonly measure_indoor1_data: []
    readonly measure_indoor1_errors: any|undefined
    readonly selected_indoor1_type: type

    readonly loading_indoor2_measure: boolean
    readonly measure_indoor2_data: []
    readonly measure_indoor2_errors: any|undefined
    readonly selected_indoor2_type: type

    readonly loading_indoor3_measure: boolean
    readonly measure_indoor3_data: []
    readonly measure_indoor3_errors: any|undefined
    readonly selected_indoor3_type: type

    readonly loading_outdoor_measure: boolean
    readonly measure_outdoor_data: []
    readonly measure_outdoor_errors: any|undefined
    readonly selected_outdoor_type: type

    readonly loading_station_measure: boolean
    readonly measure_station_data: []
    readonly measure_station_errors: any|undefined
    readonly selected_station_type: type
}
