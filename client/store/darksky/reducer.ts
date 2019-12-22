import { Reducer } from "redux";
import { DarkskyActionTypes, IDarkskyState } from "./types";

const initialState: IDarkskyState = {
    loading: true,
    first_fetch: true,
    data: null,
    updated_at: 0,
    errors: undefined
};

const reducer: Reducer<IDarkskyState> = (state = initialState, action) => {
    let stateValue = {};

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
