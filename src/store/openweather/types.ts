import {IOpenWeatherData} from "../../models/OpenWeatherData";

export enum OpenWeatherActionTypes {
    REQUEST = '@@WEATHER/REQUEST',
    SUCCESS = '@@WEATHER/SUCCESS',
    FAILURE = '@@WEATHER/FAILURE'
}

// The complete state for the store
export interface IOpenWeatherState {
    readonly loading: boolean
    readonly first_fetch: boolean
    readonly data: IOpenWeatherData|undefined
    readonly updated_at: number
    readonly errors: any|undefined
}
