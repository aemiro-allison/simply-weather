import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

import Main from './Main.js';

function mapStateToProps(state) {
  return {
    clientLocation: state.clientLocation,
    weather: state.weather,
    locations: state.locations,
    currentLocation: state.currentLocation,
    user: state.checkLogin,
    city: state.cities
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;