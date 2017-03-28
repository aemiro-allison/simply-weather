import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

const welcomeStyle = {
    background: '#444', 
    color: '#FFF', 
    border: '1px solid #555', 
    borderRadius: '2px'
};

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.loggedIn = this.loggedIn.bind(this);
        this.loggedOut = this.loggedOut.bind(this);
    }

    loggedIn() {
        return (
            <Menu.Menu position='right'>
                <Menu.Item name='user' style={welcomeStyle}> { `${this.props.user.data.email}` } </Menu.Item>
                <Menu.Item name='logout' onClick={this.props.logout}> logout </Menu.Item>
            </Menu.Menu>
        )
    }

    loggedOut() {
        return (
            <Menu.Menu position='right'>
                <Menu.Item name='quest' style={welcomeStyle}>Guest</Menu.Item>
                <Menu.Item name='signup' onClick={ () => browserHistory.push('/signup') }> signup </Menu.Item>
                <Menu.Item name='login'  onClick={ () => browserHistory.push('/login') }> login </Menu.Item>
            </Menu.Menu>
        )
    }

    render() {
        const isLoggedIn = this.props.user.hasOwnProperty('data');

        return (
            <Menu>
                <Menu.Item name='home' onClick={ () => browserHistory.push('/') }>
                    Home
                </Menu.Item>
                <Menu.Item name='nearby' onClick={ () => browserHistory.push('/nearby') }>
                    Nearby Cities
                </Menu.Item>
                { isLoggedIn? this.loggedIn() : this.loggedOut() }
            </Menu>
        );
    }
}

export default Navbar;