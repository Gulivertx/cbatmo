import {measure_timelapse, measure_type} from "../types";

export interface ApiMeasureQuery {
    readonly device_id: string
    readonly module_id: string
    readonly scale: measure_timelapse
    readonly type: measure_type
    readonly date_begin: number // Default is null
    readonly date_end: number // Default is null
    readonly limit?: number // Default is 1024
    readonly optimize?: boolean // Default is true
    readonly real_time?: boolean // Default is false. If scale different than max, timestamps are by default offset + scale/2. To get exact timestamps, use true.
}

export interface ApiMeasureResponse {
    readonly body: [] // Todo type
    readonly status: string
    readonly time_exec: number
    readonly time_server: number
}
