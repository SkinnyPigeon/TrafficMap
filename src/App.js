import React, { Component } from 'react';
import {Container} from 'reactstrap';
import Map from './components/Map';
import Header from './components/Header'


import './App.css';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicationName: 'TrafficMaps'
    }
  }

  render() {
    return (
      <div className="App">
        <Header appName = {this.state.applicationName}/>
        <Container>
          <Map />
        </Container>
      </div>
    );
  }
}

export default App;
