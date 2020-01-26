import { combineReducers } from 'redux';
import modalReducer from './modal_reducer.js'
import clickEffectReducer from './click_effect_reducer.js'

const uiReducer = combineReducers({
    modal: modalReducer,
    clickEffect: clickEffectReducer
});


export default uiReducer;