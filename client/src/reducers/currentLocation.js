function currentLocationReducer(state = {}, action) {
    switch(action.type) {
        case 'WEATHER_FOR_LOCATION':
            return action.location || state;
        default:
            return state;

    }
}

export default currentLocationReducer;