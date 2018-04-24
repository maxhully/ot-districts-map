import React, { Component } from "react";
import mapboxgl from "mapbox-gl";

//const counties =
//    "https://api.censusreporter.org/1.0/geo/show/tiger2016?geo_ids=050|04000US55";
const tracts = "https://api.censusreporter.org/1.0/geo/show/tiger2016?geo_ids=140|04000US55"

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const DEFAULT_OPTIONS = {
    style: "mapbox://styles/mapbox/streets-v9",
    center: [-90.0, 44.7],
    zoom: 6
};

export default class Map extends Component {
    componentDidMount() {
        this.map = new mapboxgl.Map({
            ...DEFAULT_OPTIONS,
            container: "map"
        });

        this.map.on("load", () => {
            this.map.addSource("tracts", { type: "geojson", data: tracts });
            this.map.addLayer(
                {
                    id: "tracts",
                    type: "fill",
                    source: "tracts",
                    layout: {},
                    paint: {
                        "fill-color": "#FF7F50",
                        "fill-opacity": 0.8
                    }
                },
                "water"
            );
            this.map.addLayer(
                {
                    id: "tracts-outline",
                    type: "line",
                    source: "tracts",
                    layout: {},
                    paint: {
                        "line-color": "#AAAAAA",
                        "line-opacity": 0.8
                    }
                },
                "water"
            );
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
