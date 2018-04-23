import React, { Component } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const DEFAULT_OPTIONS = {
    style: "mapbox://styles/mapbox/streets-v9",
    center: [-71.0589, 42.3601],
    zoom: 9
};

export default class Map extends Component {
    componentDidMount() {
        this.map = new mapboxgl.Map({
            ...DEFAULT_OPTIONS,
            container: "map"
        });
    }
    render() {
        return (
            <div
                style={{ position: "absolute", width: "100%", height: "100%" }}
                id="map"
            />
        );
    }
}
