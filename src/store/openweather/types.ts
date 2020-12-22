import {IOpenWeatherData} from "../../models/OpenWeatherData";

export enum OpenWeatherActionTypes {
    REQUEST = '@@openweather/REQUEST',
    SUCCESS = '@@openweather/SUCCESS',
    FAILURE = '@@openweather/FAILURE'
}

// The complete state for the store
export interface IOpenWeatherState {
    readonly loading: boolean
    readonly first_fetch: boolean
    readonly data: IOpenWeatherData|undefined
    readonly updated_at: number
    readonly errors: any|undefined
}
