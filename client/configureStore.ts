import { Store, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/** Import the state interface and combined reducers */
import { ApplicationState, rootReducer } from './store'

export default function configureStore(
    initialState: ApplicationState
): Store<ApplicationState> {
    // Create the composing function for our middlewares
    const composeEnhancers = composeWithDevTools({}) || compose;

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunkMiddleware)
        )
    );
}
