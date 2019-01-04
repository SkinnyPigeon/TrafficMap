import React, {Component} from 'react';
import ReactMapGL from 'react-map-gl';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewport: {
                width: 1000,
                height: 600,
                zoom: 10,
                latitude: 53.5444,
                longitude: -113.4909,
                pixelRatio: 3
            },
            token: "pk.eyJ1Ijoic2tpbm55cGlnZW9uIiwiYSI6ImNqcWloc3VtMzVpZ3k0OHBwOXF5ZGtxMmUifQ.6VRtjcrNEhyg18qnx1Tl4w"
        }
    }

    render(){
        return (
            <ReactMapGL
                mapboxApiAccessToken = {this.state.token}
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({viewport})}
            />
        );
    }
}