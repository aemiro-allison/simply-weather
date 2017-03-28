const initalState = {
    main: {
        temp_min: '--',
        temp_max: '--'
    }
};

function weatherReducer(state = initalState, action) {
    switch (action.type) {
        case 'WEATHER_SUCCECCED':
            return action.weather || state;

        default:
            return state;
    }
}

export default weatherReducer;