import {module, type, trend, wind_unit, unit, pressure_unit} from "../types";

export interface ApiStationDataResponse {
    readonly body: {
        readonly devices: Device[]
        readonly user: User
    }
    readonly status: string
    readonly time_exec: number
    readonly time_server: number
}

interface Device extends BaseModule{
    readonly co2_calibrating: boolean
    readonly date_setup: number
    readonly home_id: string
    readonly home_name: string
    readonly last_status_store: number
    readonly last_upgrade: number
    readonly Place: Place
    readonly wifi_status: number
    readonly modules: Module[]
}

interface BaseModule {
    readonly _id: string
    readonly type: module
    readonly module_name: string
    readonly reachable: true
    readonly firmware: number
    readonly last_setup: number
    readonly data_type: type[]
    readonly dashboard_data: DashboardData
}

interface Module extends BaseModule {
    readonly battery_percent: number
    readonly battery_vp: number
    readonly last_message: number
    readonly last_seen: number
    readonly rf_status: number
}

interface DashboardData {
    readonly time_utc: number
    readonly AbsolutePressure?: number
    readonly CO2?: number
    readonly Humidity?: number
    readonly Noise?: number
    readonly Temperature?: number
    readonly date_max_temp?: number
    readonly date_min_temp?: number
    readonly max_temp?: number
    readonly min_temp?: number
    readonly pressure_trend?: trend
    readonly temp_trend?: trend
    readonly Rain?: number
    readonly sum_rain_1?: number
    readonly sum_rain_24?: number
    readonly GustAngle?: number
    readonly WindAngle?: number
    readonly WindStrength?: number
    readonly date_max_wind_str?: number
    readonly max_wind_angle?: number
    readonly max_wind_str?: number
}

interface Place {
    readonly altitude: number
    readonly city: number
    readonly country: number
    readonly location: [number, number]
    readonly timezone: number
}

interface User {
    readonly administrative: Administrative
    readonly mail: string
}

interface Administrative {
    readonly feel_like_algo: number
    readonly lang: string
    readonly reg_locale: string
    readonly pressureunit: pressure_unit
    readonly unit: unit
    readonly windunit: wind_unit
}
