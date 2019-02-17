import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './containers/AppContainer';

import 'typeface-roboto';
import './css/cbatmo.scss';

/** Register Redux store */
const initialState = {};
import configureStore from './configureStore';
const store = configureStore(initialState);

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app-root')
);