import {
    REQUEST,
    SUCCESS,
    FAILURE,
    LAT_LNG
} from "./actions";

const defaultState = {
    loading: true,
    data: {},
    updated_at: null,
    errors: undefined
};

const reducer = (state = defaultState, action) => {
    let stateValue = {};

    switch (action.type) {
        case REQUEST:
            stateValue.loading = true;
            state = Object.assign({}, state, stateValue);
            break;

        case SUCCESS:
            stateValue.loading = false;
            stateValue.data = action.data;
            stateValue.updated_at = action.receivedAt;
            stateValue.errors = undefined;
            state = Object.assign({}, state, stateValue);
            break;

        case FAILURE:
            stateValue.loading = false;
            stateValue.errors = action.error;
            state = Object.assign({}, state, stateValue);
            break;

        default:
            break;
    }

    return state;
};

export {reducer as darkskyReducer}