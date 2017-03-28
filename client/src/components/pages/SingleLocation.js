import React, { Component } from 'react';
import { Card, Header } from 'semantic-ui-react';

const whiteText = {color: 'rgba(255,255,255,1)'};

class SingleLocation extends Component {
    constructor(props) {
        super(props);

        const [ city, region_name, country, lat, lon ] = props.params.locationId.split(',');
        const currentLocation = {
            city,
            region_name,
            country,
            lat,
            lon
        };

        this.props.getWeather(lat, lon);

        this.state = {
            currentLocation: currentLocation || props.currentLocation || null
        };

        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(location, weather) {
        return (
            <Card.Group>
                <Card fluid style={{ background: 'rgb(27, 114, 197)' }}>
                    <Card.Content >
                        <Card.Content extra style={whiteText}>
                            <Header as="h1" floated='right' style={{textAlign: 'right'}}>
                                <div style={{ margin: '0 0 35px 0', color: 'rgba(255,255,255,1)'}}>
                                    <div style={{ fontSize: 52 }}>{ `${Math.round(weather.main.temp)}`}&deg;</div> 
                                    <div style={{ fontSize: 22, marginRight: '20px' }}>{ `${Math.round(weather.main.temp_max)}/${Math.round(weather.main.temp_max)}`}</div>
                                </div>
                                <div style={{ fontSize: 16, fontWeight: '100', color: 'rgba(255,255,255,0.98)' }}>
                                    <div><strong>Wind:</strong> { `${weather.wind.speed || '--'}mph` } | { `${weather.wind.deg || '--'}` }&deg;</div>
                                    <div><strong>Humidity:</strong> {weather.main.humidity}</div>
                                    <div><strong>Pressure:</strong> {weather.main.pressure}</div>
                                </div>
                            </Header>
                        </Card.Content>
                        <Card.Header style={whiteText}>
                            <h2>{ `${location[1] || location.city}, ${location[2] || location.region_name}` }</h2>
                        </Card.Header>
                        <Card.Meta style={whiteText}>
                            { `${location[3] || location.country_name || location.country}` }
                        </Card.Meta>
                        <Card.Description style={whiteText}>
                            <h3>Weather Description</h3>
                            <p>{ weather.weather? weather.weather.map((forecast) => forecast.main).join(' & ') : (<p>...no description</p>)}</p>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
        );
    }

    render() {
        const location = this.state.currentLocation || this.props.currentLocation;
        const weather = this.props.weather;

        return (    
            <div>
                { location && weather.wind? this.renderItem(location, weather) : <p>...loading</p> }
            </div>
        );
    }
}

export default SingleLocation;