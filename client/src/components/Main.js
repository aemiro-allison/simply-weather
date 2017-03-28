import React, { Component } from 'react';
import { Header, Container, Divider } from 'semantic-ui-react';
import { Link } from 'react-router';

import Navbar from './Navbar';

class Main extends Component {
    render() {
        return (
            <Container>
                <Header as='h1' textAlign='center'>
                    <Link to="/">Simply Weather</Link>
                </Header> 
                <Divider />
                <Navbar {...this.props} />   
                {
                    React.cloneElement(this.props.children, this.props)
                }
            </Container>
        );
    }
}

export default Main;