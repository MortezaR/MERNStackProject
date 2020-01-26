import { combineReducers } from 'redux';
import maps from './maps_reducer';

const RootReducer = combineReducers({
    maps
});

export default RootReducer;