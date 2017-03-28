function clientLocationReducer(state = '', action) {
    switch(action.type) {
        case 'CLIENT_LOCATION_SUCCECCED':
            return action.clientLocation || '';
        default:
            return state;
    }
}

export default clientLocationReducer;