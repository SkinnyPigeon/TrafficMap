import React, { Component } from 'react';
import {Container} from 'reactstrap';
import Map from './components/Map';
import Header from './components/Header'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicationName: 'TrafficMaps',
      data: null,
      api_url: 'https://data.edmonton.ca/resource/ju4q-wijd.json'
    }
  }

  componentDidMount() {
    const {data, api_url} = this.state;

    if(!data) {
      fetch(api_url, {method: 'GET'})
      .then(response => response.json())
      .then(response => this.createFeatureCollection(response))
      .then(response => this.setState({data: response}))
    }
  }

  createFeatureCollection(data) {
    let features = [];
    data.forEach(point => {
        features.push({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    parseFloat(point.location.coordinates[0]),
                    parseFloat(point.location.coordinates[1])
                ]
            },
            "properties": {
                "description": point.description,
                "details": point.details,
                "duration": point.duration,
                "impact": point.impact
            }
        });
    })
    return {
        "type": "FeatureCollection",
        "features": features
    } 
  }
  render() {
    return (
      <div className="App">
        <Header appName = {this.state.applicationName}/>
        <Container>
          <Map data={this.state.data}/>
        </Container>
      </div>
    );
  }
}

export default App;
