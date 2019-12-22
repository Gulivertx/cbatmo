export enum DarkskyActionTypes {
    REQUEST = '@@darksky/REQUEST',
    SUCCESS = '@@darksky/SUCCESS',
    FAILURE = '@@darksky/FAILURE'
}

// The complete state for the store
export interface IDarkskyState {
    readonly loading: boolean
    readonly first_fetch: boolean
    readonly data: any|null
    readonly updated_at: number
    readonly errors: any|undefined
}
