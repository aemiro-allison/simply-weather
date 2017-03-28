export default function citiesReducer(state = {}, action) {
    switch(action.type) {
        case "CITY_QUERY_DONE":
            return action.cities;
        
        default:
            return state;
    }
}