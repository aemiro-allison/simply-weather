import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import clientLocation from './clientLocation';
import weather from './weather';
import locations from './locations';
import currentLocation from './currentLocation';
import checkLogin from './checkLogin';
import cities from './cities';

const rootReducer = combineReducers({
    routing: routerReducer,
    clientLocation,
    weather,
    locations,
    currentLocation,
    checkLogin,
    cities
});

export default rootReducer;