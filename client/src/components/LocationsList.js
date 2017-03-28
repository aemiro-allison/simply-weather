import React, { Component } from "react";
import { Link } from 'react-router';
import { Item, Icon } from 'semantic-ui-react';
import LocationItem from './LocationItem';

class LocationsList extends Component {
    constructor(props) {
        super(props);

        if(props.user && props.user.hasOwnProperty('data')) {
            this.props.getLocations(props.user);
        } else {
            this.props.getLocations();
        }
    }

    render() {
        const { locations } = this.props;
        
        return (
            <div>
                <div>
                    <Link to="/locations/add"><Icon name="add" /> Add Location</Link>
                    <p>Showing locations from { this.props.user && this.props.user.hasOwnProperty('data')? <h4><strong>{ this.props.user.data.email }</strong></h4> : <h4><strong>this computer</strong></h4> }</p>
                </div>
                <Item.Group divided>
                    { 
                        locations
                        ?
                        locations.map((location, i) => {
                            location.index = i;
                            
                            return (
                                <LocationItem
                                    {...this.props}
                                    key={i}
                                    itemLocation={location}
                                    remove={true}
                                    locationsType={typeof locations[0]}
                                />
                            ); 
                        })
                        :
                        (<p>loading...</p>)
                    }
                </Item.Group>
            </div>
        )
    }
}

export default LocationsList;