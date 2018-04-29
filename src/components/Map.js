import React, { Component } from "react";
import mapboxgl from "mapbox-gl";

//const counties =
//    "https://api.censusreporter.org/1.0/geo/show/tiger2016?geo_ids=050|04000US55";
// Pennsylvania tracts:
//const tracts = "https://api.censusreporter.org/1.0/geo/show/tiger2016?geo_ids=140|04000US42"

//import tracts from "../data/pennsylvania.json";
import districtsGeojson from "../districts.js";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const districts = districtsGeojson();

const COLORS = [
    "#42f4d1",
    "#d6d852",
    "#c97454",
    "#7e16a0",
    "#2e1984",
    "#efd794",
    "#3f8433",
    "#42f4d1",
    "#d6d852",
    "#c97454",
    "#7e16a0",
    "#2e1984",
    "#efd794",
    "#3f8433"
];

const DEFAULT_OPTIONS = {
    style: "mapbox://styles/mapbox/streets-v9",
    center: [-77.8600, 40.7934],
    zoom: 6
};

/*
const colorFunction = COLORS.reduce((color, f, i) => [...f, i, color], [
    "match",
    ["get", "id"]
]);
*/

export default class Map extends Component {
    componentDidMount() {
        this.map = new mapboxgl.Map({
            ...DEFAULT_OPTIONS,
            container: "map"
        });

        this.map.on("load", () => {
            //this.map.addSource("tracts", { type: "geojson", data: tracts });
            this.map.addSource("districts", {
                type: "geojson",
                data: districts
            });
            this.map.addLayer(
                {
                    id: "districts",
                    type: "fill",
                    source: "districts",
                    layout: {},
                    paint: {
                        "fill-color": "#2e1984",
                        "fill-opacity": 0.8
                    }
                },
                "water"
            );
            /*this.map.addLayer(
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
            );*/
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
