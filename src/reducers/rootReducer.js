import { combineReducers } from 'redux';
import navigationReducer from './navigationReducer';
import currentCityReducer from './currentCityReducer';

export default combineReducers({
    navigationReducer,
    currentCityReducer
})