import React, {Component} from 'react';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewport: {
                width: 1000,
                height: 800,
                zoom: 12,
                latitude: 53.5444,
                longitude: 13.4909
               
            }
        }
    }
}