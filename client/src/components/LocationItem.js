import React, { Component } from 'react';
import { Item, Button, Icon } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import './itemStyles.css';

class LocationItem extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.removeLocation = this.removeLocation.bind(this);
        this.showRemoveButton = this.showRemoveButton.bind(this);
        this.showWeatherStats = this.showWeatherStats.bind(this);
    }

    handleClick(location) {
        const lat = `${location[8] || location.lat || location.latitude}`
        const lon = `${location[10] || location.lon || location.longitude}`;
        const city = `${location[1] || location.city || location.city}`;
        const region_name = `${location[12] || location.region_name || location.region}`;
        const country = `${location[3] || location.country || location.country_name}`;

        this.props.setCurrentLocation(location); 
        browserHistory.push(`/locations/${city},${region_name},${country},${lat},${lon}`);
    }

    removeLocation(e, location) {
        e.stopPropagation();
        this.props.removeLocation(this.props.user, location);
    }

    showRemoveButton(location) {
        return(
            <Item.Extra>
                <Button icon floated='right' style={{ background: '#ddd' }} onClick={ (e) => this.removeLocation(e, location)}>
                    <Icon name="trash outline"/>
                </Button>
            </Item.Extra>
        )
    }

    showWeatherStats(type, location) {
        if(type !== 'object') {
            return (
                    <Item.Content style={{ width: '400px' }}>
                        <Item.Header>
                            { `${location[1]}, ${location[2]}` }
                        </Item.Header>
                        <Item.Meta>
                            {`unique id#: ${location[9]}`}
                        </Item.Meta>
                        <Item.Description>
                            {`Country: ${location[3]}`}
                        </Item.Description>
                    </Item.Content>
            )
        } else {
            return (
                    <Item.Content style={{ width: '400px' }}>
                        <Item.Header>
                            { `${location.city}, ${location.region_name}` }
                        </Item.Header>
                        <Item.Meta>
                            {`lat: ${location.lat} | lon: ${location.lon}`}
                        </Item.Meta>
                        <Item.Description>
                            {`Country: ${location.country}`}
                        </Item.Description>
                    </Item.Content>
            )
        }

    }
    
    render() {
        const location = this.props.itemLocation;

        return (
            <Item className="weather-item" onClick={ () => this.handleClick(location) }>
                <Item.Image style={{borderRadius: '6px'}} src='https://www.walldevil.com/wallpapers/a70/night-dark-wallpapers-mountain-lake.jpg' />

                { this.showWeatherStats(this.props.locationsType, location) }

                { this.props.remove? this.showRemoveButton(location) : null }
            </Item>
        );
    }
}

export default LocationItem;