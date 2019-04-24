import React, { Component } from 'react';
import {Container} from 'reactstrap';
import Map from './components/Map';
import Header from './components/Header';

import './App.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicationName: 'TrafficMaps'
    }
  }

  componentDidMount() {
    const {startFetch, API: {data}} = this.props;
    if(!data) startFetch();
  }

  render() {
    const {data} = this.props.API;
    const count =  data && data.features.length;
    return (
      <div>
        <Header count={count} appName={this.state.applicationName} />

        <Container>
          <Map data={data} />
        </Container>
      </div>
    );
  }
}

export default Home;
