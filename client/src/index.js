import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import store, { history, app } from './store';
import App from './components/App';
import { authGood } from './actions/actionCreators';

import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import NearbyLocations from './components/pages/NearbyLocations';
import SingleLocation from './components/pages/SingleLocation';
import AddLocation from './components/pages/AddLocation';
import NotFound from './components/pages/NotFound';
// import { protectRoute } from './components/Auth';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/nearby" component={NearbyLocations}></Route>
        <Route path="/locations/add" components={AddLocation}></Route>
        <Route path="/locations/:locationId" components={SingleLocation}></Route>
        <Route path="*" components={NotFound}></Route>
      </Route>
    </Router>
  </Provider>
);

app.authenticate().then(user => {
  store.dispatch(authGood(user));
  ReactDOM.render(
    router,
    document.getElementById('root')
  );
}, () => {
  ReactDOM.render(
    router,
    document.getElementById('root')
  );
});
