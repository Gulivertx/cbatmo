import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

/** Import the state interface and combined reducers */
import rootReducer from './store'

export default function configureStore(initialState) {
    // Create the composing function for our middlewares
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunkMiddleware)
        )
    );
}
