import {IDarkskyData} from "../../models/DarkskyData";

export enum DarkskyActionTypes {
    REQUEST = '@@darksky/REQUEST',
    SUCCESS = '@@darksky/SUCCESS',
    FAILURE = '@@darksky/FAILURE'
}

// The complete state for the store
export interface IDarkskyState {
    readonly loading: boolean
    readonly first_fetch: boolean
    readonly data: IDarkskyData|undefined
    readonly updated_at: number
    readonly errors: any|undefined
}
