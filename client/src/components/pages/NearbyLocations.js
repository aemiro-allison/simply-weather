import React, { Component } from "react";
import { Item } from 'semantic-ui-react';
import LocationItem from '../LocationItem';

class NearbyLocations extends Component {
    constructor(props) {
        super(props);

        this.props.getClientLocation();
        this.state = {
            clientLocation: null,
        }
    }

    componentWillReceiveProps({ clientLocation }) {
        if(clientLocation && !this.state.clientLocation) {
            this.setState({
                clientLocation
            });

            this.props.getNearbyLocations(
                clientLocation.latitude,
                clientLocation.longitude
            );
        }
    }

    render() {
        const nearbyLocations = this.props.locations;

        return (
            <div>
                <Item.Group divided>
                    { 
                        nearbyLocations
                        ?
                        nearbyLocations.map((location, i) => {
                            return (
                                <LocationItem
                                    {...this.props}
                                    key={i}
                                    itemLocation={location}
                                    remove={false}
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

export default NearbyLocations;