import {combineReducers} from 'redux';
import {applicationReducer} from "./application/reducer";
import {darkskyReducer} from "./darksky/reducer";
import {netatmoReducer} from "./netatmo/reducer";

const rootReducer = combineReducers({
    application: applicationReducer,
    darksky: darkskyReducer,
    netatmo: netatmoReducer
});

export default rootReducer
