import React, {Component} from 'react';
import MapBoxGL from 'mapbox-gl'

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            api_url: 'https://data.edmonton.ca/resource/ju4q-wijd.json',
            map: false,
            viewport: {
                zoom: 10,
                center: [-113.4909, 53.5444]
            },
            data: null
        } 
        console.log(this.state)
    }

    initialzeMap() {
        MapBoxGL.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
        let map = new MapBoxGL.Map({
            container: "map",
            style: 'mapbox://styles/skinnypigeon/cjqjcvf4e1gic2rki8a8r8v5x',
            ...this.state.viewport

        })

        map.on('load', () => {
            map.addLayer({
                "id": "points",
                "type": "circle",
                "source": {
                    "type": "geojson",
                    "data": this.state.data
                },
                "paint": {
                    "circle-radius": 5,
                    "circle-color": "#B4D455"
                }
            })
        })

        this.setState({map});
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

    componentDidMount() {
        const {data, api_url} = this.state;

        if(!data) {
            fetch(api_url, {method: 'GET'})
            .then(response => response.json())
            .then(response => this.createFeatureCollection(response))
            .then(response => this.setState({data: response}))
        }
    }

    render(){
        const {map, data} = this.state;
        if(data && !map) this.initialzeMap();
        return (
            <div style={{width: 1100, height: 600}} id="map" />
        );
    }
}