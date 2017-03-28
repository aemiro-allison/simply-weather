import request from 'superagent';

// const host = 'https://simply-weather-app.herokuapp.com';
const host = 'http://localhost:3030';

export function getClientLocation() {
    return request
            .get('https://api.ipify.org/?format=json')
            .then((data) => {
                return Promise.all([            
                    request.get(`${host}/api/client/location?host=${data.body.ip}`)
                ]);
            })
            .then((data) => data[0].body)
            .catch((err) => console.log(err));
}

export function getWeather(action) {
    return request
            .get(`${host}/api/weather?lat=${action.lat}&lon=${action.lon}`)
            .then((data) => data.body)
            .catch((err) => console.log(err));
}

export function getLocations(app, action) {
    if(action.user) {
        const users = app.service('users');
        return users.find({
            query: {
                '$limit': 1,
                '_id': action.user.data._id
            }
        }).then((data) => data.data[0].locations)
          .catch((err) => console.log(err));

    } else {
        const locations = app.service('locations');
        return locations.find({
            query: {
                '$limit': 8,
            }
        }).then((data) => data)
          .catch((err) => console.log(err));
    }
}

export function getNearbyLocations(lat, lon) {
    return request  
            .get(`${host}/api/client/nearby?lat=${lat}&lon=${lon}`)
            .then((data) => data.body)
            .catch((err) => console.log(err));
}

export function addLocation(app, action) {
    const { city, region_name, country, lat, lon, user } = action;

    if(user.hasOwnProperty('data')) {
        const users     = app.service('users');
        const locations = [].concat(user.data.locations, [{
            city, region_name, country, lat, lon
        }]);

        return users.patch(user.data._id, {
            locations
        }).then((data) => data)
        .catch((err) => console.log(err));

    } else {
        const locations = app.service('locations');
        return locations.create({
            city,
            region_name,
            country,
            lat,
            lon,
        }).then((data) => data)
          .catch((err) => console.log(err));
    }
}

export function removeLocation(app, action) {
    const { user, location } = action;
    const index = location.index;

    if(user.hasOwnProperty('data')) {
        const users = app.service('users');

        if (index > -1) {
            user.data.locations.splice(index, 1);
        }
        const locations = user.data.locations;

        return users.patch(user.data._id, {
            locations
        }).then(() => index)
          .catch((err) => console.log(err));

    } else {
        const locations = app.service('locations');

        return locations.remove(location.id)
            .then(() => index)
            .catch((err) => console.log(err));
    }
}

export function queryForCity(app, action) {
    const cityQuery = action.city;

    return request
            .get(`${host}/api/location/get?city=${cityQuery}`)
            .then((data) => data.body)
            .catch((err) => console.log(err));
}

export function signup(app, email, password) {
  const users = app.service('users');
  return users.create({
    email,
    password
  }).then((data) => data)
    .catch((err) => console.log(err));
}

export function login(app, email, password) {
    return app.authenticate({
        type: 'local',
        email,
        password
    }).then((data) => data)
      .catch((err) => console.log(err));
}

export function logout(app) {
    return app.logout();
}


