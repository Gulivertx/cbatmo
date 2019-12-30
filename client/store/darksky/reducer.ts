import { Reducer } from "redux";
import { DarkskyActionTypes, IDarkskyState } from "./types";

const initialState: IDarkskyState = {
    loading: true,
    first_fetch: true,
    data: undefined,
    updated_at: 0,
    errors: undefined
};

const reducer: Reducer<IDarkskyState> = (state = initialState, action) => {
    if (typeof state === 'undefined') {
        // No preloadedState from server. Use local state.
        state = { ...initialState }
    } else {
        // PreloadedState supplied by the server, but it's not merged with our local initial state yet.
        state = { ...initialState, ...state }
    }

    switch (action.type) {
        case DarkskyActionTypes.REQUEST:
            return { ...state, loading: true };

        case DarkskyActionTypes.SUCCESS:
            return { ...state,
                loading: false,
                data: action.payload,
                updated_at: action.receivedAt ,
                errors: undefined,
                first_fetch: false
            };

        case DarkskyActionTypes.FAILURE:
            return { ...state, loading: false, errors: action.error };

        default:
            return state;
    }
};

export {reducer as darkskyReducer}
