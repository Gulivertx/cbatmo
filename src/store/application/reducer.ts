import { Reducer } from 'redux';
import { IApplicationState, ApplicationActionTypes } from "./types";
import MobileDetect from 'mobile-detect';

const md = new MobileDetect(window.navigator.userAgent);

const initialState: IApplicationState = {
    phone: md.phone(),
    tablet: md.tablet(),
    mobile: md.mobile(),
    orientation: 'landscape',
    isConfigured: !!window.localStorage.getItem('NetatmoRefreshToken'),
    isStarting: true,
    info: {
        name: '',
        description: '',
        version: '',
        author: '',
    },
    user: {
        mail: '',
        lang: '',
        locale: '',
        pressure_unit: '',
        unit: '',
        temperature_unit: '',
        distance_unit: '',
        wind_unit: '',
        temperature_ratio: '',
        pressure_ratio: 1,
        wind_ratio: 1,
        rain_ratio: 1
    }
};

const reducer: Reducer<IApplicationState> = (state = initialState, action) => {
    if (typeof state === 'undefined') {
        // No preloadedState from server. Use local state.
        state = { ...initialState }
    } else {
        // PreloadedState supplied by the server, but it's not merged with our local initial state yet.
        state = { ...initialState, ...state }
    }

    switch (action.type) {
        case ApplicationActionTypes.SET_IS_STARTING:
            return { ...state, isStarting: action.payload };

        /** SET user info from Netatmo API **/
        case ApplicationActionTypes.USER_INFO:
            return { ...state, user: action.payload };

        case ApplicationActionTypes.DEVICE_ORIENTATION:
            return { ...state, orientation: action.payload };

        default:
            return state;
    }
};

export {reducer as applicationReducer}
