const dummyAction = {
    type: ''
};

function locationReducer(state = [], action = dummyAction) {
    switch(action.type) {
        case 'LOCATION_REMOVED': 
            state.splice(action.index, 1);
            return state;
        case 'NEARBY_LOCATIONS_SUCCECCED':
            return action.nearbyLocations || [];
        case 'LOCATIONS_SUCCECCED':
            return action.locations || state;
        case 'SHOW_LOCATION':
            return action.location || {};
        default:
            return state;    
    }
}

export default locationReducer;