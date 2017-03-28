export function getClientLocation() {
    return {
        type: 'CLIENT_LOCATION_REQUESTED'
    }    
}

export function getWeather(lat, lon) {
    return {
        type: 'WEATHER_REQUESTED',
        lat,
        lon
    }
}

export function getLocations(user) {
    return {
        type: 'LOCATIONS_REQUESTED',
        user
    }
}

export function addLocation(user, city, region_name, country, lat, lon) {
    return {
        type: 'ADD_LOCATION',
        user,
        city,
        region_name,
        country,
        lat,
        lon
    }
}

export function removeLocation(user, location) {
    return {
        type: "REMOVE_LOCATION",
        user,
        location
    }
}

export function setCurrentLocation(location) {
    return {
        type: 'WEATHER_FOR_LOCATION',
        location
    }
}

export function queryForCity(city) {
    return {
        type: "CITY_QUERY_REQUESTED",
        city
    }
}

export function getNearbyLocations(lat, lon) {
    return {
        type: 'NEARBY_LOCATIONS_REQUESTED',
        lat,
        lon
    }
}

export function signup(email, password) {
    return {
        type: 'SIGNUP_REQUESTED',
        email,
        password
    }
}

export function login(email, password) {
    return {
        type: 'LOGIN_REQUESTED',
        email,
        password
    }
}

export function logout() {
    return {
        type: 'LOGOUT'
    }
}

export function authGood(user) {
    return {
        type: 'AUTH_GOOD',
        user
    }
}
