import React, { Component } from 'react';
import { Card, Image, Divider, Icon } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import LocationsList from '../LocationsList';
// import moment from 'moment';

class Home extends Component {
    constructor(props) {
        super(props);

        //get location of client to display for home page
        this.props.getClientLocation();
        // this.props.getMostViewedWeather();
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.weather.coord && nextProps.clientLocation) {
            this.props.getWeather(
                nextProps.clientLocation.latitude,
                nextProps.clientLocation.longitude
            );
        }
    }

    displayCurrentWeather(currentWeather) {
        return (
            <h2>{ `${Math.round(currentWeather.main.temp_max)}/${Math.round(currentWeather.main.temp_min)}`}</h2>
        )
    }

    handleClick(location) {
         this.props.setCurrentLocation(location); 
         browserHistory.push(`/locations/${location.city},${location.region_name},${location.country_name},${location.latitude},${location.longitude}`);
    }

    render() {
        const { clientLocation, weather } = this.props;

        return (
            <div>
                <Card onClick={ () => this.handleClick(clientLocation) }>
                    <Image src='https://superdevresources.com/wp-content/uploads/2014/05/flat-weather-icon-set.png' />
                    <Card.Content>
                        <Card.Header>
                            { `${clientLocation.city}, ${clientLocation.region_name} ` }
                            <Icon name="marker" />
                        </Card.Header>
                        <Card.Meta>
                            { weather? this.displayCurrentWeather(weather) : (<p>loading...</p>) }
                        </Card.Meta>
                        <Card.Description>
                            { weather? (<h1 style={{ fontSize: 32}}>{ Math.round(weather.main.temp) }&deg;</h1>) : (<p>loading...</p>) }
                        </Card.Description>
                    </Card.Content>
                </Card>
                <Divider />
                <LocationsList {...this.props}/>
            </div>
        );
    }
}

export default Home;