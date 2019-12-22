import { combineReducers } from 'redux';
import { applicationReducer } from "./application/reducer";
import { darkskyReducer } from "./darksky/reducer";
import { netatmoReducer } from "./netatmo/reducer";
import { IApplicationState } from "./application/types";
import { IDarkskyState } from "./darksky/types";
import { INetatmoState } from "./netatmo/types";

// The top-level state object.
export interface ApplicationState {
    application: IApplicationState,
    darksky: IDarkskyState,
    netatmo: INetatmoState
}

export const rootReducer = combineReducers<ApplicationState>({
    application: applicationReducer,
    darksky: darkskyReducer,
    netatmo: netatmoReducer
});
