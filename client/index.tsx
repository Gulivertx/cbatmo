import * as React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import AppContainer from './containers/AppContainer';

import 'typeface-roboto';
import './css/style.scss';

/** Extend window variable with preloadedState */
declare global {
    interface Window {
        preloadedState: any
    }
}

/** Register Redux store */
const initialState: any = JSON.parse(window.preloadedState) || {};
import configureStore from './configureStore';
const store = configureStore(initialState);

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app-root') as HTMLElement
);
