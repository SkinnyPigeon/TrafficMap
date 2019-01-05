import React, {Component} from 'react';
import MapBoxGL from 'mapbox-gl'

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            map: false,
            viewport: {
                zoom: 10,
                center: [-113.4909, 53.5444]
            }
        } 
    }

    static initialzeMap(state, viewport) {
        MapBoxGL.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
        let map = new MapBoxGL.Map({
            container: "map",
            style: 'mapbox://styles/skinnypigeon/cjqjcvf4e1gic2rki8a8r8v5x',
            ...viewport
        })

        map.on('load', () => {
            map.addLayer({
                "id": "points",
                "type": "circle",
                "source": {
                    "type": "geojson",
                    "data": state.data
                },
                "paint": {
                    "circle-radius": 7,
                    "circle-color": "#B4D455"
                }
            })
        })

        map.on('click', 'points', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const {details, description, impact, duration} = e.features[0].properties;
            while(Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] *= e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new MapBoxGL.Popup()
                .setLngLat(coordinates)
                .setHTML(`
                <strong>${description}</strong><br />
                <em>${impact}</em><br />
                <em>${duration}</em><br />
                <p>${details}</p>
                `)
                .addTo(map);
        });

        map.on('mouseenter', 'points', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'points', () => {
            map.getCanvas().style.cursor = '';
        })
        return{map};
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const {map, data} = nextProps;
        if(data && !map) return Map.initialzeMap(nextProps, prevState.viewport)
        else return null;
    }

    render(){
        return (
            <div style={{width: 1100, height: 600}} id="map" />
        );
    }
}