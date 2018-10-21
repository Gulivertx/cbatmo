import {combineReducers} from 'redux';
import main from './main';
import darksky from './darksky';
import netatmo from './netatmo';

const rootReducer = combineReducers({
    main,
    darksky,
    netatmo
});

export default rootReducer