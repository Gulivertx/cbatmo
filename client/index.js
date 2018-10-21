import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import AppContainer from './containers/AppContainer';

import 'typeface-roboto';
import './css/cbatmo.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    window.preloadedState || {},
    composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )
);

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app-root')
);