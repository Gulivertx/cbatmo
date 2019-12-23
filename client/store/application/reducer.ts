import { Reducer } from 'redux';
import { IApplicationState, ApplicationActionTypes } from "./types";

const initialState: IApplicationState = {
    isConfigured: false,
    info: {
        name: '',
        description: '',
        version: '',
        author: '',
    },
    user: {
        mail: '',
        lang: 'en',
        locale: '',
        pressure_unit: '',
        unit: 'si',
        windunit: ''
    },
    loading: true
};

const reducer: Reducer<IApplicationState> = (state = initialState, action) => {
    switch (action.type) {
        case ApplicationActionTypes.APP_CONFIGURED:
            return { ...state, isConfigured: action.payload };

        /** SET user info from Netatmo API **/
        case ApplicationActionTypes.USER_INFO:
            return { ...state, user: action.payload };

        default:
            return state;
    }
};

export {reducer as applicationReducer}
