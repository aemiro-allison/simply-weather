import React, { Component } from "react";
import { Button, Form } from 'semantic-ui-react';

class AddLocation extends Component {
 constructor(props) {
    super(props);

    this.state = {
      queryCity: '',
      city: '',
      region_name: '',
      country: '',
      lat: '',
      lon: '',
      cityWasSet: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
  }

  componentWillReceiveProps({ city }) {
    if(this.state.city !== city.geobytescity) {
      this.setState({
        city: city.geobytescity,
        region_name: city.geobytesregion,
        country: city.geobytescountry,
        lat: city.geobyteslatitude,
        lon: city.geobyteslongitude,
        cityWasSet: true
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const { city, region_name, country, lat, lon } = this.state;
    this.props.addLocation(
        this.props.user,
        city,
        region_name,
        country,
        lat,
        lon
    );

      this.state = {
        city: '',
        region_name: '',
        country: '',
        lat: '',
        lon: '',
        cityWasSet: false
      };
  }

  handleQuerySubmit(e) {
    e.preventDefault();

    this.props.queryForCity(this.state.queryCity);
  }

  render() {
    let city, region_name, country, lat, lon;

    if(this.props.city.geobyteslatitude !== "0" && !this.state.cityWasSet) {
        city = this.props.city.geobytescity;
        region_name = this.props.city.geobytesregion;
        country = this.props.city.geobytescountry;
        lat = this.props.city.geobyteslatitude;
        lon = this.props.city.geobyteslongitude;
    } else {
        city = this.state.city;
        region_name = this.state.region_name;
        country = this.state.country;
        lat = this.state.lat;
        lon = this.state.lon;
    }

    


    return (
      <div>
        <Form onSubmit={this.handleQuerySubmit}>
            <Form.Field>
              <label>Enter in exact format: [ City, State/Providence Abbreviation] to automatically the populate fields below</label>
              <p>hint: Make sure to include the Abbreviation of the state, don't type out the state name. <br /> hint: Try to put spaces after all commas if not working</p>
              <input value={this.state.queryCity} name='city' onChange={e => this.setState({ queryCity: e.target.value }) } placeholder='ex. New York, NY' />
            </Form.Field>
            <Button type='submit'>Search for City</Button><p>or enter fields below instead if you can't get the city you want</p>
        </Form>
        
        <Form onSubmit={this.handleSubmit}> 
          <Form.Field>
            <label>City</label>
            <input value={city} name='city' onChange={e => this.setState({ city: e.target.value }) } placeholder='Location city' />
          </Form.Field>
          <Form.Field>
            <label>Region Name/ State / Provinence</label>
            <input value={region_name} name='region_name' onChange={e => this.setState({ region_name: e.target.value })} placeholder='Region name'/>
          </Form.Field>
          <Form.Field>
            <label>Country</label>
            <input value={country} name='country' onChange={e => this.setState({ country: e.target.value }) } placeholder='Country'/>
          </Form.Field>
          <Form.Field>
            <label>Latitude</label>
            <input value={lat} name='lat' onChange={e => this.setState({ lat: e.target.value }) } placeholder='Latitude' />
          </Form.Field>
          <Form.Field>
            <label>Longitude</label>
            <input value={lon} name='lon' onChange={e => this.setState({ lon: e.target.value }) } placeholder='Longitude' />
          </Form.Field>
          <Button type='submit'>Add New Location</Button>
        </Form>
      </div>
    )
  }
}

export default AddLocation;