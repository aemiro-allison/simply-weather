import { put, call, fork, takeEvery } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { 
    login, 
    signup, 
    logout,
    queryForCity,
    getWeather,
    getLocations,  
    getClientLocation, 
    getNearbyLocations, 
    addLocation,
    removeLocation
} from '../services/api';

function* tryQueryForCity(app, action) {
    const cities = yield call(queryForCity, app, action);
    // console.log(cities);
    yield put({ type: "CITY_QUERY_DONE", cities });
}

function* queryForCitySaga(app) {
    yield takeEvery("CITY_QUERY_REQUESTED", tryQueryForCity, app);
}

function* callRemoveLocation(app, action) {
    const index = yield call(removeLocation, app, action);
    // console.log(index);
    yield put({ type: "LOCATION_REMOVED", index });
    yield browserHistory.push('/');
}

function* removeLocationSaga(app) {
    yield takeEvery("REMOVE_LOCATION", callRemoveLocation, app);
}

function* callAddLocation(app, action) {
    yield call(addLocation, app, action);
    // console.log(res);
    yield browserHistory.push('/');
}

function* addLocationSaga(app) {
    yield takeEvery("ADD_LOCATION", callAddLocation, app);
}

function* callLogout(app) {
    yield call(logout, app);
    yield put({ type: 'LOGOUT_SUCCECCED' });
    yield browserHistory.push('/');
    yield window.location.reload();
}

function* logoutSaga(app) {
    yield takeEvery("LOGOUT", callLogout, app);
}

function* tryLogin(app, action) {
    const user = yield call(login, app, action.email, action.password);
    yield put({ type: "LOGIN_SUCCECCED", user });
    yield browserHistory.push('/');
}

function* loginSaga(app) {
    yield takeEvery("LOGIN_REQUESTED", tryLogin, app);
}

function* trySignup(app, action) {
    yield call(signup, app, action.email, action.password);
    // console.log(success);
    yield browserHistory.push('/login');
}

function* signupSaga(app) {
    yield takeEvery("SIGNUP_REQUESTED", trySignup, app);
}

function* fetchNearbyLocations(action) {
    const nearbyLocations = yield call(getNearbyLocations, action.lat, action.lon);
    // console.log(nearbyLocations);
    yield put({ type: "NEARBY_LOCATIONS_SUCCECCED", nearbyLocations });
}

function* nearbyLocationsSaga() {
    yield takeEvery("NEARBY_LOCATIONS_REQUESTED", fetchNearbyLocations);
}

function* fetchLocations(app, action) {
    const locations = yield call(getLocations, app, action);
    // console.log(locations);
    yield put({ type: "LOCATIONS_SUCCECCED", locations });
}

function* locationsSaga(app) {
    yield takeEvery("LOCATIONS_REQUESTED", fetchLocations, app);
}

function* fetchWeather(action) {
    const weather = yield call(getWeather, action);
    // console.log(weather);
    yield put({ type: "WEATHER_SUCCECCED", weather });
}

function* weatherSaga() {
    yield takeEvery("WEATHER_REQUESTED", fetchWeather);
}

function* fetchClientLocation() {
    const clientLocation = yield call(getClientLocation);
    yield put({ type: "CLIENT_LOCATION_SUCCECCED", clientLocation });
}

function* clientLocationSaga() {
    yield takeEvery("CLIENT_LOCATION_REQUESTED", fetchClientLocation);
}

export default function* root(app) {
    yield [
        fork(clientLocationSaga),
        fork(weatherSaga),
        fork(loginSaga, app),
        fork(locationsSaga, app),
        fork(nearbyLocationsSaga),
        fork(signupSaga, app),
        fork(logoutSaga, app),
        fork(addLocationSaga, app),
        fork(removeLocationSaga, app),
        fork(queryForCitySaga, app)
    ]
}  